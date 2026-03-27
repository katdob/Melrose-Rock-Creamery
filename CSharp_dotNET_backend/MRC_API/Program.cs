using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MRC_API.Auth;
using MRC_API.Data;
using MRC_API.Endpoints;
using MRC_API.Models;
using MRC_API.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();
builder.Services.AddSingleton<AuthTokenService>();
builder.Services.AddScoped<IEmailSender, SmtpEmailSender>();

// PostgreSQL connection via Npgsql + Entity Framework Core
var conn = builder.Configuration.GetConnectionString("DefaultConnection");
if (string.IsNullOrEmpty(conn))
    throw new InvalidOperationException("ConnectionStrings:DefaultConnection is required.");
builder.Services.AddDbContext<MRCDbContext>(options =>
    options.UseNpgsql(conn));

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        var accessSecret = builder.Configuration["Auth:AccessTokenSecret"] ?? "dev-only-super-secret-access-token-key-change-me-12345";
        var issuer = builder.Configuration["Auth:Issuer"] ?? "MRC_API";
        var audience = builder.Configuration["Auth:Audience"] ?? "MRC_API_Client";
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(accessSecret)),
            ValidateIssuer = true,
            ValidIssuer = issuer,
            ValidateAudience = true,
            ValidAudience = audience,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero
        };
        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                if (string.IsNullOrWhiteSpace(context.Token))
                {
                    var cookieToken = context.Request.Cookies["access_token"];
                    if (!string.IsNullOrWhiteSpace(cookieToken))
                        context.Token = cookieToken;
                }
                return Task.CompletedTask;
            },
            OnTokenValidated = async context =>
            {
                var db = context.HttpContext.RequestServices.GetRequiredService<MRCDbContext>();
                var userIdRaw = context.Principal?.FindFirstValue(JwtRegisteredClaimNames.Sub)
                    ?? context.Principal?.FindFirstValue(ClaimTypes.NameIdentifier);
                if (!int.TryParse(userIdRaw, out var userId))
                {
                    context.Fail("Invalid token subject.");
                    return;
                }

                var user = await db.Users.FirstOrDefaultAsync(u => u.Id == userId);
                if (user is null || !user.IsActive)
                {
                    context.Fail("User is not active.");
                    return;
                }

                if (user.JwtExpiresAt is null || user.JwtExpiresAt <= DateTime.UtcNow)
                {
                    context.Fail("JWT expired.");
                    return;
                }

                if (user.RefreshTokenExpiresAt is null || user.RefreshTokenExpiresAt <= DateTime.UtcNow)
                {
                    context.Fail("Refresh token expired.");
                    return;
                }

                var tokenVersion = context.Principal?.FindFirstValue("tokenVersion");
                if (!int.TryParse(tokenVersion, out var parsedVersion) || parsedVersion != user.AccessTokenVersion)
                {
                    context.Fail("Token version mismatch.");
                }
            }
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.FallbackPolicy = new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser()
        .Build();
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    if (scope.ServiceProvider.GetService<MRCDbContext>() is { } db)
    {
        try
        {
            db.Database.EnsureCreated();
            SeedDB.Seed(db);
        }
        catch (Exception ex) when (app.Environment.IsDevelopment())
        {
            Console.WriteLine($"Seed/DB: {ex.Message}");
        }
        catch { /* ignore when DB unavailable */ }
    }
}

// Seed-only mode: dotnet run -- seed
if (args.Contains("seed", StringComparer.OrdinalIgnoreCase))
{
    Console.WriteLine("Seed completed. Exiting.");
    return;
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.Use(async (context, next) =>
{
    var path = context.Request.Path.Value ?? string.Empty;
    var isAuthPath = path.StartsWith("/auth/login", StringComparison.OrdinalIgnoreCase)
        || path.StartsWith("/auth/logout", StringComparison.OrdinalIgnoreCase)
        || path.StartsWith("/auth/session", StringComparison.OrdinalIgnoreCase)
        || path.StartsWith("/auth/reset-password", StringComparison.OrdinalIgnoreCase)
        || path.StartsWith("/users", StringComparison.OrdinalIgnoreCase);

    if (!isAuthPath && (HttpMethods.IsPost(context.Request.Method) || HttpMethods.IsPut(context.Request.Method) || HttpMethods.IsPatch(context.Request.Method) || HttpMethods.IsDelete(context.Request.Method)))
    {
        var csrfCookie = context.Request.Cookies["csrf_token"];
        context.Request.Headers.TryGetValue("X-CSRF-TOKEN", out var csrfHeader);
        if (string.IsNullOrWhiteSpace(csrfCookie) || string.IsNullOrWhiteSpace(csrfHeader) || !string.Equals(csrfCookie, csrfHeader, StringComparison.Ordinal))
        {
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            await context.Response.WriteAsync("Invalid CSRF token.");
            return;
        }
    }

    await next();
});
app.UseAuthorization();

app.Use(async (context, next) =>
{
    // Renew JWT cookie before response headers are sent. Appending cookies after
    // await next() runs too late (body may already be written), which can truncate
    // the response and break clients (Content-Length vs body mismatch).
    if (!(context.User?.Identity?.IsAuthenticated ?? false))
    {
        await next();
        return;
    }

    var path = context.Request.Path.Value ?? string.Empty;
    var isAuthPath = path.StartsWith("/auth/login", StringComparison.OrdinalIgnoreCase)
        || path.StartsWith("/auth/logout", StringComparison.OrdinalIgnoreCase)
        || path.StartsWith("/auth/session", StringComparison.OrdinalIgnoreCase)
        || path.StartsWith("/auth/reset-password", StringComparison.OrdinalIgnoreCase)
        || path.StartsWith("/users", StringComparison.OrdinalIgnoreCase);
    if (isAuthPath)
    {
        await next();
        return;
    }

    if (!int.TryParse(context.User.FindFirstValue(JwtRegisteredClaimNames.Sub) ?? context.User.FindFirstValue(ClaimTypes.NameIdentifier), out var userId))
    {
        await next();
        return;
    }

    var scopeFactory = context.RequestServices.GetRequiredService<IServiceScopeFactory>();
    var useSecureCookies = !app.Environment.IsDevelopment();

    context.Response.OnStarting(async _ =>
    {
        using var scope = scopeFactory.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<MRCDbContext>();
        var scopedTokenService = scope.ServiceProvider.GetRequiredService<AuthTokenService>();
        var user = await db.Users.FirstOrDefaultAsync(u => u.Id == userId);
        if (user is null || !user.IsActive)
            return;

        var newAccessExpiry = scopedTokenService.GetAccessTokenExpiryUtc();
        user.JwtExpiresAt = newAccessExpiry;
        await db.SaveChangesAsync();

        var renewedAccessToken = scopedTokenService.CreateAccessToken(user, newAccessExpiry);
        context.Response.Cookies.Append("access_token", renewedAccessToken, new CookieOptions
        {
            HttpOnly = true,
            Secure = useSecureCookies,
            SameSite = SameSiteMode.Strict,
            Expires = newAccessExpiry
        });
        context.Response.Headers["X-Access-Token-Renewed"] = "true";
    }, null);

    await next();
});

app.MapGetRecipes();
app.MapGetSearchRecipes();
app.MapGetRecipe();
app.MapPostRecipe();
app.MapPostFindRecipe();
app.MapPostRecipeIngredients();
app.MapGetIngredient();
app.MapPostIngredient();
app.MapPostInstruction();
app.MapIngredients();
app.MapInstructions();
app.MapPostCreateUser();
app.MapPostLogIn();
app.MapPostLogOut();
app.MapGetAuthSession();
app.MapPostResetPassword();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast =  Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
