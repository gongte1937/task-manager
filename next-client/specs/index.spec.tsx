import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import Page from '../src/app/page';
import { store } from '../src/store';

describe('Page', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={store}>
        <Page />
      </Provider>
    );
    expect(baseElement).toBeTruthy();
  });
});
