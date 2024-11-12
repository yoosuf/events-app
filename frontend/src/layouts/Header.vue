<!-- src/components/Header.vue -->
<template>
    <header class="bg-indigo-600 text-white py-4 shadow-lg">
        <div class="container mx-auto flex justify-between items-center px-4">
            <h1 class="text-2xl font-bold"> 
                <router-link to="/" class="hover:text-gray-200">Knotify</router-link>
            </h1>
            <nav class="space-x-4 flex items-center">
                <router-link to="/" class="hover:text-gray-200">Events</router-link>
                <router-link to="/profile" class="hover:text-gray-200">Profile</router-link>
                
                <!-- Show user name and logout if authenticated -->
                <div v-if="isAuthenticated" class="flex items-center space-x-4">
                    <span class="text-gray-200">Welcome, {{ user?.name }}</span>
                    <button @click="logout" class="hover:text-gray-200">Logout</button>
                </div>

                <!-- Show login link if not authenticated -->
                <router-link v-else to="/login" class="hover:text-gray-200">Login</router-link>
            </nav>
        </div>
    </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '../store/authStore'

const authStore = useAuthStore()

// Computed properties for easy access to authentication state and user data
const isAuthenticated = computed(() => authStore.isAuthenticated)
const user = computed(() => authStore.user)

// Logout function
const logout = () => {
    authStore.logout()
}
</script>

<style scoped>
/* Styling for the header */
</style>
