using Microsoft.EntityFrameworkCore;
using MRC_API.Data;
using MRC_API.Models;

namespace MRC_API.Endpoints;

public static class GetSearchRecipesEndpoint
{
    public static IEndpointRouteBuilder MapGetSearchRecipes(this IEndpointRouteBuilder app)
    {
        const int pageSize = 3;

        app.MapGet("/recipes/search", async (MRCDbContext db, string? searchCriteria, int Page = 1) =>
        {
            var search = (searchCriteria ?? string.Empty).Trim();
            if (string.IsNullOrEmpty(search))
                return Results.BadRequest("searchCriteria is required.");

            if (Page < 1)
                return Results.BadRequest("Page must be a positive integer.");

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

            var nameSet = recipeIdsByName.ToHashSet();
            var authorSet = recipeIdsByAuthor.ToHashSet();
            var ingredientSet = recipeIdsByIngredient.ToHashSet();

            int Priority(int id) =>
                nameSet.Contains(id) ? 1 : authorSet.Contains(id) ? 2 : 3;

            var orderedRecipeIds = nameSet
                .Union(authorSet)
                .Union(ingredientSet)
                .OrderBy(Priority)
                .ThenBy(id => id)
                .ToList();

            var pageIds = orderedRecipeIds
                .Skip((Page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            if (pageIds.Count == 0)
                return Results.Ok(new { results = Array.Empty<object>() });

            var recipeRows = await db.Recipes
                .Where(r => pageIds.Contains(r.Id))
                .Select(r => new { r.Id, r.Name, r.Author, r.CreatedDate, r.IngredientsList })
                .ToListAsync();

            var indexById = pageIds.Select((id, i) => (id, i)).ToDictionary(x => x.id, x => x.i);
            recipeRows.Sort((a, b) => indexById[a.Id].CompareTo(indexById[b.Id]));

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

            var instructionRows = await db.Instructions
                .Where(i => pageIds.Contains(i.RecipeId))
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

            return Results.Ok(new { results = recipes });
        })
            .WithName("GetSearchRecipes");

        return app;
    }
}
