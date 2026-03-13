using System;
using MRC_API.Models;
using Xunit;

namespace Csharp_dotNET_backend.Tests;

public class SauceTest : IDisposable
{
    private readonly string test_SauceName = "TestSauceName";
    private readonly string test_SauceUnit = "cup";
    private readonly string test_SauceAmount = "1/8";
    private readonly string test_SauceBrand = "Sandi's Ice Cream Sauces, Inc.";
    private readonly bool test_SauceSugarFree = true;

    private Sauce? _sauceUnderTest;

    public SauceTest()
    {
        // 7. Use these variables to create a new Sauce
        _sauceUnderTest = new Sauce
        {
            Name = test_SauceName,
            Unit = test_SauceUnit,
            // For this test, interpret "1/8" as 0.125
            Amount = 0.125,
            Brand = test_SauceBrand,
            SugarFree = test_SauceSugarFree,
        };
    }

    [Fact]
    public void Sauce_IsCreated_WithExpectedProperties()
    {
        Assert.NotNull(_sauceUnderTest);

        Assert.Equal(test_SauceName, _sauceUnderTest!.Name);
        Assert.Equal(test_SauceUnit, _sauceUnderTest.Unit);
        Assert.Equal(0.125, _sauceUnderTest.Amount);
        Assert.Equal(test_SauceBrand, _sauceUnderTest.Brand);
        Assert.Equal(test_SauceSugarFree, _sauceUnderTest.SugarFree);
    }

    public void Dispose()
    {
        // 9. Delete the Sauce object used in the test
        _sauceUnderTest = null;
    }
}

