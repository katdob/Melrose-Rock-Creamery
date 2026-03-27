using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using MRC_API.Data;
using MRC_API.Models;

namespace MRC_API.Endpoints;

/// <summary>
/// Recipes created by the logged-in user (CreatingUser), paged (3 per page).
/// User id is resolved from the session JWT email, not from the client.
/// </summary>
public static class POSTGetUserRecipes
{
    public static IEndpointRouteBuilder MapGetUserRecipes(this IEndpointRouteBuilder app)
    {
        const int pageSize = 3;

        app.MapGet("/recipes/my", async (MRCDbContext db, ClaimsPrincipal principal, int Page = 1) =>
        {
            if (Page < 1)
                return Results.BadRequest("Page must be a positive integer.");

            var email = principal.FindFirstValue(JwtRegisteredClaimNames.Email)
                ?? principal.FindFirstValue(ClaimTypes.Email);
            if (string.IsNullOrWhiteSpace(email))
                return Results.Unauthorized();

            var normalizedEmail = email.Trim().ToLowerInvariant();
            var user = await db.Users.AsNoTracking()
                .FirstOrDefaultAsync(u => u.Email == normalizedEmail);
            if (user is null)
                return Results.Unauthorized();

            var recipeRows = await db.Recipes
                .AsNoTracking()
                .Where(r => r.CreatingUser == user.Id)
                .OrderByDescending(r => r.CreatedDate)
                .ThenByDescending(r => r.Id)
                .Skip((Page - 1) * pageSize)
                .Take(pageSize)
                .Select(r => new { r.Id, r.Name, r.Author, r.CreatedDate, r.IngredientsList })
                .ToListAsync();

            var ingredientIds = recipeRows
                .SelectMany(r => r.IngredientsList ?? Array.Empty<int>())
                .Distinct()
                .ToList();

            Dictionary<int, Ingredient> ingredientById;
            if (ingredientIds.Count == 0)
                ingredientById = new Dictionary<int, Ingredient>();
            else
                ingredientById = await db.Ingredients.AsNoTracking()
                    .Where(i => ingredientIds.Contains(i.Id))
                    .ToDictionaryAsync(i => i.Id);

            var recipeIdsOnPage = recipeRows.Select(r => r.Id).ToList();

            List<Instruction> instructionRows;
            if (recipeIdsOnPage.Count == 0)
                instructionRows = new List<Instruction>();
            else
                instructionRows = await db.Instructions.AsNoTracking()
                    .Where(i => recipeIdsOnPage.Contains(i.RecipeId))
                    .OrderBy(i => i.RecipeId)
                    .ThenBy(i => i.Order)
                    .ToListAsync();

            var instructionsByRecipeId = instructionRows.ToLookup(i => i.RecipeId);

            var recipes = recipeRows.Select(r => new
            {
                r.Id,
                r.Name,
                r.Author,
                r.CreatedDate,
                ingredients = (r.IngredientsList ?? Array.Empty<int>())
                    .Select(ingredientId =>
                    {
                        if (ingredientById.TryGetValue(ingredientId, out var ing))
                        {
                            return new
                            {
                                id = ingredientId,
                                name = (string?)ing.Name,
                                unit = (string?)ing.Unit,
                                amount = (double?)ing.Amount
                            };
                        }

                        return new
                        {
                            id = ingredientId,
                            name = (string?)null,
                            unit = (string?)null,
                            amount = (double?)null
                        };
                    })
                    .ToList(),
                instructions = instructionsByRecipeId[r.Id]
                    .OrderBy(i => i.Order)
                    .Select(i => new
                    {
                        id = i.Id,
                        order = i.Order,
                        text = i.Text
                    })
                    .ToList()
            }).ToList();

            return Results.Ok(recipes);
        })
            .WithName("GetUserRecipes");

        return app;
    }
}
