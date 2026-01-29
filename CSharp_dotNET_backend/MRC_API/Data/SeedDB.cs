using MRC_API.Models;

namespace MRC_API.Data;

public static class SeedDB
{
    private static readonly List<Recipe> Recipes = new()
    {
        new Recipe { Name = "Simple Vanilla Ice Cream", Author = "Cuisinart", CreatedDate = new DateTime(2024, 1, 1) },
        new Recipe { Name = "Simple Chocolate Ice Cream", Author = "Cuisinart", CreatedDate = new DateTime(2024, 1, 1) },
        new Recipe { Name = "Butter Pecan Ice Cream", Author = "Cuisinart", CreatedDate = new DateTime(2024, 1, 1) },
        new Recipe { Name = "Fresh Strawberry Ice Cream", Author = "Cuisinart", CreatedDate = new DateTime(2024, 1, 1) },
        new Recipe { Name = "Peanut Butter Cup Ice Cream", Author = "Cuisinart", CreatedDate = new DateTime(2024, 1, 1) },
        new Recipe { Name = "S'mores Ice Cream", Author = "Cuisinart", CreatedDate = new DateTime(2024, 1, 1) },
        new Recipe { Name = "Banana Walnut Chip Ice Cream", Author = "Cuisinart", CreatedDate = new DateTime(2024, 1, 1) },
        new Recipe { Name = "Vanilla Bean Ice Cream", Author = "Cuisinart", CreatedDate = new DateTime(2024, 1, 1) },
        new Recipe { Name = "Fresh Mint and Chocolate Cookies Ice Cream", Author = "Cuisinart", CreatedDate = new DateTime(2024, 1, 1) },
        new Recipe { Name = "Mexican-Style Chocolate Ice Cream", Author = "Cuisinart", CreatedDate = new DateTime(2024, 1, 1) },
        new Recipe { Name = "Salted Caramel Ice Cream", Author = "Cuisinart", CreatedDate = new DateTime(2024, 1, 1) },
        new Recipe { Name = "Dark Chocolate Sorbet", Author = "Cuisinart", CreatedDate = new DateTime(2024, 1, 1) },
        new Recipe { Name = "Grapefruit and Prosecco Sorbet", Author = "Cuisinart", CreatedDate = new DateTime(2024, 1, 1) },
        new Recipe { Name = "Dairy-Free Vanilla Ice Cream", Author = "Cuisinart", CreatedDate = new DateTime(2024, 1, 1) },
        new Recipe { Name = "Coconut-Chocolate Ice Cream", Author = "Cuisinart", CreatedDate = new DateTime(2024, 1, 1) },
        new Recipe { Name = "Rich Vanilla Frozen Yogurt", Author = "Cuisinart", CreatedDate = new DateTime(2024, 1, 1) },
        new Recipe { Name = "Mango Frozen Yogurt", Author = "Cuisinart", CreatedDate = new DateTime(2024, 1, 1) },
        new Recipe { Name = "Chocolate-Pretzel Frozen Yogurt", Author = "Cuisinart", CreatedDate = new DateTime(2024, 1, 1) },
        new Recipe { Name = "Chocolate-Hazelnut Gelato", Author = "Cuisinart", CreatedDate = new DateTime(2024, 1, 1) },
        new Recipe { Name = "Espresso Gelato", Author = "Cuisinart", CreatedDate = new DateTime(2024, 1, 1) },
        new Recipe { Name = "Custard Gelato", Author = "Cuisinart", CreatedDate = new DateTime(2024, 1, 1) }
    };

    public static void Seed(MRCDbContext db)
    {
        if (!db.Recipes.Any())
        {
            db.Recipes.AddRange(Recipes);
            db.SaveChanges();
        }
    }
}
