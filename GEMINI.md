# FastAPI Project - AI Agent Development Guide

## Overview
This document provides comprehensive guidance for AI agents working on this FastAPI full-stack project. The project follows modern best practices and includes both admin and public-facing interfaces.

## Project Architecture

### Backend (FastAPI)
- **Location**: `backend/`
- **Framework**: FastAPI with SQLModel ORM
- **Database**: PostgreSQL with Alembic migrations
- **Authentication**: JWT with password hashing
- **API Documentation**: Auto-generated OpenAPI/Swagger docs

### Frontend Applications
1. **Admin Dashboard** (`frontend/`): React + TypeScript + Chakra UI
   - Port: 5173 (development), 80 (production)
   - Authentication required
   - User management, items management, settings
   - Superuser admin panel

2. **Public Frontend** (`public-frontend/`): React + TypeScript + Tailwind CSS
   - Port: 3000 (development), 80 (production)
   - Public landing page, login, registration
   - User dashboard with role-based access
   - API demo and documentation

### Infrastructure
- **Docker Compose**: Multi-container setup
- **Traefik**: Reverse proxy with automatic HTTPS
- **Database Admin**: Adminer interface
- **Email Testing**: Mailcatcher for development

## Development Principles

### 1. Follow FastAPI Best Practices
- Use async functions for I/O operations
- Prefer Pydantic for data validation
- Implement proper dependency injection
- Use SQLModel for database operations
- Follow RESTful API design

### 2. Code Organization
```
backend/
├── app/
│   ├── api/routes/          # API endpoints
│   ├── core/               # Core functionality (config, db, security)
│   ├── models.py           # Database models
│   ├── crud.py            # Database operations
│   └── main.py            # FastAPI application
├── tests/                  # Test files
└── alembic/               # Database migrations
```

### 3. Frontend Patterns
- Use TypeScript for type safety
- Implement proper error handling
- Follow React best practices (hooks, functional components)
- Use proper state management (React Query for API calls)
- Implement responsive design

## Key Features to Understand

### Authentication System
- JWT-based authentication
- Role-based access control (user vs superuser)
- Password hashing with bcrypt
- Token refresh mechanism

### Database Models
- User model with roles and permissions
- Item model for demo data
- Proper relationships and constraints
- Alembic migrations for schema changes

### API Endpoints
- `/api/v1/login/access-token` - User authentication
- `/api/v1/register` - User registration
- `/api/v1/users/me` - Current user info
- `/api/v1/items/` - Items management
- `/api/v1/utils/health-check/` - Health check

## Development Workflow

### 1. Setting Up Development Environment
```bash
# Start all services
docker compose up -d

# Check service status
docker compose ps

# View logs
docker compose logs [service-name]
```

### 2. Making Backend Changes
1. Modify code in `backend/app/`
2. Create database migrations if needed:
   ```bash
   cd backend
   alembic revision --autogenerate -m "description"
   alembic upgrade head
   ```
3. Test API endpoints
4. Update tests if needed

### 3. Making Frontend Changes
1. Modify code in respective frontend directory
2. For admin frontend: `cd frontend && npm run dev`
3. For public frontend: `cd public-frontend && npm run dev`
4. Test functionality and responsive design

### 4. Database Changes
- Always use Alembic migrations
- Test migrations on development data
- Ensure migrations are reversible
- Update models and schemas together

## Common Tasks

### Adding New API Endpoints
1. Define Pydantic schemas in appropriate files
2. Add CRUD operations in `crud.py`
3. Create route handlers in `api/routes/`
4. Add proper error handling and validation
5. Update API documentation
6. Write tests

### Adding New Frontend Pages
1. Create component in appropriate directory
2. Add route to routing configuration
3. Implement proper TypeScript types
4. Add authentication checks if needed
5. Test responsive design
6. Add proper error handling

### Database Schema Changes
1. Modify SQLModel models
2. Generate migration: `alembic revision --autogenerate -m "description"`
3. Review generated migration
4. Apply migration: `alembic upgrade head`
5. Update related code and tests

## Security Considerations

### Authentication
- Always validate JWT tokens
- Check user permissions for sensitive operations
- Use proper password hashing
- Implement rate limiting for auth endpoints

### Data Validation
- Use Pydantic for all input validation
- Sanitize user inputs
- Validate file uploads
- Implement proper CORS settings

### Database Security
- Use parameterized queries
- Implement proper access controls
- Regular security updates
- Backup and recovery procedures

## Testing Strategy

### Backend Testing
- Unit tests for individual functions
- Integration tests for API endpoints
- Database tests with test fixtures
- Authentication and authorization tests

### Frontend Testing
- Component unit tests
- Integration tests for user flows
- API integration tests
- Responsive design tests

## Deployment Considerations

### Environment Variables
- Use `.env` files for configuration
- Never commit sensitive data
- Use different configs for dev/staging/prod
- Document all required environment variables

### Docker Configuration
- Multi-stage builds for optimization
- Proper health checks
- Resource limits and constraints
- Security scanning

### Database Management
- Regular backups
- Migration rollback procedures
- Performance monitoring
- Connection pooling

## Common Issues and Solutions

### Port Conflicts
- Check what's using ports: `lsof -i :PORT`
- Update docker-compose.override.yml
- Use different ports for development

### Database Connection Issues
- Check PostgreSQL container status
- Verify connection strings
- Check network connectivity
- Review migration status

### Frontend Build Issues
- Clear node_modules and reinstall
- Check TypeScript errors
- Verify environment variables
- Update dependencies if needed

### Authentication Problems
- Check JWT secret configuration
- Verify token expiration
- Review CORS settings
- Check user permissions

## Performance Optimization

### Backend
- Use async/await properly
- Implement database indexing
- Use connection pooling
- Cache frequently accessed data
- Monitor query performance

### Frontend
- Implement code splitting
- Use lazy loading for routes
- Optimize images and assets
- Minimize bundle size
- Implement proper caching

## Monitoring and Logging

### Application Logs
- Use structured logging
- Log important events
- Include request IDs
- Monitor error rates

### Database Monitoring
- Query performance
- Connection pool usage
- Slow query identification
- Index usage analysis

### Frontend Monitoring
- Error tracking
- Performance metrics
- User interaction analytics
- API response times

## Best Practices Summary

1. **Code Quality**
   - Follow PEP 8 for Python
   - Use TypeScript for frontend
   - Write comprehensive tests
   - Document complex logic

2. **Security**
   - Validate all inputs
   - Use proper authentication
   - Implement authorization checks
   - Keep dependencies updated

3. **Performance**
   - Use async operations
   - Optimize database queries
   - Implement caching
   - Monitor resource usage

4. **Maintainability**
   - Follow consistent patterns
   - Use proper abstractions
   - Write clear documentation
   - Regular code reviews

## Quick Reference

### Useful Commands
```bash
# Start development environment
docker compose up -d

# View logs
docker compose logs -f [service]

# Run tests
docker compose exec backend pytest
cd frontend && npm test
cd public-frontend && npm test

# Database operations
docker compose exec backend alembic upgrade head
docker compose exec backend alembic revision --autogenerate -m "description"

# Access services
# API: http://localhost:8000
# Admin: http://localhost:5173
# Public: http://localhost:3000
# DB Admin: http://localhost:8081
# Email: http://localhost:1080
```

### Default Credentials
- Admin: admin@example.com / changethis
- User: user@example.com / password123

### Key Files
- `backend/app/main.py` - FastAPI application
- `backend/app/models.py` - Database models
- `frontend/src/App.tsx` - Admin frontend
- `public-frontend/src/App.tsx` - Public frontend
- `docker-compose.yml` - Production configuration
- `docker-compose.override.yml` - Development configuration

This guide should help AI agents understand the project structure, follow best practices, and contribute effectively to the codebase.