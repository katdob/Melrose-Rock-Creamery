using Microsoft.EntityFrameworkCore;
using MRC_API.Data;
using MRC_API.Models;

namespace MRC_API.Endpoints;

public static class GetRecipesEndpoint
{
    public static IEndpointRouteBuilder MapGetRecipes(this IEndpointRouteBuilder app)
    {
        const int pageSize = 3;

        app.MapGet("/recipes", async (MRCDbContext db, int Page = 1) =>
        {
            if (Page < 1)
                return Results.BadRequest("Page must be a positive integer.");

            // Page 1 → ids 1–3, page 2 → 4–6, page 3 → 7–9, …
            var minId = (Page - 1) * pageSize + 1;
            var maxId = Page * pageSize;

            var recipeRows = await db.Recipes
                .Where(r => r.Id >= minId && r.Id <= maxId)
                .OrderBy(r => r.Id)
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
                ingredientById = await db.Ingredients
                    .Where(i => ingredientIds.Contains(i.Id))
                    .ToDictionaryAsync(i => i.Id);

            var recipeIdsOnPage = recipeRows.Select(r => r.Id).ToList();

            List<Instruction> instructionRows;
            if (recipeIdsOnPage.Count == 0)
                instructionRows = new List<Instruction>();
            else
                instructionRows = await db.Instructions
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
            .WithName("GetRecipes");

        return app;
    }
}
