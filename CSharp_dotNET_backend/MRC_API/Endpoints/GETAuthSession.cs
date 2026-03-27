using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using MRC_API.Data;

namespace MRC_API.Endpoints;

public static class GETAuthSession
{
    public static IEndpointRouteBuilder MapGetAuthSession(this IEndpointRouteBuilder app)
    {
        app.MapGet("/auth/session", async (HttpContext httpContext, MRCDbContext db) =>
        {
            if (!(httpContext.User?.Identity?.IsAuthenticated ?? false))
                return Results.Unauthorized();

            var userIdRaw = httpContext.User.FindFirstValue(JwtRegisteredClaimNames.Sub)
                ?? httpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdRaw, out var userId))
                return Results.Unauthorized();

            var user = await db.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user is null || !user.IsActive)
                return Results.Unauthorized();

            return Results.Ok(new
            {
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
        .WithName("GetAuthSession");

        return app;
    }
}
