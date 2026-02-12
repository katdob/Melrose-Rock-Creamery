using Microsoft.EntityFrameworkCore;
using MRC_API.Data;

namespace MRC_API.Endpoints;

public static class GETRecipe
{
    public static IEndpointRouteBuilder MapGetRecipe(this IEndpointRouteBuilder app)
    {
        app.MapGet("/recipes/by-name-author", async (string name, string author, MRCDbContext db) =>
        {
            var recipe = await db.Recipes
                .Where(r => r.Name == name && r.Author == author)
                .Select(r => new { r.Id, r.Name, r.Author, r.CreatedDate })
                .FirstOrDefaultAsync();

            if (recipe == null)
                return Results.NotFound();

            return Results.Ok(recipe);
        })
            .WithName("GetRecipe");

        return app;
    }
}
