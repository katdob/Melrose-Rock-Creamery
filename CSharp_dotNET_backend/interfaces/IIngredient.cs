namespace Csharp_dotNET_backend.Interfaces;

public interface IIngredient
{
    string Name { get; set; }
    string Unit { get; set; }
    double Amount { get; set; }
    int Recipe { get; set; }
}
