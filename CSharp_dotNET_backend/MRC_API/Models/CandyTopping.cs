namespace MRC_API.Models;

public class CandyTopping : Ingredient
{
    public string Brand { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public bool SugarFree { get; set; }
}
