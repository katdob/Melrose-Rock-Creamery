using Microsoft.EntityFrameworkCore;
using MRC_API.Data;

namespace MRC_API.Endpoints;

public static class POSTFindRecipe
{
    public static IEndpointRouteBuilder MapPostFindRecipe(this IEndpointRouteBuilder app)
    {
        app.MapPost("/recipes/find", async (FindRecipeRequest request, MRCDbContext db) =>
        {
            var search = (request.Search ?? string.Empty).Trim();
            if (string.IsNullOrEmpty(search))
                return Results.BadRequest("Search string is required.");

            var recipeIdsByName = await db.Recipes
                .Where(r => r.Name.Contains(search))
                .Select(r => r.Id)
                .ToListAsync();

            var recipeIdsByAuthor = await db.Recipes
                .Where(r => r.Author.Contains(search))
                .Select(r => r.Id)
                .ToListAsync();

            var matchingIngredientIds = await db.Ingredients
                .Where(i => i.Name.Contains(search))
                .Select(i => i.Id)
                .ToListAsync();

            var recipeIdsByIngredient = new List<int>();
            if (matchingIngredientIds.Count > 0)
            {
                recipeIdsByIngredient = await db.Recipes
                    .Where(r => r.IngredientsList != null && r.IngredientsList.Intersect(matchingIngredientIds).Any())
                    .Select(r => r.Id)
                    .ToListAsync();
            }

            var allIds = recipeIdsByName
                .Concat(recipeIdsByAuthor)
                .Concat(recipeIdsByIngredient)
                .Distinct()
                .ToList();

            if (allIds.Count == 0)
                return Results.Ok(Array.Empty<object>());

            var recipes = await db.Recipes
                .Where(r => allIds.Contains(r.Id))
                .OrderBy(r => r.Id)
                .Select(r => new { r.Id, r.Name, r.Author, r.CreatedDate })
                .ToListAsync();

            return Results.Ok(recipes);
        })
            .WithName("PostFindRecipe");

        return app;
    }
}

internal record FindRecipeRequest(string? Search);
