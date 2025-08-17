# Task Manager Frontend (Next.js)

This is the frontend part of the Task Manager application, built with Next.js 15 + TypeScript + TailwindCSS using a feature-based architecture.

## Features

- ✅ Task list display (pending/completed grouping)
- ✅ Add new tasks (with form validation)
- ✅ Mark tasks as complete/incomplete
- ✅ Delete tasks
- ✅ Responsive design
- ✅ Loading states and error handling
- ✅ State management with RTK Query
- ✅ Feature-based architecture
- ✅ Shared utilities and components

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State Management**: Redux Toolkit + RTK Query
- **Form Management**: React Hook Form + Zod
- **Package Manager**: pnpm

## Project Architecture

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page
│   └── providers.tsx      # Global providers
├── features/               # Feature-based modules
│   ├── tasks/             # Task management feature
│   │   ├── components/    # Task-specific components
│   │   │   ├── TaskForm.tsx
│   │   │   ├── TaskItem.tsx
│   │   │   └── TaskList.tsx
│   │   ├── api/           # RTK Query API slice
│   │   │   └── taskApi.ts
│   │   ├── hooks/         # Custom hooks
│   │   │   └── useTasks.ts
│   │   └── types/         # Feature-specific types
│   │       └── index.ts
│   └── auth/              # Authentication feature (future)
│       ├── components/
│       ├── api/
│       ├── hooks/
│       └── types/
├── shared/                 # Shared utilities and components
│   ├── components/        # Reusable UI components
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorBoundary.tsx
│   ├── hooks/             # Shared hooks
│   │   └── index.ts
│   ├── utils/             # Utility functions
│   │   └── index.ts
│   └── types/             # Shared type definitions
│       └── index.ts
├── store/                  # Redux store configuration
│   └── index.ts
└── locales/               # Internationalization
    └── en.json
```

## Feature-Based Architecture Benefits

### 1. **Modularity**

- Each feature is self-contained with its own components, API, hooks, and types
- Easy to add, remove, or modify features without affecting others
- Clear separation of concerns

### 2. **Scalability**

- New features can be added without touching existing code
- Shared utilities and components promote code reuse
- Consistent patterns across features

### 3. **Maintainability**

- Related code is co-located
- Easy to find and understand feature-specific logic
- Reduced coupling between different parts of the application

### 4. **Team Collaboration**

- Multiple developers can work on different features simultaneously
- Clear ownership boundaries
- Reduced merge conflicts

## Development Commands

```bash
# Start development server
pnpm start:frontend

# Build for production
pnpm nx build next-client

# Run tests
pnpm nx test next-client

# Code linting
pnpm nx lint next-client
```

## Environment Configuration

The frontend application connects to `http://localhost:3000/api` as the backend API address by default. Make sure the backend service is running.

## Component Overview

### Task Feature Components

#### TaskForm

- Collapsible task addition form
- Form validation with Zod
- Support for task title and description input

#### TaskList

- Smart grouping display of pending and completed tasks
- Handles loading, error, and empty states
- Supports task list refresh
- Uses custom `useTasks` hook for data management

#### TaskItem

- Individual task item display
- Support for marking complete/incomplete
- Shows creation and update times
- Supports delete operation

### Shared Components

#### LoadingSpinner

- Reusable loading indicator
- Configurable sizes (sm, md, lg)
- Consistent styling across the app

#### ErrorBoundary

- Global error boundary for React errors
- User-friendly error display
- Refresh functionality

## State Management

Uses Redux Toolkit and RTK Query for state management:

- **Feature-based API slices**: Each feature has its own API slice
- **Automatic caching**: RTK Query automatically handles data caching and synchronization
- **Optimistic updates**: Provides smooth user experience
- **Type safety**: Full TypeScript support throughout

## Custom Hooks

### useTasks

- Centralized task data management
- Built-in filtering and sorting
- Demo data support for development
- Loading and error state handling

## Utility Functions

### Date Formatting

- `formatDate()`: Format dates in a consistent way
- `formatDateTime()`: Format date and time
- `formatRelativeTime()`: Human-readable relative time

### String Utilities

- `truncateText()`: Truncate long text with ellipsis
- `capitalizeFirst()`: Capitalize first letter

### Validation

- `isValidEmail()`: Email validation

### Local Storage

- `storage.get()`: Safe localStorage retrieval
- `storage.set()`: Safe localStorage storage
- `storage.remove()`: Safe localStorage removal

## Internationalization

- Language packs in `locales/` directory
- Support for multiple languages
- Structured translation keys
- Easy to extend for new languages

## Error Handling

- Global error boundary catches React errors
- API error handling with user-friendly error messages
- Network error retry mechanism
- Graceful fallbacks for missing data

## Next Steps

According to the project plan, the following will be implemented:

1. **Authentication Feature**

   - Login/registration components
   - Auth API slice
   - Protected routes
   - User state management

2. **Enhanced Task Features**

   - Task filtering and search
   - Task categories and tags
   - Task priorities
   - Due dates and reminders

3. **Advanced Features**

   - Real-time collaboration
   - File upload support
   - Task templates
   - Bulk operations

4. **Performance Optimizations**
   - Code splitting by feature
   - Lazy loading
   - Virtual scrolling for large lists
   - Service worker for offline support
