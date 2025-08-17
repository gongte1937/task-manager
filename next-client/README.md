# Task Manager Frontend (Next.js)

This is the frontend part of the Task Manager application, built with Next.js 15 + TypeScript + TailwindCSS.

## Features

- ✅ Task list display (pending/completed grouping)
- ✅ Add new tasks (with form validation)
- ✅ Mark tasks as complete/incomplete
- ✅ Delete tasks
- ✅ Responsive design
- ✅ Loading states and error handling
- ✅ State management with RTK Query

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State Management**: Redux Toolkit + RTK Query
- **Form Management**: React Hook Form + Zod
- **Package Manager**: pnpm

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page
│   └── providers.tsx      # Global providers
├── components/             # React components
│   ├── TaskForm.tsx       # Task form
│   ├── TaskList.tsx       # Task list
│   ├── TaskItem.tsx       # Task item
│   ├── LoadingSpinner.tsx # Loading state
│   └── ErrorBoundary.tsx  # Error boundary
├── store/                  # Redux state management
│   ├── store.ts           # Redux store configuration
│   ├── hooks.ts           # Redux hooks
│   └── api/               # RTK Query API
│       └── taskApi.ts     # Task-related API
└── types/                  # TypeScript type definitions
    └── task.ts            # Task-related types
```

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

### TaskForm

- Collapsible task addition form
- Form validation with Zod
- Support for task title and description input

### TaskList

- Smart grouping display of pending and completed tasks
- Handles loading, error, and empty states
- Supports task list refresh

### TaskItem

- Individual task item display
- Support for marking complete/incomplete
- Shows creation and update times
- Supports delete operation

## State Management

Uses Redux Toolkit and RTK Query for state management:

- **taskApi**: Handles all task-related API calls
- **Automatic caching**: RTK Query automatically handles data caching and synchronization
- **Optimistic updates**: Provides smooth user experience

## Design

- Uses TailwindCSS for styling
- Responsive layout supporting mobile and desktop
- Modern UI design with hover effects and transition animations
- Clear state indicators (color coding, icons, etc.)

## Error Handling

- Global error boundary catches React errors
- API error handling with user-friendly error messages
- Network error retry mechanism

## Next Steps

According to the project plan, the following will be implemented:

1. User authentication system (login/registration)
2. Task filtering and search functionality
3. Task categories and tags
4. Internationalization support (i18n)
5. Real-time collaboration features
6. File upload support
