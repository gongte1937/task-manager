import { configureStore } from '@reduxjs/toolkit';
import { taskApi } from '../features/tasks/api/taskApi';
import { authApi } from '../features/auth/api/authApi';

export const store = configureStore({
  reducer: {
    [taskApi.reducerPath]: taskApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(taskApi.middleware, authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
