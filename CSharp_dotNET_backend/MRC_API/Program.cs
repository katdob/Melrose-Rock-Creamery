using Microsoft.EntityFrameworkCore;
using MRC_API.Data;
using MRC_API.Endpoints;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer();

// PostgreSQL connection via Npgsql + Entity Framework Core
var conn = builder.Configuration.GetConnectionString("DefaultConnection");
if (string.IsNullOrEmpty(conn))
    throw new InvalidOperationException("ConnectionStrings:DefaultConnection is required.");
builder.Services.AddDbContext<MRCDbContext>(options =>
    options.UseNpgsql(conn));

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    if (scope.ServiceProvider.GetService<MRCDbContext>() is { } db)
    {
        try
        {
            db.Database.EnsureCreated();
            SeedDB.Seed(db);
        }
        catch (Exception ex) when (app.Environment.IsDevelopment())
        {
            Console.WriteLine($"Seed/DB: {ex.Message}");
        }
        catch { /* ignore when DB unavailable */ }
    }
}

// Seed-only mode: dotnet run -- seed
if (args.Contains("seed", StringComparer.OrdinalIgnoreCase))
{
    Console.WriteLine("Seed completed. Exiting.");
    return;
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapFirstApi();
app.MapGetRecipes();
app.MapIngredients();
app.MapInstructions();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast =  Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
