-- Seed Recipe rows (same 21 recipes as SeedDB.cs). Run against MRC_DB.
-- Run: bash scripts/seed-recipe-data.sh (from project root)
-- Requires: Recipe table exists (create_recipe_table.sql).
-- Run only when table is empty to avoid duplicates.

INSERT INTO "Recipe" ("Name", "Author", "CreatedDate") VALUES
  ('Simple Vanilla Ice Cream', 'Cuisinart', '2024-01-01'),
  ('Simple Chocolate Ice Cream', 'Cuisinart', '2024-01-01'),
  ('Butter Pecan Ice Cream', 'Cuisinart', '2024-01-01'),
  ('Fresh Strawberry Ice Cream', 'Cuisinart', '2024-01-01'),
  ('Peanut Butter Cup Ice Cream', 'Cuisinart', '2024-01-01'),
  ('S''mores Ice Cream', 'Cuisinart', '2024-01-01'),
  ('Banana Walnut Chip Ice Cream', 'Cuisinart', '2024-01-01'),
  ('Vanilla Bean Ice Cream', 'Cuisinart', '2024-01-01'),
  ('Fresh Mint and Chocolate Cookies Ice Cream', 'Cuisinart', '2024-01-01'),
  ('Mexican-Style Chocolate Ice Cream', 'Cuisinart', '2024-01-01'),
  ('Salted Caramel Ice Cream', 'Cuisinart', '2024-01-01'),
  ('Dark Chocolate Sorbet', 'Cuisinart', '2024-01-01'),
  ('Grapefruit and Prosecco Sorbet', 'Cuisinart', '2024-01-01'),
  ('Dairy-Free Vanilla Ice Cream', 'Cuisinart', '2024-01-01'),
  ('Coconut-Chocolate Ice Cream', 'Cuisinart', '2024-01-01'),
  ('Rich Vanilla Frozen Yogurt', 'Cuisinart', '2024-01-01'),
  ('Mango Frozen Yogurt', 'Cuisinart', '2024-01-01'),
  ('Chocolate-Pretzel Frozen Yogurt', 'Cuisinart', '2024-01-01'),
  ('Chocolate-Hazelnut Gelato', 'Cuisinart', '2024-01-01'),
  ('Espresso Gelato', 'Cuisinart', '2024-01-01'),
  ('Custard Gelato', 'Cuisinart', '2024-01-01');
