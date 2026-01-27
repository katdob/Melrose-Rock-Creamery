namespace Csharp_dotNET_backend.Interfaces;

public interface IInstruction
{
    string Author { get; set; }
    int Recipe { get; set; }
    int Order { get; set; }
}
