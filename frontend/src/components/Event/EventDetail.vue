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
        <span class="font-semibold">Date:</span>
        <span>
          {{ event.start_date ? formatDate(event.start_date) : 'Date not available' }}
          <span v-if="event.end_date"> - {{ formatDate(event.end_date) }}</span>
        </span>
      </p>
    </div>

    <!-- Join Event Button -->
    <button
      @click="handleJoinEvent"
      class="mt-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-200"
    >
      Join Event
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useEventStore } from '../../store/eventStore'
import { useRouter } from 'vue-router'

interface TransformedEvent {
  id: number
  title: string
  description: string
  location: string
  is_online: boolean
  start_date: Date | null
  end_date: Date | null
  cover_image_url?: string
}

const props = defineProps<{ event: TransformedEvent }>()
const store = useEventStore()
const router = useRouter()

// Function to handle joining the event
const handleJoinEvent = async () => {
  try {
    await store.joinEvent(props.event.id) // Call joinEvent from the store
    alert('Successfully joined the event!')
  } catch (error) {
    console.error('Error joining event:', error)
    alert('Failed to join the event. Please try again.')
  }
}

// Utility function to format the date
const formatDate = (date: Date): string => {
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
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
