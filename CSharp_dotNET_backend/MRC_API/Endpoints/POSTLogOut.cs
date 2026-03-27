using Microsoft.EntityFrameworkCore;
using MRC_API.Data;

namespace MRC_API.Endpoints;

public static class POSTLogOut
{
    public static IEndpointRouteBuilder MapPostLogOut(this IEndpointRouteBuilder app)
    {
        app.MapPost("/auth/logout", async (LogOutRequest request, MRCDbContext db, HttpResponse response) =>
        {
            if (string.IsNullOrWhiteSpace(request.Email))
                return Results.BadRequest("Email is required.");

            var email = request.Email.Trim().ToLowerInvariant();
            var user = await db.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user is null)
                return Results.NotFound("User not found.");

            user.JwtExpiresAt = DateTime.UtcNow;
            user.RefreshTokenExpiresAt = DateTime.UtcNow;
            user.RefreshTokenHash = null;
            user.AccessTokenVersion += 1;
            await db.SaveChangesAsync();

            response.Cookies.Delete("access_token");
            response.Cookies.Delete("refresh_token");
            response.Cookies.Delete("csrf_token");

            return Results.Ok(new { message = "Logged out." });
        })
        .AllowAnonymous()
        .WithName("PostLogOut");

        return app;
    }
}

internal record LogOutRequest(string Email);

