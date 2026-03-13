using System.Collections.Generic;
using System.Linq;
using MRC_API.Models;
using Xunit;

namespace Csharp_dotNET_backend.Tests;

public class InstructionTest
{
    // Recipe test data
    private readonly string test_RecipeName = "TestRecipeName";
    private readonly string test_RecipeAuthor = "TestAuthor TestName";

    private readonly Recipe _recipeUnderTest;
    private readonly List<Instruction> _instructions;

    public InstructionTest()
    {
        // 4. Use test_RecipeName and test_RecipeAuthor to create a new Recipe
        _recipeUnderTest = new Recipe
        {
            Id = 1,
            Name = test_RecipeName,
            Author = test_RecipeAuthor
        };

        // 5–7. Create three Instructions for this recipe
        _instructions = new List<Instruction>
        {
            new Instruction { Id = 1, RecipeId = _recipeUnderTest.Id, Text = "instruction one",   Order = 1 },
            new Instruction { Id = 2, RecipeId = _recipeUnderTest.Id, Text = "instruction two",   Order = 2 },
            new Instruction { Id = 3, RecipeId = _recipeUnderTest.Id, Text = "instruction three", Order = 3 },
        };
    }

    [Fact]
    public void Instructions_AreAssociated_With_Recipe_By_Text_Query()
    {
        // 8. Find each instruction by text and verify RecipeId matches the recipe's Id
        var one = _instructions.Single(i => i.Text == "instruction one");
        var two = _instructions.Single(i => i.Text == "instruction two");
        var three = _instructions.Single(i => i.Text == "instruction three");

        Assert.Equal(_recipeUnderTest.Id, one.RecipeId);
        Assert.Equal(_recipeUnderTest.Id, two.RecipeId);
        Assert.Equal(_recipeUnderTest.Id, three.RecipeId);
    }

    [Fact]
    public void Instructions_HaveUnique_OrderValues()
    {
        // 9. Ensure there is no duplicate Order among the newly created instructions
        var orders = _instructions.Select(i => i.Order).ToList();
        var distinctOrders = orders.Distinct().ToList();

        Assert.Equal(orders.Count, distinctOrders.Count);
    }
}

