using Microsoft.EntityFrameworkCore;
using MRC_API.Data;
using MRC_API.Models;

namespace MRC_API.Endpoints;

public static class POSTInstruction
{
    public static IEndpointRouteBuilder MapPostInstruction(this IEndpointRouteBuilder app)
    {
        app.MapPost("/instructions", async (AddInstructionRequest request, MRCDbContext db) =>
        {
            if (string.IsNullOrWhiteSpace(request.Text))
                return Results.BadRequest("Text is required.");

            var recipeExists = await db.Recipes.AnyAsync(r => r.Id == request.RecipeId);
            if (!recipeExists)
                return Results.BadRequest("RecipeId must reference an existing recipe.");

            var instruction = new Instruction
            {
                Text = request.Text.Trim(),
                Order = request.Order,
                RecipeId = request.RecipeId
            };

            db.Instructions.Add(instruction);
            await db.SaveChangesAsync();

            return Results.Created($"/instructions/{instruction.Id}", new { instruction.Id, instruction.Text, instruction.Order, instruction.RecipeId });
        })
            .WithName("PostInstruction");

        return app;
    }
}

internal record AddInstructionRequest(string Text, int Order, int RecipeId);
