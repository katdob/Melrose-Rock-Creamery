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
            var recipeExists = await db.Recipes.AnyAsync(r => r.Id == recipeId);
            if (!recipeExists)
                return Results.NotFound();

            return Results.Ok(new List<Ingredient>());
        })
            .WithName("GetRecipeIngredientList");

        return app;
    }
}       