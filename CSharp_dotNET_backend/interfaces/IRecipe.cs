namespace Csharp_dotNET_backend.Interfaces;

public interface IRecipe
{
    string Author { get; set; }
    DateTime CreatedDate { get; set; }
    List<int> IngredientsList { get; set; }
    List<int> InstructionsList { get; set; }
}
