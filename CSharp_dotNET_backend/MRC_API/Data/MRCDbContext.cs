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
        });

        modelBuilder.Entity<Ingredient>(e =>
        {
            e.HasKey(x => x.Id);
            e.Property(x => x.Name).HasMaxLength(200);
            e.Property(x => x.Unit).HasMaxLength(50);
        });

        modelBuilder.Entity<Instruction>(e =>
        {
            e.HasKey(x => x.Id);
            e.HasIndex(x => x.RecipeId);
        });
    }
}
