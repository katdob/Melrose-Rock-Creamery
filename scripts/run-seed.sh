#!/usr/bin/env bash
# Run SeedDB to create Recipe rows in the Recipe table (MRC_DB).
# Requires: postgres-db running, MRC_DB + Recipe table exist.
# Usage: bash scripts/run-seed.sh

set -e
cd "$(dirname "$0")/.."

echo "Running seed (SeedDB.Seed)..."
cd CSharp_dotNET_backend/MRC_API
dotnet run -- seed
