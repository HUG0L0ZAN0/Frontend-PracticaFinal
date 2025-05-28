import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

test('muestra el saludo Hola profe', () => {
  render(<HomePage />);
  expect(screen.getByText(/hola profe/i)).toBeInTheDocument();
});
