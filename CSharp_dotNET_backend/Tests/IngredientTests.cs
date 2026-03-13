using System;
using Csharp_dotNET_backend.Classes;
using Xunit;

namespace Csharp_dotNET_backend.Tests;

public class IngredientTests : IDisposable
{
    private readonly string test_IngredientName = "TestIngredient TestName";
    private readonly string test_IngredientUnit = "TestAuthor TestUnit";
    private readonly string test_Amount = "TestAuthor TestAmount";

    private Ingredient? _ingredientUnderTest;

    public IngredientTests()
    {
        // Use the test_* values to construct the ingredient under test
        _ingredientUnderTest = new Ingredient(
            test_IngredientName,
            test_IngredientUnit,
            amount: test_Amount.Length
        );
    }

    [Fact]
    public void Ingredient_IsCreated_WithExpectedProperties()
    {
        Assert.NotNull(_ingredientUnderTest);

        Assert.Equal(test_IngredientName, _ingredientUnderTest!.Name);
        Assert.Equal(test_IngredientUnit, _ingredientUnderTest.Unit);
        Assert.Equal(test_Amount.Length, _ingredientUnderTest.Amount);
    }

    [Fact]
    public void Ingredient_Properties_CanBeUpdated()
    {
        Assert.NotNull(_ingredientUnderTest);

        const double newAmount = 42.5;
        _ingredientUnderTest!.Name = test_IngredientName + " Updated";
        _ingredientUnderTest.Unit = test_IngredientUnit + " Updated";
        _ingredientUnderTest.Amount = newAmount;

        Assert.StartsWith(test_IngredientName, _ingredientUnderTest.Name);
        Assert.StartsWith(test_IngredientUnit, _ingredientUnderTest.Unit);
        Assert.Equal(newAmount, _ingredientUnderTest.Amount);
    }

    public void Dispose()
    {
        // \"Delete\" the ingredient instance when the test class is done
        _ingredientUnderTest = null;
    }
}

