-- Create Ingredient table and seed rows (from ice-cream-recipes.pdf).
-- Recipe identified by "Name" (recipe title); one Ingredient row per recipe ingredient.
-- Run: bash scripts/seed-ingredient-data.sh (from project root)
-- Requires: Recipe table exists and is populated (create_recipe_table.sql, seed_recipe_data.sql).
-- Run only once; re-run will duplicate rows unless Ingredient is truncated first.

CREATE TABLE IF NOT EXISTS "Ingredient" (
    "Id"       SERIAL PRIMARY KEY,
    "RecipeId" INT NOT NULL REFERENCES "Recipe"("Id"),
    "Name"     VARCHAR(200) NOT NULL,
    "Unit"     VARCHAR(50)  NOT NULL DEFAULT '',
    "Amount"   DOUBLE PRECISION NOT NULL DEFAULT 0
);

INSERT INTO "Ingredient" ("RecipeId", "Name", "Unit", "Amount")
SELECT r."Id", i."Name", '', 0
FROM "Recipe" r
CROSS JOIN (VALUES
  ('whole milk'), ('granulated sugar'), ('salt flakes'), ('heavy cream'), ('pure vanilla extract')
) AS i("Name")
WHERE r."Name" = 'Simple Vanilla Ice Cream';

INSERT INTO "Ingredient" ("RecipeId", "Name", "Unit", "Amount")
SELECT r."Id", i."Name", '', 0
FROM "Recipe" r
CROSS JOIN (VALUES
  ('cocoa powder'), ('granulated sugar'), ('dark brown sugar'), ('salt flakes'),
  ('whole milk'), ('heavy cream'), ('pure vanilla extract')
) AS i("Name")
WHERE r."Name" = 'Simple Chocolate Ice Cream';

INSERT INTO "Ingredient" ("RecipeId", "Name", "Unit", "Amount")
SELECT r."Id", i."Name", '', 0
FROM "Recipe" r
CROSS JOIN (VALUES
  ('unsalted butter'), ('pecans'), ('salt flakes'), ('whole milk'),
  ('granulated sugar'), ('heavy cream'), ('pure vanilla extract')
) AS i("Name")
WHERE r."Name" = 'Butter Pecan Ice Cream';

INSERT INTO "Ingredient" ("RecipeId", "Name", "Unit", "Amount")
SELECT r."Id", i."Name", '', 0
FROM "Recipe" r
CROSS JOIN (VALUES
  ('fresh ripe strawberries'), ('whole milk'), ('granulated sugar'), ('salt flakes'),
  ('heavy cream'), ('pure vanilla extract')
) AS i("Name")
WHERE r."Name" = 'Fresh Strawberry Ice Cream';

INSERT INTO "Ingredient" ("RecipeId", "Name", "Unit", "Amount")
SELECT r."Id", i."Name", '', 0
FROM "Recipe" r
CROSS JOIN (VALUES
  ('peanut butter'), ('granulated sugar'), ('whole milk'), ('heavy cream'),
  ('pure vanilla extract'), ('Reese''s Peanut Butter Cups')
) AS i("Name")
WHERE r."Name" = 'Peanut Butter Cup Ice Cream';

INSERT INTO "Ingredient" ("RecipeId", "Name", "Unit", "Amount")
SELECT r."Id", i."Name", '', 0
FROM "Recipe" r
CROSS JOIN (VALUES
  ('cocoa powder'), ('granulated sugar'), ('dark brown sugar'), ('salt flakes'),
  ('whole milk'), ('heavy cream'), ('pure vanilla extract'),
  ('mini marshmallows'), ('digestive biscuits'), ('chocolate chips')
) AS i("Name")
WHERE r."Name" = 'S''mores Ice Cream';

INSERT INTO "Ingredient" ("RecipeId", "Name", "Unit", "Amount")
SELECT r."Id", i."Name", '', 0
FROM "Recipe" r
CROSS JOIN (VALUES
  ('heavy cream'), ('whole milk'), ('pure vanilla extract'), ('salt flakes'),
  ('dark brown sugar'), ('water'), ('unsalted butter'), ('bananas'), ('dark rum'),
  ('fresh lemon juice'), ('bittersweet chocolate chips'), ('toasted walnuts')
) AS i("Name")
WHERE r."Name" = 'Banana Walnut Chip Ice Cream';

INSERT INTO "Ingredient" ("RecipeId", "Name", "Unit", "Amount")
SELECT r."Id", i."Name", '', 0
FROM "Recipe" r
CROSS JOIN (VALUES
  ('whole milk'), ('heavy cream'), ('granulated sugar'), ('salt flakes'),
  ('vanilla bean'), ('egg yolks'), ('pure vanilla extract')
) AS i("Name")
WHERE r."Name" = 'Vanilla Bean Ice Cream';

INSERT INTO "Ingredient" ("RecipeId", "Name", "Unit", "Amount")
SELECT r."Id", i."Name", '', 0
FROM "Recipe" r
CROSS JOIN (VALUES
  ('whole milk'), ('heavy cream'), ('granulated sugar'), ('salt flakes'),
  ('pure vanilla extract'), ('fresh mint leaves'), ('egg yolks'), ('chocolate sandwich cookies')
) AS i("Name")
WHERE r."Name" = 'Fresh Mint and Chocolate Cookies Ice Cream';

INSERT INTO "Ingredient" ("RecipeId", "Name", "Unit", "Amount")
SELECT r."Id", i."Name", '', 0
FROM "Recipe" r
CROSS JOIN (VALUES
  ('whole milk'), ('heavy cream'), ('granulated sugar'), ('pure vanilla extract'),
  ('ground cinnamon'), ('cayenne'), ('salt flakes'), ('egg yolks'), ('bittersweet chocolate')
) AS i("Name")
WHERE r."Name" = 'Mexican-Style Chocolate Ice Cream';

INSERT INTO "Ingredient" ("RecipeId", "Name", "Unit", "Amount")
SELECT r."Id", i."Name", '', 0
FROM "Recipe" r
CROSS JOIN (VALUES
  ('whole milk'), ('heavy cream'), ('granulated sugar'), ('salt flakes'),
  ('pure vanilla extract'), ('egg yolks'), ('water'), ('unsalted butter'), ('flaked sea salt')
) AS i("Name")
WHERE r."Name" = 'Salted Caramel Ice Cream';

INSERT INTO "Ingredient" ("RecipeId", "Name", "Unit", "Amount")
SELECT r."Id", i."Name", '', 0
FROM "Recipe" r
CROSS JOIN (VALUES
  ('water'), ('granulated sugar'), ('salt flakes'), ('cocoa powder'), ('pure vanilla extract')
) AS i("Name")
WHERE r."Name" = 'Dark Chocolate Sorbet';

INSERT INTO "Ingredient" ("RecipeId", "Name", "Unit", "Amount")
SELECT r."Id", i."Name", '', 0
FROM "Recipe" r
CROSS JOIN (VALUES
  ('water'), ('granulated sugar'), ('grapefruit zest'), ('salt flakes'),
  ('fresh grapefruit juice'), ('Prosecco')
) AS i("Name")
WHERE r."Name" = 'Grapefruit and Prosecco Sorbet';

INSERT INTO "Ingredient" ("RecipeId", "Name", "Unit", "Amount")
SELECT r."Id", i."Name", '', 0
FROM "Recipe" r
CROSS JOIN (VALUES
  ('dairy-free milk'), ('tapioca flour'), ('granulated sugar'), ('salt flakes'), ('pure vanilla extract')
) AS i("Name")
WHERE r."Name" = 'Dairy-Free Vanilla Ice Cream';

INSERT INTO "Ingredient" ("RecipeId", "Name", "Unit", "Amount")
SELECT r."Id", i."Name", '', 0
FROM "Recipe" r
CROSS JOIN (VALUES
  ('cocoa powder'), ('granulated sugar'), ('light brown sugar'), ('salt flakes'),
  ('coconut milk'), ('pure vanilla extract')
) AS i("Name")
WHERE r."Name" = 'Coconut-Chocolate Ice Cream';

INSERT INTO "Ingredient" ("RecipeId", "Name", "Unit", "Amount")
SELECT r."Id", i."Name", '', 0
FROM "Recipe" r
CROSS JOIN (VALUES
  ('water'), ('honey'), ('vanilla beans'), ('whole-milk Greek yogurt'),
  ('pure vanilla extract'), ('granulated sugar'), ('salt flakes')
) AS i("Name")
WHERE r."Name" = 'Rich Vanilla Frozen Yogurt';

INSERT INTO "Ingredient" ("RecipeId", "Name", "Unit", "Amount")
SELECT r."Id", i."Name", '', 0
FROM "Recipe" r
CROSS JOIN (VALUES
  ('whole-milk plain Greek yogurt'), ('granulated sugar'), ('salt flakes'),
  ('mango pieces'), ('fresh lime juice')
) AS i("Name")
WHERE r."Name" = 'Mango Frozen Yogurt';

INSERT INTO "Ingredient" ("RecipeId", "Name", "Unit", "Amount")
SELECT r."Id", i."Name", '', 0
FROM "Recipe" r
CROSS JOIN (VALUES
  ('whole-milk plain Greek yogurt'), ('milk'), ('granulated sugar'), ('cocoa powder'),
  ('salt flakes'), ('pure vanilla extract'), ('chocolate-covered pretzels')
) AS i("Name")
WHERE r."Name" = 'Chocolate-Pretzel Frozen Yogurt';

INSERT INTO "Ingredient" ("RecipeId", "Name", "Unit", "Amount")
SELECT r."Id", i."Name", '', 0
FROM "Recipe" r
CROSS JOIN (VALUES
  ('heavy cream'), ('whole milk'), ('granulated sugar'), ('cornstarch'), ('salt flakes'),
  ('chocolate-hazelnut spread'), ('hazelnuts')
) AS i("Name")
WHERE r."Name" = 'Chocolate-Hazelnut Gelato';

INSERT INTO "Ingredient" ("RecipeId", "Name", "Unit", "Amount")
SELECT r."Id", i."Name", '', 0
FROM "Recipe" r
CROSS JOIN (VALUES
  ('whole milk'), ('heavy cream'), ('brewed espresso'), ('granulated sugar'),
  ('cornstarch'), ('salt flakes'), ('liquid pectin')
) AS i("Name")
WHERE r."Name" = 'Espresso Gelato';

INSERT INTO "Ingredient" ("RecipeId", "Name", "Unit", "Amount")
SELECT r."Id", i."Name", '', 0
FROM "Recipe" r
CROSS JOIN (VALUES
  ('whole milk'), ('heavy cream'), ('pure vanilla extract'), ('salt flakes'),
  ('cornstarch'), ('egg yolks'), ('granulated sugar')
) AS i("Name")
WHERE r."Name" = 'Custard Gelato';
