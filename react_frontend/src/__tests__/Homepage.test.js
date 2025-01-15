import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Homepage from '../Homepage';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([{ name: 'Buddy', breed: 'Golden Retriever', age: 3, description: 'Friendly and playful' }]),
    })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

test('renders homepage, fetches dog data and renders it', async () => {
  render(<Homepage />);

  expect(screen.getByRole('heading', { name: /Dogs in Our Shelter/i })).toBeInTheDocument();

  expect(await screen.findByText(/Buddy/i)).toBeInTheDocument();
  expect(screen.getByText(/Golden Retriever/i)).toBeInTheDocument();
  expect(screen.getByText(/3 years old/i)).toBeInTheDocument();
  expect(screen.getByText(/Friendly and playful/i)).toBeInTheDocument();
});

test('handles fetch error', async () => {
  global.fetch.mockImplementationOnce(() => Promise.reject(new Error('Failed to load data.')));

  render(<Homepage />);

  expect(await screen.findByText(/Failed to load data. Please try again later/i)).toBeInTheDocument();
});
