import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/slices/auth.slice';
import profileReducer from '../store/slices/profile.slice';
import storyReducer from '../store/slices/story.slice';
import searchReducer from '../store/slices/search.slice';
import App from '../App';

jest.mock('../api/auth.api', () => ({
  authApi: {
    checkAuth: jest.fn().mockResolvedValue({}),
  },
}));

jest.mock('../api/profile.api', () => ({
  profileApi: {
    getProfile: jest.fn().mockResolvedValue({ data: [] }),
    getNotifications: jest.fn().mockResolvedValue({ data: [] }),
  },
}));

const createMockStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      profile: profileReducer,
      story: storyReducer,
      search: searchReducer,
    },
  });

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });
  });

  it('renders without crashing', () => {
    const store = createMockStore();

    expect(() => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      );
    }).not.toThrow();
  });

  it('renders App with Container', () => {
    const store = createMockStore();

    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    expect(container.querySelector('.App')).toBeInTheDocument();
  });
});
