'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateTaskMutation } from '../api/taskApi';
import { CreateTaskDto } from '@task-manager/shared-types';

const taskSchema = z.object({
  title: z
    .string()
    .min(1, 'Task title is required')
    .max(100, 'Task title cannot exceed 100 characters'),
  description: z
    .string()
    .max(500, 'Task description cannot exceed 500 characters')
    .optional(),
});

type TaskFormData = z.infer<typeof taskSchema>;

export default function TaskForm() {
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = async (data: CreateTaskDto) => {
    try {
      await createTask(data).unwrap();
      reset();
      setIsFormOpen(false);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  if (!isFormOpen) {
    return (
      <button
        onClick={() => setIsFormOpen(true)}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        + Add New Task
      </button>
    );
  }

  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Add New Task</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Task Title *
          </label>
          <input
            {...register('title')}
            type="text"
            id="title"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter task title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Task Description
          </label>
          <textarea
            {...register('description')}
            id="description"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter task description (optional)"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Creating...' : 'Create Task'}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsFormOpen(false);
              reset();
            }}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
