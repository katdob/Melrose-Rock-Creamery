#!/usr/bin/env bash
# Query Recipe Ids from PostgreSQL. Run from project root.
# Usage: ./scripts/query-recipe-ids.sh

cd "$(dirname "$0")/.."
docker compose exec postgres-db psql -U mrc_user -d MRC_DB -t -c 'SELECT "Id" FROM "Recipe" ORDER BY "Id";'
