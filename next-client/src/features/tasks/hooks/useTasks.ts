import { useMemo } from 'react';
import { useGetTasksQuery } from '../api/taskApi';
import { Task } from '@task-manager/shared-types';

export interface TaskFilters {
  completed?: boolean;
  search?: string;
}

// Demo data for development
const demoTasks: Task[] = [
  {
    id: '1',
    title: 'Complete Frontend Development',
    description:
      'Implement the frontend interface and functionality for the task management app',
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Learn NestJS',
    description:
      'Master the core concepts and best practices of the NestJS framework',
    completed: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Deploy Project',
    description: 'Deploy the application to production environment',
    completed: false,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

export const useTasks = (filters?: TaskFilters) => {
  const { data: tasks, isLoading, error, refetch } = useGetTasksQuery();

  // In development environment, use demo data if no backend data
  const displayTasks = tasks || demoTasks;
  const isDemo = !tasks;

  const filteredTasks = useMemo(() => {
    if (!displayTasks) return [];

    let filtered = displayTasks;

    // Filter by completion status
    if (filters?.completed !== undefined) {
      filtered = filtered.filter(
        (task) => task.completed === filters.completed
      );
    }

    // Filter by search term
    if (filters?.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm) ||
          (task.description &&
            task.description.toLowerCase().includes(searchTerm))
      );
    }

    return filtered;
  }, [displayTasks, filters]);

  const pendingTasks = useMemo(
    () => filteredTasks.filter((task) => !task.completed),
    [filteredTasks]
  );

  const completedTasks = useMemo(
    () => filteredTasks.filter((task) => task.completed),
    [filteredTasks]
  );

  return {
    tasks: filteredTasks,
    pendingTasks,
    completedTasks,
    isLoading: isLoading && !isDemo,
    error: error && !isDemo,
    refetch,
    isDemo,
    totalCount: filteredTasks.length,
    pendingCount: pendingTasks.length,
    completedCount: completedTasks.length,
  };
};
