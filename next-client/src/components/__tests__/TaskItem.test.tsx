import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { taskApi } from '../../store/api/taskApi';
import TaskItem from '../TaskItem';

// Create test store
const createTestStore = () => {
  return configureStore({
    reducer: {
      [taskApi.reducerPath]: taskApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(taskApi.middleware),
  });
};

// Mock task data for testing
const mockTask = {
  id: '1',
  title: 'Test Task',
  description: 'This is a test task',
  completed: false,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
};

describe('TaskItem', () => {
  it('should render task information correctly', () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <TaskItem task={mockTask} />
      </Provider>
    );

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('This is a test task')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('should display completed task styles', () => {
    const completedTask = { ...mockTask, completed: true };
    const store = createTestStore();

    render(
      <Provider store={store}>
        <TaskItem task={completedTask} />
      </Provider>
    );

    expect(screen.getByRole('checkbox')).toBeChecked();
  });
});
