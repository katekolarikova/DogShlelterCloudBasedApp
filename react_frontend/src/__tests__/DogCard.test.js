import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DogCard from '../DogCard';

test('renders dog card with correct information', () => {
  const dog = {
    name: 'Buddy',
    breed: 'Golden Retriever',
    age: 3,
    description: 'Friendly and playful',
  };

  render(<DogCard dog={dog} />);

  expect(screen.getByText(/Buddy/i)).toBeInTheDocument();
  expect(screen.getByText(/Golden Retriever/i)).toBeInTheDocument();
  expect(screen.getByText(/3/i)).toBeInTheDocument();
  expect(screen.getByText(/Friendly and playful/i)).toBeInTheDocument();
});
