import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Form from '../Form';

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

test('displays validation errors for missing fields', async () => {
  render(<Form />);

  // submit the form without filled fields
  fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

  // check validation messages
  expect(await screen.findByText(/Dog Name is required/i)).toBeInTheDocument();
  expect(await screen.findByText(/Age is required/i)).toBeInTheDocument();
  expect(await screen.findByText(/Breed is required/i)).toBeInTheDocument();
  expect(await screen.findByText(/Description is required/i)).toBeInTheDocument();
  expect(await screen.findByText(/Owner's Name is required/i)).toBeInTheDocument();
  expect(await screen.findByText(/Phone Number is required/i)).toBeInTheDocument();
  expect(await screen.findByText(/Email Address is required/i)).toBeInTheDocument();
});

test('shows error message for invalid email format', async () => {
  render(<Form />);

  fireEvent.change(screen.getByLabelText(/Dog Name/i), { target: { value: 'Buddy' } });
  fireEvent.change(screen.getByLabelText(/Age/i), { target: { value: '3' } });
  fireEvent.change(screen.getByLabelText(/Breed/i), { target: { value: 'Golden Retriever' } });
  fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Friendly and playful' } });
  fireEvent.change(screen.getByLabelText(/Owner's Name/i), { target: { value: 'John Doe' } });
  fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '1234567890' } });
  fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'invalid-email' } });

  fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

  // check invalid e-mail message
  expect(await screen.findByText(/Email Address is not valid/i)).toBeInTheDocument();
});

test('shows error message for invalid phone number', async () => {
  render(<Form />);

  fireEvent.change(screen.getByLabelText(/Dog Name/i), { target: { value: 'Buddy' } });
  fireEvent.change(screen.getByLabelText(/Age/i), { target: { value: '3' } });
  fireEvent.change(screen.getByLabelText(/Breed/i), { target: { value: 'Golden Retriever' } });
  fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Friendly and playful' } });
  fireEvent.change(screen.getByLabelText(/Owner's Name/i), { target: { value: 'John Doe' } });
  fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: 'invalid-phone' } });
  fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'john@example.com' } });

  fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

  // check invalid phone number message
  expect(await screen.findByText(/Phone Number is not valid/i)).toBeInTheDocument();
});
