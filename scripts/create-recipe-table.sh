#!/usr/bin/env bash
# Create Recipe table in MRC_DB. Run from project root.
# Usage: bash scripts/create-recipe-table.sh

set -e
cd "$(dirname "$0")/.."

echo "Creating Recipe table in MRC_DB..."
cat PostgreSQL_DB/create_recipe_table.sql | docker compose exec -T postgres-db psql -U mrc_user -d MRC_DB -f -
echo "Done."
