namespace MRC_API.Models;

public class Sundae : Recipe
{
    public double Weight { get; set; }
    public string Container { get; set; } = string.Empty;
}
