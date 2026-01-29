#!/usr/bin/env bash
# Seed Recipe rows from seed_recipe_data.sql (same as SeedDB.cs). Run from project root.
# Usage: bash scripts/seed-recipe-data.sh

set -e
cd "$(dirname "$0")/.."

echo "Seeding Recipe data in MRC_DB..."
cat PostgreSQL_DB/seed_recipe_data.sql | docker compose exec -T postgres-db psql -U mrc_user -d MRC_DB -f -
echo "Done."
