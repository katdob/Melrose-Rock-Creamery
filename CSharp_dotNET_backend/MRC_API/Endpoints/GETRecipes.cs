using Microsoft.EntityFrameworkCore;
using MRC_API.Data;

namespace MRC_API.Endpoints;

public static class GetRecipesEndpoint
{
    public static IEndpointRouteBuilder MapGetRecipes(this IEndpointRouteBuilder app)
    {
        const int pageSize = 3;

        app.MapGet("/recipes", async (int firstPage, int lastPage, MRCDbContext db) =>
        {
            if (firstPage < 1 || lastPage < 1 || firstPage > lastPage)
                return Results.BadRequest("firstPage and lastPage must be positive integers with firstPage <= lastPage.");

            var skip = (firstPage - 1) * pageSize;
            var take = (lastPage - firstPage + 1) * pageSize;

            var recipes = await db.Recipes
                .OrderBy(r => r.Id)
                .Skip(skip)
                .Take(take)
                .Select(r => new { r.Id, r.Name, r.Author, r.CreatedDate })
                .ToListAsync();
            return Results.Ok(recipes);
        })
            .WithName("GetRecipes");

        return app;
    }
}
