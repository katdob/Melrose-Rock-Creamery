using Microsoft.EntityFrameworkCore;
using MRC_API.Data;

namespace MRC_API.Endpoints;

public static class GETIngredient
{
    public static IEndpointRouteBuilder MapGetIngredient(this IEndpointRouteBuilder app)
    {
        app.MapGet("/ingredients/by-name-unit-amount", async (string name, string unit, double amount, MRCDbContext db) =>
        {
            var ingredient = await db.Ingredients
                .Where(i => i.Name == name && i.Unit == unit && i.Amount == amount)
                .Select(i => new { i.Id, i.Name, i.Unit, i.Amount })
                .FirstOrDefaultAsync();

            if (ingredient == null)
                return Results.NotFound();

            return Results.Ok(ingredient);
        })
            .WithName("GetIngredient");

        return app;
    }
}
