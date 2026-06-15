import { useState, useEffect, useCallback } from 'react';
import { getUsers, deleteUser as apiDeleteUser } from '../services/api';
import { useNotification } from '../context/NotificationContext';
import type { User } from '../types';

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { showNotification } = useNotification()

    const fetchUsers = useCallback(async () => {
        try {
            setIsLoading(true)
            const data = await getUsers()
            setUsers(data)
            setError(null)
        } catch (err) {
            setError('Failed to fetch users')
            showNotification('Failed to fetch users', 'error')
        } finally {
            setIsLoading(false)
        }
    }, [showNotification])

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers])

    const deleteUser = async (id: string) => {
        try {
            await apiDeleteUser(id)
            setUsers(prev => prev.filter(user => String(user.id) !== String(id)))
            showNotification('User deleted successfully', 'success')
        } catch (err) {
            showNotification('Failed to delete user', 'error')
        }
    }

    return { users, isLoading, error, deleteUser, refetch: fetchUsers }
}