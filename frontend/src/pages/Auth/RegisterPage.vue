<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">Create your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="handleSignUp" class="space-y-6">
        <FormField
          label="Full Name"
          id="fullName"
          v-model="fullName"
          placeholder="Enter your full name"
          :error="errors.fullName"
        />
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

        <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-md px-3 py-1.5 shadow-sm">Submit</button>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Have an account?
        <router-link to="/login" class="font-semibold text-indigo-600 hover:text-indigo-500">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import FormField from '../../components/Form/FormField.vue'
import { register } from '../../services/authService'

// Define reactive state for form fields and errors
const fullName = ref('')
const email = ref('')
const password = ref('')
const errors = ref<{ fullName?: string, email?: string, password?: string }>({})

// Access the router
const router = useRouter()

// Watch for changes and clear errors when the input becomes valid
watch(fullName, (newValue) => {
  if (newValue && newValue.length >= 2) {
    errors.value.fullName = ''
  }
})

watch(email, (newValue) => {
  if (newValue && /\S+@\S+\.\S+/.test(newValue)) {
    errors.value.email = ''
  }
})

watch(password, (newValue) => {
  if (newValue && newValue.length >= 6) {
    errors.value.password = ''
  }
})

// Handle form submission
const handleSignUp = async () => {
  // Reset errors
  errors.value = {}

  // Basic validation
  if (!fullName.value) {
    errors.value.fullName = 'Full name is required'
  } else if (fullName.value.length < 2) {
    errors.value.fullName = 'Full name must be at least 2 characters long'
  }

  if (!email.value) {
    errors.value.email = 'Email is required'
  } else if (!/\S+@\S+\.\S+/.test(email.value)) {
    errors.value.email = 'Enter a valid email address'
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
    console.log('Attempting to register user with values:', { fullName: fullName.value, email: email.value, password: password.value })
    
    // Call the register function from authService
    const response = await register({
      name: fullName.value,
      email: email.value,
      password: password.value
    })
    
    console.log('Registration successful:', response)
    
    // Store the token in local storage
    localStorage.setItem('token', response.token)
    console.log('Token saved to local storage:', response.token)

    // Redirect to home page after successful signup
    router.push('/')
    console.log('Redirecting to home page')
    
  } catch (error) {
    console.error('Registration error:', error)
    alert(error instanceof Error ? error.message : 'Registration failed. Please try again.')
  }
}
</script>

<style scoped>
/* Additional styling if needed */
</style>
