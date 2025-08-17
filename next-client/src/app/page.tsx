'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../features/auth/hooks/useAuth';
import TaskForm from '../features/tasks/components/TaskForm';
import TaskList from '../features/tasks/components/TaskList';

export default function HomePage() {
  const { isAuthenticated, logout, getUser } = useAuth();
  const router = useRouter();
  const user = getUser();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/auth');
    }
  }, [isAuthenticated, router]);

  const handleLogout = async () => {
    await logout();
    router.push('/auth');
  };

  if (!isAuthenticated()) {
    return null; // Or show loading state
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header with user info and logout */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Task Manager
            </h1>
            <p className="text-lg text-gray-600">
              Efficiently manage your daily tasks and boost productivity
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Welcome, {user?.name || 'User'}
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Task Form */}
        <TaskForm />

        {/* Task List */}
        <TaskList />
      </div>
    </div>
  );
}
