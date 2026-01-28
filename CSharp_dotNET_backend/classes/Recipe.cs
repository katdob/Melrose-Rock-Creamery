using Csharp_dotNET_backend.Interfaces;

namespace Csharp_dotNET_backend.Classes;

public class Recipe : IRecipe
{
    private string _author;
    private DateTime _createdDate;
    private List<int> _ingredientsList;
    private List<int> _instructionsList;

    public string Author
    {
        get { return _author; }
        set { _author = value; }
    }

    public DateTime CreatedDate
    {
        get { return _createdDate; }
        set { _createdDate = value; }
    }

    public List<int> IngredientsList
    {
        get { return _ingredientsList; }
        set { _ingredientsList = value; }
    }

    public List<int> InstructionsList
    {
        get { return _instructionsList; }
        set { _instructionsList = value; }
    }

    public Recipe()
    {
        _author = string.Empty;
        _createdDate = DateTime.Now;
        _ingredientsList = new List<int>();
        _instructionsList = new List<int>();
    }

    public Recipe(string author, DateTime createdDate, List<int> ingredientsList, List<int> instructionsList)
    {
        _author = author;
        _createdDate = createdDate;
        _ingredientsList = ingredientsList;
        _instructionsList = instructionsList;
    }
}
