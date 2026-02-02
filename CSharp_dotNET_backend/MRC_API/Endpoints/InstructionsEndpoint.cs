using Microsoft.EntityFrameworkCore;
using MRC_API.Data;

namespace MRC_API.Endpoints;

public static class InstructionsEndpoint
{
    public static IEndpointRouteBuilder MapInstructions(this IEndpointRouteBuilder app)
    {
        app.MapGet("/recipes/{recipeId:int}/instructions", async (int recipeId, MRCDbContext db) =>
        {
            var instructions = await db.Instructions
                .Where(i => i.RecipeId == recipeId)
                .OrderBy(i => i.Order)
                .Select(i => new { i.Order, Instruction = i.Text })
                .ToListAsync();

            if (instructions.Count == 0 && !await db.Recipes.AnyAsync(r => r.Id == recipeId))
                return Results.NotFound();

            return Results.Ok(instructions);
        })
            .WithName("GetRecipeInstructions");

        return app;
    }
}
