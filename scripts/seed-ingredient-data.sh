#!/usr/bin/env bash
# Seed Ingredient rows from seed_ingredient_data.sql (ice-cream-recipes.pdf, by recipe title).
# Run from project root.
# Usage: bash scripts/seed-ingredient-data.sh

set -e
cd "$(dirname "$0")/.."

echo "Seeding Ingredient data in MRC_DB..."
cat PostgreSQL_DB/seed_ingredient_data.sql | docker compose exec -T postgres-db psql -U mrc_user -d MRC_DB -f -
echo "Done."
