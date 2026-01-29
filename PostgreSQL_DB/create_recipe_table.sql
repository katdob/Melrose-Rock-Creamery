-- Create Recipe table in MRC_DB
-- Run: bash scripts/create-recipe-table.sh (from project root)

CREATE TABLE IF NOT EXISTS "Recipe" (
    "Id"     SERIAL PRIMARY KEY,
    "Name"   VARCHAR(200) NOT NULL,
    "Author" VARCHAR(100) NOT NULL DEFAULT '',
    "CreatedDate" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
