namespace MRC_API.Models;

public class Sundae : Recipe
{
    public double Weight { get; set; }
    public string Container { get; set; } = string.Empty;
    public int[]? IceCreamTypes { get; set; } // a list of ingredients 
    public int[]? Toppings { get; set; } // a list of ingredients 
    public int Banana { get; set; } // the number of bananas to use! this object can describe banana splits as well 
}
