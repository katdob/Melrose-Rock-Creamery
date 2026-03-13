namespace MRC_API.Models;

public class MilkShake : Recipe
{
    public int[]? IceCreamTypes { get; set; } // a list of ingredients 
    public int StrawNumber { get; set; }
    public int[]? MixIns { get; set; } // a list of ingredients 
}
