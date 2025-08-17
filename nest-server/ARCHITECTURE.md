# Task Manager Backend Architecture

## Overview

The Task Manager backend follows a **modular architecture** based on NestJS best practices, with clear separation of concerns and feature-based organization.

## Architecture Principles

### 1. **Modular Design**

- Each feature is organized into its own module
- Clear boundaries between different business domains
- Shared utilities and common patterns

### 2. **Dependency Injection**

- NestJS's built-in DI container
- Loose coupling between components
- Easy testing and mocking

### 3. **Layered Architecture**

- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic
- **Entities**: Define data models
- **DTOs**: Validate input data

## Directory Structure

```
src/
├── main.ts                    # Application entry point
├── app.module.ts             # Root module configuration
├── app.controller.ts         # Health check endpoints
├── app.service.ts            # Root service
├── config/                   # Configuration modules
│   ├── database.config.ts    # TypeORM configuration
│   └── jwt.config.ts         # JWT configuration
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

## Module Structure

Each feature module follows a consistent structure:

```
[feature]/
├── [feature].controller.ts   # HTTP endpoints
├── [feature].service.ts      # Business logic
├── [feature].module.ts       # Module configuration
├── [feature].entity.ts       # Database entity
└── dto/                      # Data Transfer Objects
    ├── create-[feature].dto.ts
    └── update-[feature].dto.ts
```

## Data Flow

```
HTTP Request → Controller → Service → Repository → Database
                ↓
HTTP Response ← Controller ← Service ← Repository ← Database
```

### Detailed Flow

1. **HTTP Request**: Client sends request to endpoint
2. **Guard**: Authentication/authorization check
3. **Controller**: Validates input using DTOs
4. **Service**: Processes business logic
5. **Repository**: Handles database operations
6. **Entity**: Maps to database table
7. **Response**: Returns data to client

## Authentication Flow

```
1. Registration: POST /auth/register
   User → Controller → Service → Repository → Database

2. Login: POST /auth/login
   User → Controller → Service → JWT Token

3. Protected Route: GET /tasks
   User + JWT → Guard → Controller → Service → Repository
```

## Database Design

### Entity Relationships

```typescript
User (1) ←→ (N) Task
```

### User Entity

```typescript
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  password: string; // Hashed with bcrypt

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
```

### Task Entity

```typescript
@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: false })
  completed: boolean;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
```

## Security Features

### 1. **Password Security**

- Bcrypt hashing with salt rounds
- Automatic password hashing on save
- Password validation method

### 2. **JWT Authentication**

- Secure token-based authentication
- Configurable expiration time
- Token validation on protected routes

### 3. **Input Validation**

- Class-validator decorators
- Automatic validation pipe
- Whitelist and forbid non-whitelisted properties

### 4. **CORS Protection**

- Configurable CORS settings
- Frontend domain whitelist
- Credentials support

## Error Handling

### Global Exception Filter

```typescript
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    // Standardized error response format
    // Proper HTTP status codes
    // Error logging
  }
}
```

### Error Response Format

```json
{
  "statusCode": 400,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/tasks",
  "message": "Validation failed"
}
```

## Configuration Management

### Environment-Based Configuration

```typescript
// config/database.config.ts
export const getDatabaseConfig = (configService: ConfigService) => ({
  type: 'postgres',
  host: configService.get('DB_HOST', 'localhost'),
  port: configService.get('DB_PORT', 5432),
  // ... other config
});
```

### Configuration Sources

1. Environment variables
2. `.env` files
3. Default values
4. Production overrides

## API Documentation

### Swagger Integration

- Automatic API documentation
- Interactive testing interface
- Bearer token authentication
- Request/response examples

### Documentation Features

- Endpoint descriptions
- Request/response schemas
- Authentication requirements
- Example requests

## Testing Strategy

### Unit Tests

- Service layer testing
- Controller testing
- Repository testing
- Mock external dependencies

### E2E Tests

- Full API endpoint testing
- Database integration
- Authentication flow testing

### Test Structure

```
[feature]/
├── [feature].service.spec.ts
├── [feature].controller.spec.ts
└── [feature].e2e-spec.ts
```

## Performance Considerations

### 1. **Database Optimization**

- Proper indexing
- Query optimization
- Connection pooling
- Migration strategy

### 2. **Caching Strategy**

- Redis integration (future)
- Response caching
- Database query caching

### 3. **Rate Limiting**

- API rate limiting
- User-based limits
- IP-based protection

## Deployment Architecture

### Development

- Hot reload with webpack
- TypeORM synchronize
- Detailed logging
- CORS for localhost

### Production

- Compiled JavaScript
- Database migrations
- Environment variables
- Process management
- Health checks

## Monitoring and Logging

### Application Monitoring

- Health check endpoints
- Performance metrics
- Error tracking
- Request logging

### Database Monitoring

- Query performance
- Connection status
- Migration status
- Backup monitoring

## Future Enhancements

### 1. **Advanced Authentication**

- Email verification
- Password reset
- Social login
- Multi-factor authentication

### 2. **Enhanced Features**

- Task categories and tags
- Task priorities
- Due dates and reminders
- Task sharing

### 3. **Performance Optimizations**

- Redis caching
- Database indexing
- API pagination
- File uploads

### 4. **Security Enhancements**

- Rate limiting
- Request validation
- Audit logging
- Security headers

## Best Practices

### 1. **Code Organization**

- Feature-based modules
- Consistent naming conventions
- Clear separation of concerns
- DRY principle

### 2. **Error Handling**

- Global exception filter
- Proper HTTP status codes
- Meaningful error messages
- Error logging

### 3. **Security**

- Input validation
- Authentication guards
- Password hashing
- CORS configuration

### 4. **Testing**

- Unit tests for services
- Integration tests for controllers
- E2E tests for workflows
- Mock external dependencies

### 5. **Documentation**

- API documentation with Swagger
- Code comments
- README files
- Architecture documentation
