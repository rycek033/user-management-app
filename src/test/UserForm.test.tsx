import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { UserForm } from '../pages/UserForm';
import { NotificationProvider } from '../context/NotificationContext';
import { describe, it, expect, afterEach } from 'vitest';

describe('UserForm Validation', () => {
  afterEach(() => {
    cleanup()
  });

  it('shows validation errors when submitting empty form', async () => {
    render(
      <BrowserRouter>
        <NotificationProvider>
          <UserForm />
        </NotificationProvider>
      </BrowserRouter>
    );

    const submitButton = screen.getByText('Save User');
    fireEvent.click(submitButton);

    expect(await screen.findByText('Name is required')).toBeInTheDocument();
    expect(await screen.findByText('Email is required')).toBeInTheDocument();
    expect(await screen.findByText('City is required')).toBeInTheDocument();
  });

  it('shows email format error for invalid email', async () => {
    const { container } = render(
      <BrowserRouter>
        <NotificationProvider>
          <UserForm />
        </NotificationProvider>
      </BrowserRouter>
    );

    const emailInput = container.querySelector('input[name="email"]') as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: 'zly-format-maila' } })

    const submitButton = screen.getByText('Save User')
    fireEvent.click(submitButton);

    expect(await screen.findByText('Email format is invalid')).toBeInTheDocument()
  })
})