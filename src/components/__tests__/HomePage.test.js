import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '../HomePage';

describe('HomePage Component', () => {
  test('renders "Hola profe" text', () => {
    render(<HomePage />);
    const headingElement = screen.getByText('Hola profe');
    expect(headingElement).toBeInTheDocument();
  });
}); 