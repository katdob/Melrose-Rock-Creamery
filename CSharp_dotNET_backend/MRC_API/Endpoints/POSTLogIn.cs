using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MRC_API.Auth;
using MRC_API.Data;
using MRC_API.Models;

namespace MRC_API.Endpoints;

public static class POSTLogIn
{
    public static IEndpointRouteBuilder MapPostLogIn(this IEndpointRouteBuilder app)
    {
        app.MapPost("/auth/login", async (LogInRequest request, MRCDbContext db, IPasswordHasher<User> hasher, AuthTokenService tokenService, HttpResponse response, IWebHostEnvironment env) =>
        {
            if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
                return Results.BadRequest("Email and password are required.");

            var email = request.Email.Trim().ToLowerInvariant();
            var user = await db.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user is null)
                return Results.Unauthorized();

            // Verify stored password hash. If a legacy plain-text password is found,
            // allow one successful login and immediately upgrade it to a hash.
            PasswordVerificationResult verify;
            try
            {
                verify = hasher.VerifyHashedPassword(user, user.PasswordHash, request.Password);
            }
            catch (FormatException)
            {
                if (!string.Equals(user.PasswordHash, request.Password, StringComparison.Ordinal))
                    return Results.Unauthorized();

                user.PasswordHash = hasher.HashPassword(user, request.Password);
                verify = PasswordVerificationResult.Success;
            }

            if (verify == PasswordVerificationResult.Failed)
                return Results.Unauthorized();

            if (verify == PasswordVerificationResult.SuccessRehashNeeded)
            {
                user.PasswordHash = hasher.HashPassword(user, request.Password);
            }

            if (!user.IsActive)
                return Results.Unauthorized();

            var accessExpiresAt = tokenService.GetAccessTokenExpiryUtc();
            var refreshExpiresAt = tokenService.GetRefreshTokenExpiryUtc();

            var accessToken = tokenService.CreateAccessToken(user, accessExpiresAt);
            var refreshToken = tokenService.CreateRefreshToken(user, refreshExpiresAt);
            var refreshTokenHash = AuthTokenService.HashToken(refreshToken);

            user.JwtExpiresAt = accessExpiresAt;
            user.RefreshTokenExpiresAt = refreshExpiresAt;
            user.RefreshTokenHash = refreshTokenHash;
            await db.SaveChangesAsync();

            var useSecureCookies = !env.IsDevelopment();
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = useSecureCookies,
                SameSite = SameSiteMode.Strict
            };

            response.Cookies.Append("access_token", accessToken, new CookieOptions
            {
                HttpOnly = cookieOptions.HttpOnly,
                Secure = cookieOptions.Secure,
                SameSite = cookieOptions.SameSite,
                Expires = accessExpiresAt
            });
            response.Cookies.Append("refresh_token", refreshToken, new CookieOptions
            {
                HttpOnly = cookieOptions.HttpOnly,
                Secure = cookieOptions.Secure,
                SameSite = cookieOptions.SameSite,
                Expires = refreshExpiresAt
            });
            response.Cookies.Append("csrf_token", Guid.NewGuid().ToString("N"), new CookieOptions
            {
                HttpOnly = false,
                Secure = useSecureCookies,
                SameSite = SameSiteMode.Strict,
                Expires = refreshExpiresAt
            });

            return Results.Ok(new
            {
                accessToken,
                accessTokenExpiresAt = accessExpiresAt,
                refreshTokenExpiresAt = refreshExpiresAt,
                user = new
                {
                    firstName = user.FirstName,
                    lastName = user.LastName,
                    email = user.Email,
                    isLoggedIn = true
                }
            });
        })
        .AllowAnonymous()
        .WithName("PostLogIn");

        return app;
    }
}

internal record LogInRequest(string Email, string Password);

