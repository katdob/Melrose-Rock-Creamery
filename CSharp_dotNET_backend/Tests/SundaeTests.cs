using System;
using MRC_API.Models;
using Xunit;

namespace Csharp_dotNET_backend.Tests;

public class SundaeTests : IDisposable
{
    // 2–4. Sundae test data
    private readonly string test_SundaeName = "TestSundaeName";
    private readonly string test_SundaeAuthor = "TestAuthor TestName";
    private readonly DateTime test_DateTime = DateTime.UtcNow;

    // 5–7. Sundae property test data (Weight is double; Banana is int)
    private readonly double test_Weight = 226.79;
    private readonly string test_Container = "bowl";
    private readonly int test_Banana = 2;

    // 8. Ice cream type ingredient test data
    private readonly string test_IceCreamTypeName = "TestIceCreamTypeName";
    private readonly string test_IceCreamTypeUnit = "TestIceCreamTypeUnit";
    private readonly string test_IceCreamTypeAmount = "TestIceCreamTypeAmount";

    // 9. Toppings ingredient test data
    private readonly string test_ToppingsName = "TestToppingsName";
    private readonly string test_ToppingsUnit = "TestToppingsUnit";
    private readonly string test_ToppingsAmount = "TestToppingsAmount";

    private Ingredient? _iceCreamTypeIngredient;
    private Ingredient? _toppingsIngredient;
    private Sundae? _sundaeUnderTest;

    public SundaeTests()
    {
        // 8.4 – Create ingredient for IceCreamTypes list
        _iceCreamTypeIngredient = new Ingredient
        {
            Id = 1,
            Name = test_IceCreamTypeName,
            Unit = test_IceCreamTypeUnit,
            Amount = 1.0 // test_IceCreamTypeAmount used as identifier; amount stored as double
        };

        // 9.4 – Create ingredient for Toppings list
        _toppingsIngredient = new Ingredient
        {
            Id = 2,
            Name = test_ToppingsName,
            Unit = test_ToppingsUnit,
            Amount = 1.0
        };

        // 10 – Create new Sundae with the specified properties
        _sundaeUnderTest = new Sundae
        {
            Name = test_SundaeName,
            Author = test_SundaeAuthor,
            CreatedDate = test_DateTime,
            Weight = test_Weight,
            Banana = test_Banana,
            Container = test_Container,
            Toppings = new[] { _toppingsIngredient.Id },
            IceCreamTypes = new[] { _iceCreamTypeIngredient.Id }
        };
    }

    [Fact]
    public void Sundae_IsCreated_WithExpectedProperties()
    {
        Assert.NotNull(_sundaeUnderTest);

        // 11.1 – Name
        Assert.Equal(test_SundaeName, _sundaeUnderTest!.Name);

        // 11.2 – Author
        Assert.Equal(test_SundaeAuthor, _sundaeUnderTest.Author);

        // 11.3 – CreatedDate within 24 hours of test_DateTime
        var difference = (_sundaeUnderTest.CreatedDate - test_DateTime).Duration();
        Assert.True(difference < TimeSpan.FromHours(24));

        // 11.4 – Weight
        Assert.Equal(test_Weight, _sundaeUnderTest.Weight);

        // 11.5 – Container
        Assert.Equal(test_Container, _sundaeUnderTest.Container);

        // 11.6 – Banana
        Assert.Equal(test_Banana, _sundaeUnderTest.Banana);

        // 11.7 – Toppings: look up ingredient "TestToppingsName" and test id against Sundae.Toppings
        Assert.NotNull(_toppingsIngredient);
        Assert.Equal(test_ToppingsName, _toppingsIngredient!.Name);
        Assert.NotNull(_sundaeUnderTest.Toppings);
        Assert.Contains(_toppingsIngredient.Id, _sundaeUnderTest.Toppings!);

        // 11.8 – IceCreamTypes: look up ingredient "TestIceCreamTypeName" and test id against Sundae.IceCreamTypes
        Assert.NotNull(_iceCreamTypeIngredient);
        Assert.Equal(test_IceCreamTypeName, _iceCreamTypeIngredient!.Name);
        Assert.NotNull(_sundaeUnderTest.IceCreamTypes);
        Assert.Contains(_iceCreamTypeIngredient.Id, _sundaeUnderTest.IceCreamTypes!);
    }

    public void Dispose()
    {
        // 8.5, 9.5, 12 – Delete objects created and used by the class
        _iceCreamTypeIngredient = null;
        _toppingsIngredient = null;
        _sundaeUnderTest = null;
    }
}
