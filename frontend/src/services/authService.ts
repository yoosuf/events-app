// src/services/authService.ts
import apiClient from './axiosInstance'

interface RegisterData {
    name: string
    email: string
    password: string
}

interface LoginData {
    email: string
    password: string
}

interface AuthResponse {
    token: string
    user: {
        id: number
        name: string
        email: string
    }
}

// Register a new user
export const register = async (data: RegisterData): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/register', data)
    return response.data
}

// Login user
export const login = async (data: LoginData): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/login', data)
    return response.data
}

// Logout user
export const logout = async (): Promise<void> => {
    await apiClient.post('/logout')
    localStorage.removeItem('token')
}

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
    return Boolean(localStorage.getItem('token'))
}

export async function getUserInfo() {
    const response = await apiClient.get('/user') // Adjust endpoint as needed
    return response.data
}
