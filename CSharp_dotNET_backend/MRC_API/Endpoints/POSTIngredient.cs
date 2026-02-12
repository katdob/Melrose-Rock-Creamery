using Microsoft.EntityFrameworkCore;
using MRC_API.Data;
using MRC_API.Models;

namespace MRC_API.Endpoints;

public static class POSTIngredient
{
    public static IEndpointRouteBuilder MapPostIngredient(this IEndpointRouteBuilder app)
    {
        app.MapPost("/ingredients", async (CreateIngredientRequest request, MRCDbContext db) =>
        {
            if (string.IsNullOrWhiteSpace(request.Name))
                return Results.BadRequest("Name is required.");
            if (string.IsNullOrWhiteSpace(request.Unit))
                return Results.BadRequest("Unit is required.");

            var name = request.Name.Trim();
            var unit = request.Unit.Trim();
            var amount = request.Amount;

            var existing = await db.Ingredients
                .FirstOrDefaultAsync(i => i.Name == name && i.Unit == unit && i.Amount == amount);

            if (existing != null)
                return Results.Ok(new { existing.Id, existing.Name, existing.Unit, existing.Amount });

            var ingredient = new Ingredient
            {
                Name = name,
                Unit = unit,
                Amount = amount
            };

            db.Ingredients.Add(ingredient);
            await db.SaveChangesAsync();

            return Results.Created($"/ingredients/{ingredient.Id}", new { ingredient.Id, ingredient.Name, ingredient.Unit, ingredient.Amount });
        })
            .WithName("PostIngredient");

        return app;
    }
}

internal record CreateIngredientRequest(string Name, string Unit, double Amount);
