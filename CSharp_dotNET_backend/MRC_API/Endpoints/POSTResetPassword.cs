using Microsoft.EntityFrameworkCore;
using MRC_API.Data;
using MRC_API.Services;

namespace MRC_API.Endpoints;

public static class POSTResetPassword
{
    public static IEndpointRouteBuilder MapPostResetPassword(this IEndpointRouteBuilder app)
    {
        app.MapPost("/auth/reset-password", async (ResetPasswordRequest request, MRCDbContext db, IEmailSender emailSender, ILoggerFactory loggerFactory) =>
        {
            if (string.IsNullOrWhiteSpace(request.Email))
                return Results.Ok(new { message = "If the account exists, a reset email has been sent." });

            var email = request.Email.Trim().ToLowerInvariant();
            var user = await db.Users.FirstOrDefaultAsync(u => u.Email == email);

            // Security pattern: do not reveal whether the email exists.
            if (user is not null)
            {
                var logger = loggerFactory.CreateLogger("POSTResetPassword");
                try
                {
                    await emailSender.SendAsync(
                        user.Email,
                        "Melrose Rock Creamery password reset",
                        $"Hello {user.FirstName},\n\nWe received a password reset request for your account. If this was you, please contact support to complete your reset flow.\n\nIf this wasn't you, you can ignore this email."
                    );
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, "Failed to send password reset email to {Email}", user.Email);
                }
            }

            return Results.Ok(new { message = "If the account exists, a reset email has been sent." });
        })
        .AllowAnonymous()
        .WithName("PostResetPassword");

        return app;
    }
}

internal record ResetPasswordRequest(string Email);

