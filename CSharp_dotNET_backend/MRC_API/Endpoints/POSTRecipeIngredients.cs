using MRC_API.Data;

namespace MRC_API.Endpoints;

public static class POSTRecipeIngredients
{
    public static IEndpointRouteBuilder MapPostRecipeIngredients(this IEndpointRouteBuilder app)
    {
        app.MapPost("/recipes/{recipeId:int}/ingredients", async (int recipeId, PostRecipeIngredientsRequest request, MRCDbContext db) =>
        {
            var recipe = await db.Recipes.FindAsync(recipeId);
            if (recipe == null)
                return Results.NotFound($"Recipe with id {recipeId} not found.");

            recipe.IngredientList = request.IngredientIds ?? Array.Empty<int>();
            await db.SaveChangesAsync();

            return Results.Ok(new { recipeId, ingredientIds = recipe.IngredientList });
        })
            .WithName("PostRecipeIngredients");

        return app;
    }
}

internal record PostRecipeIngredientsRequest(int[] IngredientIds);
