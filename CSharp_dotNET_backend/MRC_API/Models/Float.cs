namespace MRC_API.Models;

public class Float : Recipe
{
    public List<int> IceCreamTypes { get; set; } = new();
    public int StrawNumber { get; set; }
    public List<int> MixIns { get; set; } = new();
}
