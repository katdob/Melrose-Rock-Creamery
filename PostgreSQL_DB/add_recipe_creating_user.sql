-- Adds optional creator user id to Recipe (matches MRC_API.Models.Recipe.CreatingUser).
-- Safe to run multiple times.

ALTER TABLE public."Recipe"
    ADD COLUMN IF NOT EXISTS "CreatingUser" integer NULL;
