namespace MRC_API.Models;

public class Recipe
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Author { get; set; } = string.Empty;
    public DateTime CreatedDate { get; set; }
    public int[]? IngredientsList { get; set; }
    public bool Shareable { get; set; } = false;
    public int? CreatingUser { get; set; }
}
