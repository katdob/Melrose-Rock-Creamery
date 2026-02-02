using Microsoft.EntityFrameworkCore;
using MRC_API.Data;
using MRC_API.Models;

namespace MRC_API.Endpoints;

public static class IngredientsEndpoint
{
    public static IEndpointRouteBuilder MapIngredients(this IEndpointRouteBuilder app)
    {
        app.MapGet("/recipes/{recipeId:int}/ingredients", async (int recipeId, MRCDbContext db) =>
        {
            var recipe = await db.Recipes
                .Where(r => r.Id == recipeId)
                .Select(r => r.IngredientList)
                .FirstOrDefaultAsync();

            if (recipe == null)
                return Results.NotFound();

            var ingredientIds = recipe ?? new List<int>();
            if (ingredientIds.Count == 0)
                return Results.Ok(new List<Ingredient>());

            var ingredients = await db.Ingredients
                .Where(i => ingredientIds.Contains(i.Id))
                .ToListAsync();

            var orderedIngredients = ingredientIds
                .Select(id => ingredients.FirstOrDefault(i => i.Id == id))
                .Where(i => i != null)
                .Cast<Ingredient>()
                .ToList();

            return Results.Ok(orderedIngredients);
        })
            .WithName("GetRecipeIngredientList");

        return app;
    }
}
