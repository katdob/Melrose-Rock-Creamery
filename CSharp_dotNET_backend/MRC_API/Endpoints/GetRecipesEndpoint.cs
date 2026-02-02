using Microsoft.EntityFrameworkCore;
using MRC_API.Data;

namespace MRC_API.Endpoints;

public static class GetRecipesEndpoint
{
    public static IEndpointRouteBuilder MapGetRecipes(this IEndpointRouteBuilder app)
    {
        app.MapGet("/recipes", async (MRCDbContext db) =>
        {
            var recipes = await db.Recipes
                .Select(r => new { r.Id, r.Name, r.Author, r.CreatedDate })
                .ToListAsync();
            return Results.Ok(recipes);
        })
            .WithName("GetRecipes");

        return app;
    }
}
