using System;
using MRC_API.Models;
using Xunit;

namespace Csharp_dotNET_backend.Tests;

public class FloatTests : IDisposable
{
    // 2–6. Float test data
    private readonly string test_FloatName = "TestFloatName";
    private readonly string test_FloatAuthor = "TestFloatAuthor";
    private readonly DateTime test_DateTime = DateTime.UtcNow;
    private readonly int test_FloatStrawNumber = 1;
    private readonly int test_FloatSoda = 1;

    // 7. Ice cream type ingredient test data (for Float.IceCreamTypes)
    private readonly string test_IceCreamTypeName = "IceCreamTypeName";
    private readonly string test_IceCreamTypeUnit = "IceCreamTypeUnit";
    private readonly string test_IceCreamTypeAmount = "IceCreamTypeAmount";

    private Ingredient? _iceCreamTypeIngredient;
    private Float? _floatUnderTest;

    public FloatTests()
    {
        // 7.4 – Create ingredient for IceCreamTypes list (using test_IceCreamType* variables)
        _iceCreamTypeIngredient = new Ingredient
        {
            Id = 1,
            Name = test_IceCreamTypeName,
            Unit = test_IceCreamTypeUnit,
            Amount = 1.0
        };

        // 8 – Create new Float with the specified properties
        _floatUnderTest = new Float
        {
            Name = test_FloatName,
            Author = test_FloatAuthor,
            CreatedDate = test_DateTime,
            StrawNumber = test_FloatStrawNumber,
            Soda = test_FloatSoda,
            IceCreamTypes = new[] { _iceCreamTypeIngredient.Id }
        };
    }

    [Fact]
    public void Float_IsCreated_WithExpectedProperties()
    {
        Assert.NotNull(_floatUnderTest);

        // 9.1 – Name
        Assert.Equal(test_FloatName, _floatUnderTest!.Name);

        // 9.2 – Author
        Assert.Equal(test_FloatAuthor, _floatUnderTest.Author);

        // 9.3 – CreatedDate within 24 hours of test_DateTime
        var difference = (_floatUnderTest.CreatedDate - test_DateTime).Duration();
        Assert.True(difference < TimeSpan.FromHours(24));

        // 9.4 – StrawNumber
        Assert.Equal(test_FloatStrawNumber, _floatUnderTest.StrawNumber);

        // 9.5 – Soda
        Assert.Equal(test_FloatSoda, _floatUnderTest.Soda);

        // 9.6 – IceCreamTypes: look up ingredient "IceCreamTypeName" and test id against Float.IceCreamTypes
        Assert.NotNull(_iceCreamTypeIngredient);
        Assert.Equal(test_IceCreamTypeName, _iceCreamTypeIngredient!.Name);
        Assert.NotNull(_floatUnderTest.IceCreamTypes);
        Assert.Contains(_iceCreamTypeIngredient.Id, _floatUnderTest.IceCreamTypes!);
    }

    public void Dispose()
    {
        // 7.5, 10 – Delete objects created and used by the class
        _iceCreamTypeIngredient = null;
        _floatUnderTest = null;
    }
}
