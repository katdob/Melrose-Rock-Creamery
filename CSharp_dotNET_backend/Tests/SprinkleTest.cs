using System;
using MRC_API.Models;
using Xunit;

namespace Csharp_dotNET_backend.Tests;

public class SprinkleTest : IDisposable
{
    private readonly string test_SprinkleName = "TestSprinkleName";
    private readonly string test_SprinkleUnit = "cup";
    private readonly string test_SprinkleAmount = "1/8";
    private readonly string test_SprinkleBrand = "Sandi's Ice Cream Sprinkles, Inc.";
    private readonly bool test_SprinkleSugarFree = true;

    private Sprinkle? _sprinkleUnderTest;

    public SprinkleTest()
    {
        // 7. Use these variables to create a new Sprinkle
        _sprinkleUnderTest = new Sprinkle
        {
            Name = test_SprinkleName,
            Unit = test_SprinkleUnit,
            // Interpret "1/8" as 0.125 for the numeric Amount
            Amount = 0.125,
            Brand = test_SprinkleBrand,
            SugarFree = test_SprinkleSugarFree,
        };
    }

    [Fact]
    public void Sprinkle_IsCreated_WithExpectedProperties()
    {
        Assert.NotNull(_sprinkleUnderTest);

        Assert.Equal(test_SprinkleName, _sprinkleUnderTest!.Name);
        Assert.Equal(test_SprinkleUnit, _sprinkleUnderTest.Unit);
        Assert.Equal(0.125, _sprinkleUnderTest.Amount);
        Assert.Equal(test_SprinkleBrand, _sprinkleUnderTest.Brand);
        Assert.Equal(test_SprinkleSugarFree, _sprinkleUnderTest.SugarFree);
    }

    public void Dispose()
    {
        // 9. Delete the Sprinkle object used in the test
        _sprinkleUnderTest = null;
    }
}

