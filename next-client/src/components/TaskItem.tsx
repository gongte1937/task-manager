'use client';

import { Task } from '../types/task';
import {
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from '../store/api/taskApi';

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();

  const handleToggleComplete = async () => {
    try {
      await updateTask({
        id: task.id,
        task: { completed: !task.completed },
      }).unwrap();
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(task.id).unwrap();
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    }
  };

  return (
    <div
      className={`p-4 bg-white rounded-lg shadow-md border-l-4 ${
        task.completed ? 'border-green-500 bg-green-50' : 'border-blue-500'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={handleToggleComplete}
              disabled={isUpdating}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <h3
              className={`text-lg font-medium ${
                task.completed ? 'line-through text-gray-500' : 'text-gray-900'
              }`}
            >
              {task.title}
            </h3>
          </div>

          {task.description && (
            <p
              className={`mt-2 text-sm ${
                task.completed ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              {task.description}
            </p>
          )}

          <div className="mt-3 text-xs text-gray-400">
            Created: {new Date(task.createdAt).toLocaleString('en-US')}
            {task.updatedAt !== task.createdAt && (
              <span className="ml-3">
                Updated: {new Date(task.updatedAt).toLocaleString('en-US')}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="ml-4 p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-md transition-colors disabled:opacity-50"
          title="Delete task"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
