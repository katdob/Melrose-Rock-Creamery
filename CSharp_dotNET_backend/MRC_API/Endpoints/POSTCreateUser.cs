using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MRC_API.Data;
using MRC_API.Models;

namespace MRC_API.Endpoints;

public static class POSTCreateUser
{
    public static IEndpointRouteBuilder MapPostCreateUser(this IEndpointRouteBuilder app)
    {
        app.MapPost("/users", async (CreateUserRequest request, MRCDbContext db, IPasswordHasher<User> hasher) =>
        {
            if (string.IsNullOrWhiteSpace(request.FirstName))
                return Results.BadRequest("FirstName is required.");
            if (string.IsNullOrWhiteSpace(request.LastName))
                return Results.BadRequest("LastName is required.");
            if (string.IsNullOrWhiteSpace(request.Email))
                return Results.BadRequest("Email is required.");
            if (string.IsNullOrWhiteSpace(request.SetPassword))
                return Results.BadRequest("SetPassword is required.");

            var email = request.Email.Trim().ToLowerInvariant();
            var exists = await db.Users.AnyAsync(u => u.Email == email);
            if (exists)
                return Results.Conflict("A user with that email already exists.");

            var user = new User
            {
                FirstName = request.FirstName.Trim(),
                LastName = request.LastName.Trim(),
                Email = email,
                IsActive = request.IsActive ?? false
            };
            user.PasswordHash = hasher.HashPassword(user, request.SetPassword);

            db.Users.Add(user);
            await db.SaveChangesAsync();

            return Results.Created($"/users/{user.Id}", new
            {
                id = user.Id,
                firstName = user.FirstName,
                lastName = user.LastName,
                email = user.Email,
                isActive = user.IsActive
            });
        })
        .AllowAnonymous()
        .WithName("PostCreateUser");

        return app;
    }
}

internal record CreateUserRequest(
    string FirstName,
    string LastName,
    string Email,
    bool? IsActive,
    string SetPassword
);

