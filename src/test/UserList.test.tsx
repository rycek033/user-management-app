import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { UserList } from '../pages/UserList';
import { NotificationProvider } from '../context/NotificationContext';
import { describe, it, expect, vi } from 'vitest';
import * as api from '../services/api';

vi.mock('../services/api')

const mockUsers = [
  {
    id: 1,
    name: 'Jan Kowalski',
    username: 'jkowal',
    email: 'jan@example.com',
    address: { city: 'Warszawa' },
    company: { name: 'Firma X' }
  },
  {
    id: 2,
    name: 'Anna Nowak',
    username: 'anowak',
    email: 'anna@example.com',
    address: { city: 'Kraków' },
    company: { name: 'Firma Y' }
  }
];

describe('UserList Component', () => {
  it('renders loading state initially', () => {
    vi.mocked(api.getUsers).mockReturnValue(new Promise(() => {}))
    
    render(
      <BrowserRouter>
        <NotificationProvider>
          <UserList />
        </NotificationProvider>
      </BrowserRouter>
    );
    
    expect(screen.getByText('Downloading users...')).toBeInTheDocument()
  });

  it('renders users and filters them by search query', async () => {
    vi.mocked(api.getUsers).mockResolvedValue(mockUsers as any)
    
    render(
      <BrowserRouter>
        <NotificationProvider>
          <UserList />
        </NotificationProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Jan Kowalski')).toBeInTheDocument()
      expect(screen.getByText('Anna Nowak')).toBeInTheDocument()
    });

    const searchInput = screen.getByPlaceholderText('Search by name or email...')
    fireEvent.change(searchInput, { target: { value: 'Anna' } });

    expect(screen.queryByText('Jan Kowalski')).not.toBeInTheDocument()
    expect(screen.getByText('Anna Nowak')).toBeInTheDocument()
  })
})