import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

test('renders navigation links and checks default page', () => {
  render(<App />);

  // check if nav links rendered correctly
  expect(screen.getByText(/Dog Shelter/i)).toBeInTheDocument();
  expect(screen.getByText(/Give for adoption/i)).toBeInTheDocument();

  // check if the homepage is rendered by default
  expect(screen.getByRole('heading', { name: /Dogs in Our Shelter/i })).toBeInTheDocument();
});
