namespace MRC_API.Models;

public class Sauce : Ingredient
{
    public string Brand { get; set; } = string.Empty;
    public bool SugarFree { get; set; }
}
