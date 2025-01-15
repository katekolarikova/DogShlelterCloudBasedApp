import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Form from '../Form';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
    })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

test('renders form and submits successfully', async () => {
  render(<Form />);

  fireEvent.change(screen.getByLabelText(/Dog Name/i), { target: { value: 'Buddy' } });
  fireEvent.change(screen.getByLabelText(/Age/i), { target: { value: '3' } });
  fireEvent.change(screen.getByLabelText(/Breed/i), { target: { value: 'Golden Retriever' } });
  fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Friendly and playful' } });
  fireEvent.change(screen.getByLabelText(/Owner's Name/i), { target: { value: 'John Doe' } });
  fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '1234567890' } });
  fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'john@example.com' } });

  fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

  await waitFor(() => {
    expect(screen.getByText(/Thank you! We have received your submission/i)).toBeInTheDocument();
  });
});

test('handles submission error', async () => {
  global.fetch.mockImplementationOnce(() =>
    Promise.reject(new Error('Failed to submit the form'))
  );

  render(<Form />);

  fireEvent.change(screen.getByLabelText(/Dog Name/i), { target: { value: 'Buddy' } });
  fireEvent.change(screen.getByLabelText(/Age/i), { target: { value: '3' } });
  fireEvent.change(screen.getByLabelText(/Breed/i), { target: { value: 'Golden Retriever' } });
  fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Friendly and playful' } });
  fireEvent.change(screen.getByLabelText(/Owner's Name/i), { target: { value: 'John Doe' } });
  fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '1234567890' } });
  fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'john@example.com' } });

  fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

  await waitFor(() => {
    expect(screen.getByText(/Sorry, we failed to submit your form. Please try again later/i)).toBeInTheDocument();
  });
});
