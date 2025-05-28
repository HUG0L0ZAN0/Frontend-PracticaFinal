import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../HomePage';

// Mock the PrivateRoute component to allow rendering without authentication
jest.mock('../PrivateRoute', () => {
  return function MockPrivateRoute({ children }) {
    return children;
  };
});

// Mock the ProtectedLayout component
jest.mock('../ProtectedLayout', () => {
  return function MockProtectedLayout({ children }) {
    return children;
  };
});

describe('HomePage Component', () => {
  test('renders "Hola profe" text', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    
    const headingElement = screen.getByText('Hola profe');
    expect(headingElement).toBeInTheDocument();
  });
}); 