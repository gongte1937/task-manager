# Task Manager Backend (NestJS)

This is the backend part of the Task Manager application, built with NestJS + TypeScript + TypeORM + PostgreSQL.

## Features

- ✅ User authentication (JWT)
- ✅ User registration and login
- ✅ Task CRUD operations
- ✅ Role-based access control
- ✅ API documentation with Swagger
- ✅ Database integration with TypeORM
- ✅ Input validation with class-validator
- ✅ Error handling and logging
- ✅ CORS configuration
- ✅ Environment-based configuration

## Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT with Passport
- **Validation**: class-validator + class-transformer
- **Documentation**: Swagger/OpenAPI
- **Package Manager**: pnpm

## Project Architecture

```
src/
├── main.ts                    # Application entry point
├── app.module.ts             # Root module
├── app.controller.ts         # Root controller (health check)
├── app.service.ts            # Root service
├── config/                   # Configuration modules
│   ├── database.config.ts    # Database configuration
│   └── jwt.config.ts         # JWT configuration
├── database/                 # Database setup (future)
├── common/                   # Shared utilities
│   ├── decorators/           # Custom decorators
│   │   └── current-user.decorator.ts
│   ├── filters/              # Exception filters
│   │   └── http-exception.filter.ts
│   ├── guards/               # Authentication guards
│   ├── interceptors/         # Response interceptors
│   └── middleware/           # Custom middleware
├── auth/                     # Authentication module
│   ├── auth.controller.ts    # Auth endpoints
│   ├── auth.service.ts       # Auth business logic
│   ├── auth.module.ts        # Auth module
│   ├── jwt.strategy.ts       # JWT strategy
│   ├── local.strategy.ts     # Local strategy
│   ├── guards/               # Auth guards
│   │   ├── jwt-auth.guard.ts
│   │   └── local-auth.guard.ts
│   └── dto/                  # Auth DTOs
│       ├── login.dto.ts
│       └── register.dto.ts
├── users/                    # Users module
│   ├── users.controller.ts   # User endpoints
│   ├── users.service.ts      # User business logic
│   ├── users.module.ts       # User module
│   ├── user.entity.ts        # User entity
│   └── dto/                  # User DTOs
│       ├── create-user.dto.ts
│       └── update-user.dto.ts
└── tasks/                    # Tasks module
    ├── tasks.controller.ts   # Task endpoints
    ├── tasks.service.ts      # Task business logic
    ├── tasks.module.ts       # Task module
    ├── task.entity.ts        # Task entity
    └── dto/                  # Task DTOs
        ├── create-task.dto.ts
        └── update-task.dto.ts
```

## API Endpoints

### Authentication

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user

### Users

- `GET /users/profile` - Get current user profile
- `GET /users/:id` - Get user by ID
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Tasks

- `GET /tasks` - Get all tasks for current user
- `POST /tasks` - Create a new task
- `GET /tasks/:id` - Get task by ID
- `PATCH /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

### Health Check

- `GET /` - Application health check
- `GET /health` - Detailed health status

## Environment Variables

Create a `.env` file in the root directory:

```env
# Application
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:4200

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=task_manager

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=1d
```

## Database Setup

### PostgreSQL Installation

1. Install PostgreSQL on your system
2. Create a database named `task_manager`
3. Update the `.env` file with your database credentials

### Database Migration

The application uses TypeORM's `synchronize` option in development mode, which automatically creates tables based on entities.

For production, you should use migrations:

```bash
# Generate migration
pnpm typeorm migration:generate -n InitialMigration

# Run migrations
pnpm typeorm migration:run
```

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm start:dev

# Build for production
pnpm build

# Start production server
pnpm start:prod

# Run tests
pnpm test

# Run e2e tests
pnpm test:e2e

# Lint code
pnpm lint
```

## API Documentation

Once the server is running, you can access the Swagger documentation at:

```
http://localhost:3000/api/docs
```

## Authentication Flow

1. **Registration**: User registers with email, username, and password
2. **Login**: User logs in with email and password
3. **JWT Token**: Server returns a JWT token
4. **Protected Routes**: Include JWT token in Authorization header
5. **Token Validation**: Server validates token on each request

### Example Usage

```bash
# Register a new user
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "username": "testuser",
    "password": "password123"
  }'

# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'

# Create a task (with JWT token)
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Complete project",
    "description": "Finish the task manager project"
  }'
```

## Security Features

- **Password Hashing**: Passwords are hashed using bcrypt
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: All inputs are validated using class-validator
- **CORS Protection**: Configured CORS for frontend integration
- **Error Handling**: Comprehensive error handling and logging

## Database Schema

### Users Table

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR UNIQUE NOT NULL,
  username VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Tasks Table

```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT false,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Testing

The application includes unit tests and e2e tests:

```bash
# Run unit tests
pnpm test

# Run e2e tests
pnpm test:e2e

# Test coverage
pnpm test:cov
```

## Deployment

### Production Considerations

1. **Environment Variables**: Set proper environment variables
2. **Database**: Use production database with proper credentials
3. **JWT Secret**: Use a strong, unique JWT secret
4. **CORS**: Configure CORS for your production domain
5. **Logging**: Implement proper logging
6. **Security**: Enable HTTPS in production

### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]
```

## Next Steps

According to the project plan, the following will be implemented:

1. **Enhanced Authentication**

   - Email verification
   - Password reset functionality
   - Social login integration

2. **Advanced Task Features**

   - Task categories and tags
   - Task priorities
   - Due dates and reminders
   - Task sharing and collaboration

3. **Performance Optimizations**

   - Database indexing
   - Caching with Redis
   - Rate limiting
   - API pagination

4. **Monitoring and Logging**
   - Application monitoring
   - Error tracking
   - Performance metrics
   - Audit logging
