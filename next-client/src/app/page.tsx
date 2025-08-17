'use client';

import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Task Manager
          </h1>
          <p className="text-lg text-gray-600">
            Efficiently manage your daily tasks and boost productivity
          </p>
        </div>

        {/* Task Form */}
        <TaskForm />

        {/* Task List */}
        <TaskList />
      </div>
    </div>
  );
}
