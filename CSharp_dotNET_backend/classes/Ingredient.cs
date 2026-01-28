using Csharp_dotNET_backend.Interfaces;

namespace Csharp_dotNET_backend.Classes;

public class Ingredient : IIngredient
{
    private string _name;
    private string _unit;
    private double _amount;
    private int _recipe;

    public string Name
    {
        get { return _name; }
        set { _name = value; }
    }

    public string Unit
    {
        get { return _unit; }
        set { _unit = value; }
    }

    public double Amount
    {
        get { return _amount; }
        set { _amount = value; }
    }

    public int Recipe
    {
        get { return _recipe; }
        set { _recipe = value; }
    }

    public Ingredient()
    {
        _name = string.Empty;
        _unit = string.Empty;
        _amount = 0;
        _recipe = 0;
    }

    public Ingredient(string name, string unit, double amount, int recipe)
    {
        _name = name;
        _unit = unit;
        _amount = amount;
        _recipe = recipe;
    }
}
