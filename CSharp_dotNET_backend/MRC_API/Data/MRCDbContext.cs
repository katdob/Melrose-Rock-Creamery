using Microsoft.EntityFrameworkCore;
using MRC_API.Models;

namespace MRC_API.Data;

public class MRCDbContext : DbContext
{
    public MRCDbContext(DbContextOptions<MRCDbContext> options) : base(options) { }

    public DbSet<Recipe> Recipes => Set<Recipe>();
    public DbSet<Ingredient> Ingredients => Set<Ingredient>();
    public DbSet<Instruction> Instructions => Set<Instruction>();
    public DbSet<User> Users => Set<User>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Recipe>(e =>
        {
            e.ToTable("Recipe");
            e.HasKey(x => x.Id);
            e.Property(x => x.Name).HasMaxLength(200);
            e.Property(x => x.Author).HasMaxLength(100);
            e.Property(x => x.IngredientsList).HasColumnName("IngredientList");
            e.Property(x => x.Shareable).HasDefaultValue(false);
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

        modelBuilder.Entity<User>(e =>
        {
            e.ToTable("User");
            e.HasKey(x => x.Id);
            e.Property(x => x.FirstName).HasMaxLength(120);
            e.Property(x => x.LastName).HasMaxLength(120);
            e.Property(x => x.Email).HasMaxLength(120);
            e.HasIndex(x => x.Email).IsUnique();
            e.Property(x => x.IsActive).HasDefaultValue(false);
            e.Property(x => x.PasswordHash).HasMaxLength(500);
            e.Property(x => x.RefreshTokenHash).HasMaxLength(500);
        });
    }
}
