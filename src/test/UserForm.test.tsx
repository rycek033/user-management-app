import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { UserForm } from '../pages/UserForm';
import { describe, it, expect, afterEach } from 'vitest';

describe('UserForm Validation', () => {
  afterEach(() => {
    cleanup();
  });

  it('shows validation errors when submitting empty form', () => {
    render(
      <BrowserRouter>
        <UserForm />
      </BrowserRouter>
    );

    const submitButton = screen.getByText('Save User');
    fireEvent.click(submitButton);

    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('City is required')).toBeInTheDocument();
  });

  it('shows email format error for invalid email', () => {
    const { container } = render(
      <BrowserRouter>
        <UserForm />
      </BrowserRouter>
    );

    const emailInput = container.querySelector('input[name="email"]') as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: 'zly-format-maila' } });

    const submitButton = screen.getByText('Save User');
    fireEvent.click(submitButton);

    expect(screen.getByText('Email format is invalid')).toBeInTheDocument();
  });
});