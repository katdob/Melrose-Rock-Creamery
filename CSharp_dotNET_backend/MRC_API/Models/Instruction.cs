namespace MRC_API.Models;

public class Instruction
{
    public int Id { get; set; }
    public string Text { get; set; } = string.Empty;
    public int Order { get; set; }
    public int RecipeId { get; set; }
}
