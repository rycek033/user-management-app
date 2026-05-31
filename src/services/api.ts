import type { User, Post, Comment } from '../types';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const getUsers = async (): Promise<User[]> => {
    const response = await fetch(`${API_URL}/users`)
    if (!response.ok) throw new Error('Failed to fetch users')
    return response.json();
}

export const getUserById = async (id: string): Promise<User> => {
    const response = await fetch(`${API_URL}/users/${id}`)
    if (!response.ok) throw new Error("Failed to fetch user details")
    return response.json();
}

export const getUserPosts = async (userId: string): Promise<Post[]> => {
    const response = await fetch(`${API_URL}/users/${userId}/posts`)
    if (!response.ok) throw new Error('Failed to fetch user posts')
    return response.json();
}

export const getPostComments = async (postId: number): Promise<Comment[]> => {
    const response = await fetch(`${API_URL}/posts/${postId}/comments`)
    if (!response.ok) throw new Error('Failed to fetch post comments')
    return response.json();
}

export const createUser = async (userData: Partial<User>): Promise<User> => {
    const response = await fetch(`${API_URL}/users`,{
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {'Content-Type': 'application/json; charset=UTF-8'}
    })
    if(!response.ok) throw new Error('Failed to create user')
    return response.json();
}

export const updateUser = async (id: string, userData: Partial<User>): Promise<User> => {
    const response = await fetch(`${API_URL}/users/${id}`,{
        method: 'PUT',
        body: JSON.stringify(userData),
        headers: {'Content-Type': 'application/json; charset=UTF-8'}
    })
    if(!response.ok) throw new Error('Failed to update user')
    return response.json();
}

export const deleteUser = async (id: string): Promise<boolean> => {
    const response = await fetch(`${API_URL}/users/${id}`,{
        method: 'DELETE'
    })
    if(!response.ok) throw new Error('Failed to delete user')
    return true
}