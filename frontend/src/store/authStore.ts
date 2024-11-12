import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import * as authService from '../services/authService'
import { ref, onMounted } from 'vue'

export const useAuthStore = defineStore('authStore', () => {
    const router = useRouter()
    
    // State for user and authentication
    const isAuthenticated = ref(false)
    const user = ref<{ id: number, name: string, email: string } | null>(null)

    // Check login status from localStorage or other sources on initialization
    const checkAuthStatus = async () => {
        const token = localStorage.getItem('token')
        if (token) {
            try {
                // Fetch user details or verify token from an endpoint if necessary
                user.value = await authService.getUserInfo() // Assuming `getUserInfo` fetches the logged-in user’s data
                isAuthenticated.value = true
            } catch {
                logout() // Logout if token is invalid
            }
        }
    }

    // Login action
    const login = async (email: string, password: string) => {
        try {
            const response = await authService.login({ email, password })
            localStorage.setItem('token', response.token)
            user.value = response.user
            isAuthenticated.value = true
            router.push('/') // Redirect to home page after login
        } catch (error) {
            console.error('Login failed:', error)
            throw new Error(error instanceof Error ? error.message : 'Login failed. Please try again.')
        }
    }

    // Logout action
    const logout = () => {
        localStorage.removeItem('token')
        user.value = null
        isAuthenticated.value = false
        router.push('/login')
    }

    // Ensure `checkAuthStatus` is called on store initialization
    onMounted(async () => {
        await checkAuthStatus()
    })

    return {
        isAuthenticated,
        user,
        login,
        logout,
        checkAuthStatus
    }
})
