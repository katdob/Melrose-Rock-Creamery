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

INSERT INTO "Ingredient" ("Name", "Unit", "Amount") VALUES
-- 1 Simple Vanilla Ice Cream
  ('whole milk', 'cup', 1),
  ('granulated sugar', 'cup', 0.75),
  ('salt flakes', 'pinch', 1),
  ('heavy cream', 'cup', 2),
  ('vanilla extract', 'tbsp', 1),
  -- 2 Simple Chocolate Ice Cream
  ('cocoa powder, sifted', 'cup', 0.75),
  ('granulated sugar', 'cup', 0.5), 
  ('dark brown sugar, measured packed', 'cup', 0.34), 
  ('vanilla extract', 'teaspoon', 1.5), 
  -- 3 Butter Pecan Ice Cream
  ('unsalted butter, for Buttered Pecans', 'tablespoons', 4),
  ('pecans, for Buttered Pecans', 'cup', 1),
  ('salt flakes, for Buttered Pecans', 'teaspoon', 1),
  ('vanilla extract', 'tablespoon', 1),
  -- 4 Fresh Strawberry Ice Cream
  ('fresh, ripe strawberries, hulled and halved (or quartered, if they are large)', 'cup', 1.5),
  ('whole milk', 'cup', 0.75),
  ('granulated sugar', 'cup', 0.66),
  -- 5 Peanut Butter Cup Ice Cream
  ('good quality peanut butter (not natural)', 'cup', 1),
  ('granulated sugar', 'cup', 0.34),
  ('vanilla extract', 'teaspoon', 1),
  ('chopped Reeses Peanut Butter Cups (or 15 mini cups)', 'cup', 1);

-- 1 Simple Vanilla Ice Cream
INSERT INTO "Instruction" ("RecipeId", "Text", "Order") VALUES 
(1, 'This ice cream can easily be dressed up by adding your favorite chopped candies or sprinkles at the end of churning.', 1), 
(1, 'Makes about 4 and 1/2 cups (nine, 1/2-cup servings)', 2), 
(1, 'In a medium bowl, use a hand mixer on low speed or whisk to combine the milk, sugar and salt until the sugar is dissolved.', 3), 
(1, 'Stir in the heavy cream and vanilla extract.', 4), 
(1, 'Cover and refrigerate a minimum of 2 hours, preferably overnight.', 5), 
(1, 'Whisk mixture together again before continuing', 6), 
(1, 'Put the frozen freezer bowl into your 2 Quart ice cream maker and turn it on. Pour the mixture into the frozen freezer bowl.', 7), 
(1, 'Churn for 15 to 20 minutes. The longer you churn the firmer the consistency.', 8), 
(1, 'After churning, spoon ice cream into the container, adding mix-ins at each layer as desired.', 9), 
(1, 'Put wax paper over the top layer of ice cream to prevent freezer burn. Cover and freeze for a minimum of 2 hours.', 10);

-- 2 Simple Chocolate Ice Cream
INSERT INTO "Instruction" ("RecipeId", "Text", "Order") VALUES 
(2, 'Makes about 5 cups (ten, 1/2-cup servings)', 1), 
(2, 'In a medium bowl, whisk together the cocoa powder, sugars, and salt. Add the milk and, using the mixer on low speed or a whisk, beat to combine until the cocoa, sugars and salt are dissolved.', 2), 
(2, 'Stir in the heavy cream and vanilla extract. Cover and refrigerate for a minimum of 2 hours, preferably overnight.', 3),
(2, 'Whisk mixture together again before continuing.', 4), 
(2, 'Put the frozen freezer bowl into your 2 Quart ice cream maker and turn it on. Pour the mixture into the frozen freezer bowl.', 5), 
(2, 'Let the mixture churn for 15 to 20 minutes. The longer you churn the firmer the consistency.', 6), 
(2, 'After churning, spoon ice cream into the container, adding mix-ins at each layer as desired.', 7), 
(2, 'Put wax paper over the top layer of ice cream to prevent freezer burn. Cover and freeze for a minimum of 2 hours.', 8);

-- 3 Butter Pecan Ice Cream
INSERT INTO "Instruction" ("RecipeId", "Text", "Order") VALUES 
(3, 'The butter used to toast the pecans can be saved and used over pancakes or waffles.', 1), 
(3, 'Makes about 5 cups (ten, 1/2-cup servings)', 2), 
(3, 'Prepare the Buttered Pecans. Melt the butter in a medium frypan. Add the pecans and 1 teaspoon of salt.', 3), 
(3, 'Cook over medium-low heat until the pcans are toasted and golden, stirring frequently, about 6 to 8 minutes.', 4), 
(3, 'Remove from the heat, strain and reserve the pecans, allowing them to chill. The butter can be for another use.', 5), 
(3, 'Prepare the Ice Cream Base. In a medium bowl, use a mixer on low speed or whisk to bomcine the milk, sugar, and a pinch of salt until the sugar is dissolved.', 6), 
(3, 'Stir in the heavy cream and vanilla extract. Cover and refrigerate a minimum of 2 hours, preferably overnight.', 7), 
(3, 'Whisk mixture together again before continuing.', 8), 
(3, 'Put the frozen freezer bowl into your 2 Quart ice cream maker and turn it on. Pour the milk/cream mixture into the frozen freezer bowl and churn.', 9), 
(3, 'Churn for 15 to 20 minutes. The longer you churn the firmer the consistency.', 10), 
(3, 'After churning, spoon ice cream into the container, adding pecanss at each layer as desired.', 11), 
(3, 'Put wax paper over the top layer of ice cream to prevent freezer burn. Cover and freeze for a minimum of 2 hours.', 12);

-- 4 Fresh Strawberry Ice Cream
INSERT INTO "Instruction" ("RecipeId", "Text", "Order") VALUES 
(4, 'Best made when strawberries are in peak season, this ice crema is light, sweet, and fluffy.', 1), 
(4, 'Makes about 5 cups (ten, 1/2-cup servings).', 2), 
(4, 'Put the strawberries into a bowl of a food processor fitted with the chopping blade. Pluse strawverries until rough/fine chopped (depending on prefernence).', 3), 
(4, 'In a medium bowl, use a mixer on low speed or whisk to combine the milk, sugar,and salt until the sugar is dissolved. Stir in the heavy cream and vanilla extract.', 4), 
(4, 'Stir in the reserved strawverries with all juices. Cover and refrigerate a minimum of 2 hours, preferably overnight.', 5), 
(4, 'Whisk mixture together again before continuing.', 6), 
(4, 'Put the frozen freezer bowl into your 2 Quart ice cream maker and turn it on. Pour the mixture into the frozen freezer bowl and churn.', 7), 
(4, 'Churn for 15 to 20 minutes. The longer you churn the firmer the consistency.', 8), 
(4, 'After churning, spoon ice cream into the container, adding strawberries at each layer as desired.', 9);

-- 5 Peanut Butter Cup Ice Cream
INSERT INTO "Instruction" ("RecipeId", "Text", "Order") VALUES 
(5, 'This ice cream freezes more quickly than others, so keep a close eye on it to allow enough time to add decadent peanut butter cups.', 1), 
(5, 'Makes about 5 cups (ten, 1/2-cup servings).', 2), 
(5, 'In amedium bowl, mix on low speed to combine the peanut butter and sugar until smooth. Add the milk and mix on low speed until the sugar is dissolved.', 3), 
(5, 'Stir in the heavy cream and vanilla extract. Cover and refrigerate a minimum of 2 hours, preferably overnight.', 4), 
(5, 'Whisk mixture together again before continuing.', 5), 
(5, 'Put the frozen freezer bowl into your 2 Quart ice cream maker and turn it on. Pour the mixture into the frozen freezer bowl and churn.', 6), 
(5, 'Churn for 8 to 10 minutes. The longer you churn the firmer the consistency.', 7), 
(5, 'After churning, spoon ice cream into the container, adding chopped Reeses Peanut Butter Cups (or 15 mini cups) at each layer as desired.', 8), 
(5, 'Put wax paper over the top layer of ice cream to prevent freezer burn. Cover and freeze for a minimum of 2 hours.', 9);
