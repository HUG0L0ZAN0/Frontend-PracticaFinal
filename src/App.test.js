import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Mock the components that use react-router
jest.mock('./components/LoginPage', () => () => <div>Login Page</div>);
jest.mock('./components/RegisterPage', () => () => <div>Register Page</div>);
jest.mock('./components/HomePage', () => () => <div>Home Page</div>);
jest.mock('./components/ProfilePage', () => () => <div>Profile Page</div>);
jest.mock('./components/PrivateRoute', () => ({ children }) => children);
jest.mock('./components/ProtectedLayout', () => ({ children }) => children);

test('renders without crashing', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
});
