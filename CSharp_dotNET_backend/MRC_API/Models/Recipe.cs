namespace MRC_API.Models;

public class Recipe
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Author { get; set; } = string.Empty;
    public DateTime CreatedDate { get; set; }
    public List<int>? IngredientList { get; set; }
    public List<Ingredient> Ingredients { get; set; } = new();
    public List<Instruction> Instructions { get; set; } = new();
}
