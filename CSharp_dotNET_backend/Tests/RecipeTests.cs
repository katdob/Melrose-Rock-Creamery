using System;
using Csharp_dotNET_backend.Classes;
using MRC_API.Models;
using Xunit;

namespace Csharp_dotNET_backend.Tests;

public class RecipeTests : IDisposable
{
    // Recipe test data
    private readonly string test_RecipeName = "TestRecipeName";
    private readonly string test_Author = "TestAuthor TestName";
    private readonly DateTime test_DateTime = DateTime.UtcNow;

    // Ingredient test data
    private readonly string test_IngredientName = "TestIngredient TestName";
    private readonly string test_IngredientUnit = "TestAuthor TestUnit";
    private readonly string test_Amount = "TestAuthor TestAmount";

    private Ingredient? _ingredientUnderTest;
    private Recipe? _recipeUnderTest;

    public RecipeTests()
    {
        // 5. Use the ingredient test values to create a new ingredient
        _ingredientUnderTest = new Ingredient(
            test_IngredientName,
            test_IngredientUnit,
            amount: test_Amount.Length
        );

        // 6. Create a new Recipe using the test values
        _recipeUnderTest = new Recipe
        {
            Name = test_RecipeName,
            Author = test_Author,
            CreatedDate = test_DateTime,
            IngredientsList = new[] { 1 } // simulate including the ingredient in the list
        };
    }

    [Fact]
    public void Recipe_IsCreated_WithExpectedProperties()
    {
        Assert.NotNull(_recipeUnderTest);

        // 7. Look up the recipe and test it against the variables used to create it
        Assert.Equal(test_RecipeName, _recipeUnderTest!.Name);
        Assert.Equal(test_Author, _recipeUnderTest.Author);
        Assert.NotNull(_recipeUnderTest.IngredientsList);
        Assert.Single(_recipeUnderTest.IngredientsList!);
    }

    [Fact]
    public void Recipe_CreatedDate_IsWithin24Hours_Of_TestDate()
    {
        Assert.NotNull(_recipeUnderTest);

        // 8. Test that CreatedDate is within 24 hours of test_DateTime
        var difference = (_recipeUnderTest!.CreatedDate - test_DateTime).Duration();
        Assert.True(difference < TimeSpan.FromHours(24));
    }

    public void Dispose()
    {
        // 5.5 and 9. Delete the objects created and used by the class
        _ingredientUnderTest = null;
        _recipeUnderTest = null;
    }
}

