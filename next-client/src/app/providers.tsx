'use client';

import { Provider } from 'react-redux';
import { store } from '../store';
import { ErrorBoundary } from '../shared/components/ErrorBoundary';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <Provider store={store}>{children}</Provider>
    </ErrorBoundary>
  );
}
