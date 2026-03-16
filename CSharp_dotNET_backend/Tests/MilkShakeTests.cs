using System;
using MRC_API.Models;
using Xunit;

namespace Csharp_dotNET_backend.Tests;

public class MilkShakeTests : IDisposable
{
    // 2–5. MilkShake test data
    private readonly string test_MilkShakeName = "TestMilkShakeName";
    private readonly string test_MilkShakeAuthor = "TestAuthor";
    private readonly DateTime test_DateTime = DateTime.UtcNow;
    private readonly int test_MilkShakeStrawNumber = 1;

    // 6. Ice cream type ingredient test data (for MilkShake.IceCreamTypes)
    private readonly string test_IceCreamTypeName = "IceCreamTypeName";
    private readonly string test_IceCreamTypeUnit = "IceCreamTypeUnit";
    private readonly string test_IceCreamTypeAmount = "IceCreamTypeAmount";

    // 7. Mix-ins ingredient test data (for MilkShake.MixIns)
    private readonly string test_MixInsName = "MixInsName";
    private readonly string test_MixInsUnit = "MixInsUnit";
    private readonly string test_MixInsAmount = "MixInsAmount";

    private Ingredient? _iceCreamTypeIngredient;
    private Ingredient? _mixInsIngredient;
    private MilkShake? _milkShakeUnderTest;

    public MilkShakeTests()
    {
        // 6.4 – Create ingredient for IceCreamTypes list (using test_IceCreamType* variables)
        _iceCreamTypeIngredient = new Ingredient
        {
            Id = 1,
            Name = test_IceCreamTypeName,
            Unit = test_IceCreamTypeUnit,
            Amount = 1.0
        };

        // 7.4 – Create ingredient for MixIns list
        _mixInsIngredient = new Ingredient
        {
            Id = 2,
            Name = test_MixInsName,
            Unit = test_MixInsUnit,
            Amount = 1.0
        };

        // 8 – Create new MilkShake with the specified properties
        _milkShakeUnderTest = new MilkShake
        {
            Name = test_MilkShakeName,
            Author = test_MilkShakeAuthor,
            CreatedDate = test_DateTime,
            StrawNumber = test_MilkShakeStrawNumber,
            IceCreamTypes = new[] { _iceCreamTypeIngredient.Id },
            MixIns = new[] { _mixInsIngredient.Id }
        };
    }

    [Fact]
    public void MilkShake_IsCreated_WithExpectedProperties()
    {
        Assert.NotNull(_milkShakeUnderTest);

        // 9.1 – Name
        Assert.Equal(test_MilkShakeName, _milkShakeUnderTest!.Name);

        // 9.2 – Author
        Assert.Equal(test_MilkShakeAuthor, _milkShakeUnderTest.Author);

        // 9.3 – CreatedDate within 24 hours of test_DateTime
        var difference = (_milkShakeUnderTest.CreatedDate - test_DateTime).Duration();
        Assert.True(difference < TimeSpan.FromHours(24));

        // 9.4 – StrawNumber
        Assert.Equal(test_MilkShakeStrawNumber, _milkShakeUnderTest.StrawNumber);

        // 9.5 – IceCreamTypes: look up ingredient "IceCreamTypeName" and test id against MilkShake.IceCreamTypes
        Assert.NotNull(_iceCreamTypeIngredient);
        Assert.Equal(test_IceCreamTypeName, _iceCreamTypeIngredient!.Name);
        Assert.NotNull(_milkShakeUnderTest.IceCreamTypes);
        Assert.Contains(_iceCreamTypeIngredient.Id, _milkShakeUnderTest.IceCreamTypes!);

        // 9.6 – MixIns: look up ingredient "MixInsName" and test id against MilkShake.MixIns
        Assert.NotNull(_mixInsIngredient);
        Assert.Equal(test_MixInsName, _mixInsIngredient!.Name);
        Assert.NotNull(_milkShakeUnderTest.MixIns);
        Assert.Contains(_mixInsIngredient.Id, _milkShakeUnderTest.MixIns!);
    }

    public void Dispose()
    {
        // 6.5, 7.5, 10 – Delete objects created and used by the class
        _iceCreamTypeIngredient = null;
        _mixInsIngredient = null;
        _milkShakeUnderTest = null;
    }
}
