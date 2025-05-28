import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  BrowserRouter: ({ children }) => <>{children}</>,
  Routes: ({ children }) => <>{children}</>,
  Route: ({ element }) => element,
}));

// Mock the components
jest.mock('./components/LoginPage', () => () => <div>Login Page</div>);
jest.mock('./components/RegisterPage', () => () => <div>Register Page</div>);
jest.mock('./components/HomePage', () => () => <div>Home Page</div>);
jest.mock('./components/ProfilePage', () => () => <div>Profile Page</div>);
jest.mock('./components/PrivateRoute', () => ({ children }) => children);
jest.mock('./components/ProtectedLayout', () => ({ children }) => children);

test('renders without crashing', () => {
  render(<App />);
});
