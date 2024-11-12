<template>
  <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
    <!-- Cover Image with Fixed Aspect Ratio -->
    <div v-if="event.cover_image_url" class="mb-6 relative overflow-hidden rounded-lg aspect-w-16 aspect-h-9">
      <img
        :src="formatUrl(event.cover_image_url)"
        :alt="`Cover image for ${event.title}`"
        class="absolute top-0 left-0 w-full h-full object-cover"
      />
    </div>

    <!-- Event Title -->
    <h1 class="text-3xl font-bold mb-4">{{ event.title }}</h1>

    <!-- Event Description -->
    <p class="text-lg mb-6">{{ event.description }}</p>

    <!-- Event Info -->
    <div class="space-y-4 text-lg">
      <p>
        <span class="font-semibold">Location:</span> {{ event.is_online ? 'Online' : event.location }}
      </p>
      <p class="text-sm text-gray-500 mb-2">
        <span class="font-semibold">Date & Time:</span>
        <span>
          {{ event.start_date ? formatDateTime(event.start_date) : 'Date not available' }}
          <span v-if="event.end_date"> - {{ formatDateTime(event.end_date) }}</span>
        </span>
      </p>
    </div>

    <!-- Join Event Button -->
    <button
      @click="$emit('joinEvent')"
      class="mt-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-200"
    >
      Join Event
    </button>

  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface TransformedEvent {
  id: number
  title: string
  description: string
  location: string
  is_online: boolean
  start_date: Date | string | null
  end_date: Date | string | null
  cover_image_url?: string
}

const props = defineProps<{ event: TransformedEvent }>()
const emit = defineEmits(['joinEvent'])

// Utility function to format the date and time
const formatDateTime = (date: Date | string): string => {
  console.log('Original date value:', date); // Debugging

  // Ensure the date is a Date object
  const eventDate = typeof date === 'string' ? new Date(date) : date

  // Check if the date is valid
  if (eventDate instanceof Date && !isNaN(eventDate.getTime())) {
    return eventDate.toLocaleString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true // Ensures time is displayed in 12-hour format with AM/PM
    })
  } else {
    console.warn('Invalid date encountered:', date); // Debugging
    return 'Date not available'
  }
}

// Utility function to format the URL
const formatUrl = (url: string): string => {
  return url.startsWith('/') ? url.substring(1) : url
}


</script>

<style scoped>
.aspect-w-16 {
  aspect-ratio: 16 / 9;
}
</style>
