using Microsoft.EntityFrameworkCore;
using MRC_API.Models;

namespace MRC_API.Data;

public class MRCDbContext : DbContext
{
    public MRCDbContext(DbContextOptions<MRCDbContext> options) : base(options) { }

    public DbSet<Recipe> Recipes => Set<Recipe>();
    public DbSet<Ingredient> Ingredients => Set<Ingredient>();
    public DbSet<Instruction> Instructions => Set<Instruction>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Recipe>(e =>
        {
            e.ToTable("Recipe");
            e.HasKey(x => x.Id);
            e.Property(x => x.Name).HasMaxLength(200);
            e.Property(x => x.Author).HasMaxLength(100);
            e.Property(x => x.IngredientList);
            e.Ignore(x => x.Ingredients); // Link via IngredientList, not FK
        });

        modelBuilder.Entity<Ingredient>(e =>
        {
            e.ToTable("Ingredient");
            e.HasKey(x => x.Id);
            e.Property(x => x.Name).HasMaxLength(200);
            e.Property(x => x.Unit).HasMaxLength(50);
        });

        modelBuilder.Entity<Instruction>(e =>
        {
            e.ToTable("Instruction");
            e.HasKey(x => x.Id);
            e.HasIndex(x => x.RecipeId);
        });
    }
}
