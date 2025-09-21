# AI Agent Summary for FastAPI Project

This short guide summarizes the key points from `GEMINI.md` so an AI agent can quickly understand the project and start contributing.

## Project at-a-glance
- Full-stack FastAPI project with admin and public frontends.
- Backend: FastAPI + SQLModel, PostgreSQL, Alembic migrations, JWT auth.
- Admin frontend: React + TypeScript + Chakra UI (in `frontend/`).
- Public frontend: React + TypeScript + Tailwind (in `public-frontend/`).
- Orchestrated with Docker Compose and Traefik for local/production setups.

## Architecture & Key Files
- Backend entry: `backend/app/main.py`.
- Models: `backend/app/models.py`.
- CRUD helpers: `backend/app/crud.py`.
- Core config & DB helpers: `backend/app/core/` (e.g., `config.py`, `db.py`).
- Frontends: `frontend/` (admin) and `public-frontend/` (public).
- Docker: `docker-compose.yml` and `docker-compose.override.yml` for development.

## Key Features
- JWT-based authentication with role-based access (user vs superuser).
- Password hashing (bcrypt) and token refresh flow.
- Item model for demo data and standard CRUD endpoints.
- Auto-generated OpenAPI docs by FastAPI.

## Common API Endpoints
- POST `/api/v1/login/access-token` — authenticate and receive tokens.
- POST `/api/v1/register` — create a new user.
- GET `/api/v1/users/me` — current user info.
- CRUD `/api/v1/items/` — manage demo items.
- GET `/api/v1/utils/health-check/` — health check.

## Development Workflow (quick)
- Start local stack: `docker compose up -d`.
- Backend tests: `docker compose exec backend pytest`.
- Admin frontend dev: `cd frontend && npm run dev`.
- Public frontend dev: `cd public-frontend && npm run dev`.
- Alembic migrations: `cd backend && alembic revision --autogenerate -m "desc" && alembic upgrade head`.

## Security & Best Practices
- Validate JWTs and check permissions for sensitive operations.
- Use Pydantic for validation and sanitize inputs.
- Store secrets in environment variables / `.env` files (do not commit).
- Use parameterized DB queries and follow migration best practices.

## Testing & CI hints
- Backend: unit + integration tests with fixtures in `tests/`.
- Frontend: unit and E2E tests under `frontend/tests` and `public-frontend/tests`.

## Quick Troubleshooting
- Port conflicts: use `lsof -i :PORT` and adjust `docker-compose.override.yml`.
- DB issues: check PostgreSQL container and connection strings.
- Frontend build errors: reinstall `node_modules`, check TS errors.

## Useful Commands
- `docker compose up -d`
- `docker compose logs -f [service]`
- `docker compose exec backend alembic upgrade head`
- `docker compose exec backend pytest`

## Default dev credentials (change in production)
- Admin: admin@example.com / changethis
- User: user@example.com / password123

## Where to start as an AI contributor
- Run the dev stack and open `backend/app/main.py` to explore routes.
- Review `backend/app/crud.py` and `backend/app/models.py` for data shapes.
- Check tests under `backend/tests/` and `frontend/tests/` to see expected behavior.
- When adding endpoints, update Pydantic schemas, add CRUD functions, create routes, and add tests.

---
Generated from `GEMINI.md` to help AI agents onboard quickly.
