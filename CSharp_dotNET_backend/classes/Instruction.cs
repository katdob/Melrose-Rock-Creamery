using Csharp_dotNET_backend.Interfaces;

namespace Csharp_dotNET_backend.Classes;

public class Instruction : IInstruction
{
    private string _author;
    private int _recipe;
    private int _order;

    public string Author
    {
        get { return _author; }
        set { _author = value; }
    }

    public int Recipe
    {
        get { return _recipe; }
        set { _recipe = value; }
    }

    public int Order
    {
        get { return _order; }
        set { _order = value; }
    }

    public Instruction()
    {
        _author = string.Empty;
        _recipe = 0;
        _order = 0;
    }

    public Instruction(string author, int recipe, int order)
    {
        _author = author;
        _recipe = recipe;
        _order = order;
    }
}
