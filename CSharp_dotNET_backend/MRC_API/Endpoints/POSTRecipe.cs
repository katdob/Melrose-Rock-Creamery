using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using MRC_API.Data;
using MRC_API.Models;

namespace MRC_API.Endpoints;

public static class POSTRecipe
{
    public static IEndpointRouteBuilder MapPostRecipe(this IEndpointRouteBuilder app)
    {
        app.MapPost("/recipes", async (CreateRecipeRequest request, MRCDbContext db, ClaimsPrincipal user) =>
        {
            if (string.IsNullOrWhiteSpace(request.Name))
                return Results.BadRequest("Name is required.");
            if (string.IsNullOrWhiteSpace(request.Author))
                return Results.BadRequest("Author is required.");

            var userIdClaim = user.FindFirstValue(JwtRegisteredClaimNames.Sub)
                ?? user.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdClaim, out var creatingUserId))
                return Results.Unauthorized();

            var recipe = new Recipe
            {
                Name = request.Name.Trim(),
                Author = request.Author.Trim(),
                CreatedDate = DateTime.UtcNow,
                Shareable = request.Shareable ?? false,
                CreatingUser = creatingUserId,
            };

            db.Recipes.Add(recipe);
            await db.SaveChangesAsync();

            if (request.Instructions != null && request.Instructions.Count > 0)
            {
                var instructions = request.Instructions
                    .Select((inst, index) => new Instruction
                    {
                        RecipeId = recipe.Id,
                        Text = inst.Text,
                        Order = inst.Order
                    })
                    .ToList();
                db.Instructions.AddRange(instructions);
                await db.SaveChangesAsync();
            }

            return Results.Created($"/recipes/{recipe.Id}", new
            {
                id = recipe.Id,
                name = recipe.Name,
                author = recipe.Author,
                createdDate = recipe.CreatedDate,
                shareable = recipe.Shareable,
                creatingUser = recipe.CreatingUser,
            });
        })
            .WithName("PostRecipe");

        return app;
    }
}

internal record CreateRecipeRequest(
    string Name,
    string Author,
    bool? Shareable,
    List<CreateInstructionRequest>? Instructions
);

internal record CreateInstructionRequest(string Text, int Order);
