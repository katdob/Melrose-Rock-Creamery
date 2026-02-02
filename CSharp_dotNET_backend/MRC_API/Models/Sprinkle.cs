namespace MRC_API.Models;

public class Sprinkle : Ingredient
{
    public string Color { get; set; } = string.Empty;
    public string Brand { get; set; } = string.Empty;
    public bool SugarFree { get; set; }
}
