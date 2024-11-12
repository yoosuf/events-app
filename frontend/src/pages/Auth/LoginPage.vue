<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company" />
            <h2 class="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form @submit.prevent="handleLogin" class="space-y-6">
                <FormField
                    label="Email address"
                    id="email"
                    type="email"
                    v-model="email"
                    placeholder="Enter your email"
                    :error="errors.email"
                />
                <FormField
                    label="Password"
                    id="password"
                    type="password"
                    v-model="password"
                    placeholder="Enter your password"
                    :error="errors.password"
                />

                <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-md px-3 py-1.5 shadow-sm">Sign in</button>
            </form>

            <p class="mt-10 text-center text-sm text-gray-500">
                Not a member?
                <router-link to="/register" class="font-semibold text-indigo-600 hover:text-indigo-500">Register now.</router-link>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../../store/authStore'
import FormField from '../../components/Form/FormField.vue'

// Define reactive state for form fields and errors
const email = ref('')
const password = ref('')
const errors = ref<{ email?: string, password?: string }>({})

// Use the authStore
const authStore = useAuthStore()

// Handle login submission
const handleLogin = async () => {
    // Reset errors
    errors.value = {}

    // Basic validation
    if (!email.value) {
        errors.value.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email.value)) {
        errors.value.email = 'Please enter a valid email address'
    }

    if (!password.value) {
        errors.value.password = 'Password is required'
    } else if (password.value.length < 6) {
        errors.value.password = 'Password must be at least 6 characters long'
    }

    // Stop submission if there are validation errors
    if (Object.keys(errors.value).length > 0) {
        console.log('Validation errors:', errors.value)
        return
    }

    try {
        // Use the login function from authStore
        await authStore.login(email.value, password.value)
        console.log('Login successful')
    } catch (error) {
        console.error('Login error:', error)
        alert(error instanceof Error ? error.message : 'Login failed. Please try again.')
    }
}
</script>

<style scoped>
/* Additional styling if needed */
</style>
