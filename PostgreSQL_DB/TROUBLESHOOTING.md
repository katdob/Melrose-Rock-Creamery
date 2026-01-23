# PostgreSQL Docker – Troubleshooting

## 1. Get the actual error

See why the container exited:

```bash
docker logs postgres-db
# or
docker compose logs postgres-db
```

Use the error message to confirm which case below applies.

---

## 2. Port 5432 already in use

**Symptom:** “port is already allocated” or “bind: address already in use”.

**Cause:** Another PostgreSQL (or any process) is using port 5432.

**Fix:**

```bash
# See what’s using 5432 (macOS/Linux)
lsof -i :5432

# Option A: Stop local PostgreSQL
# macOS (Homebrew): brew services stop postgresql
# Linux (systemd):  sudo systemctl stop postgresql

# Option B: Change the host port in docker-compose.yml
# ports: "5433:5432"  → use localhost:5433
```

---

## 3. Corrupted or incompatible volume data

**Symptom:** “database files are incompatible with server”, “could not locate a valid checkpoint record”, or initdb/startup errors after changing Postgres version or rerunning.

**Cause:** The `postgres_data` volume was created by another Postgres version or is corrupted.

**Fix:** Remove the volume and start clean (this deletes all DB data):

```bash
cd /Users/katdobbins/Desktop/learning/cursor_ai
docker compose down -v
docker volume rm cursor_ai_postgres_data 2>/dev/null || true
docker compose up -d postgres-db
```

---

## 4. Permission issues on the data directory

**Symptom:** “Operation not permitted” or “Permission denied” on `/var/lib/postgresql/data` (or similar).

**Cause:** The mounted volume has wrong ownership; Postgres runs as UID 999.

**Fix:** If you use a bind mount instead of a named volume, fix ownership:

```bash
sudo chown -R 999:999 /path/to/your/postgres/data
```

Your `docker-compose` uses a **named** volume (`postgres_data`), so this is less common unless you changed it.

---

## 5. Healthcheck / startup timing

**Symptom:** Container starts then exits, or is marked unhealthy; logs show Postgres starting but healthcheck failing.

**Cause:** Healthcheck runs before Postgres is ready.

**Fix:** Your compose already uses `start_period: 90s`. If it’s still flaky, you can increase it:

```yaml
healthcheck:
  start_period: 120s
  interval: 10s
  timeout: 5s
  retries: 5
```

---

## 6. Verify it’s running

```bash
docker compose ps
docker compose exec postgres-db psql -U myuser -d mydatabase -c "SELECT 1;"
```

---

## Quick reset (nuclear option)

Remove containers and the Postgres volume, then start again:

```bash
docker compose down -v
docker compose up -d postgres-db
docker compose logs -f postgres-db
```

If it still fails, share the output of `docker compose logs postgres-db`.
