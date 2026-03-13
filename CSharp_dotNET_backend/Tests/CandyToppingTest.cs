using System;
using MRC_API.Models;
using Xunit;

namespace Csharp_dotNET_backend.Tests;

public class CandyToppingTest : IDisposable
{
    private readonly string test_CandyToppingName = "TestCandyToppingName";
    private readonly string test_CandyToppingUnit = "scoop";
    private readonly string test_CandyToppingAmount = "1";
    private readonly string test_CandyToppingBranc = "Candi's Candy Toppings, Inc.";
    private readonly bool test_CandyToppingSugarFree = true;

    private CandyTopping? _candyToppingUnderTest;

    public CandyToppingTest()
    {
        // 7. Use these variables to create a new CandyTopping
        _candyToppingUnderTest = new CandyTopping
        {
            Name = test_CandyToppingName,
            Unit = test_CandyToppingUnit,
            Amount = double.Parse(test_CandyToppingAmount),
            Brand = test_CandyToppingBranc,
            SugarFree = test_CandyToppingSugarFree,
        };
    }

    [Fact]
    public void CandyTopping_IsCreated_WithExpectedProperties()
    {
        Assert.NotNull(_candyToppingUnderTest);

        Assert.Equal(test_CandyToppingName, _candyToppingUnderTest!.Name);
        Assert.Equal(test_CandyToppingUnit, _candyToppingUnderTest.Unit);
        Assert.Equal(double.Parse(test_CandyToppingAmount), _candyToppingUnderTest.Amount);
        Assert.Equal(test_CandyToppingBranc, _candyToppingUnderTest.Brand);
        Assert.Equal(test_CandyToppingSugarFree, _candyToppingUnderTest.SugarFree);
    }

    public void Dispose()
    {
        // 9. Delete the CandyTopping object used in the test
        _candyToppingUnderTest = null;
    }
}

