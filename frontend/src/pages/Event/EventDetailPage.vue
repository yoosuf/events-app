<template>
  <EventDetail
    v-if="transformedEvent"
    :event="transformedEvent"
    @joinEvent="handleJoinEvent"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEventStore } from '../../store/eventStore'
import { useAuthStore } from '../../store/authStore'
import EventDetail from '../../components/Event/EventDetail.vue'

interface TransformedEvent {
  id: number
  title: string
  description: string
  location: string
  is_online: boolean
  start_date: Date | null
  end_date: Date | null
  cover_image_url?: string
  thumbnail_url?: string
}

const store = useEventStore()
const authStore = useAuthStore() // Import the auth store to check authentication status
const route = useRoute()
const router = useRouter()

const eventId = parseInt(route.params.id as string, 10)
const transformedEvent = ref<TransformedEvent | null>(null)

// Fetch event details on mount
onMounted(async () => {
  try {
    await store.fetchEventDetails(eventId)
    const event = store.currentEvent

    if (event) {
      transformedEvent.value = {
        id: event.id,
        title: event.title,
        description: event.description,
        location: event.location,
        is_online: event.is_online,
        start_date: new Date(event.startDate),
        end_date: new Date(event.endDate),
        cover_image_url: event.cover_image?.file_path ? `/${event.cover_image.file_path}` : undefined,
        thumbnail_url: event.thumbnail?.file_path ? `/${event.thumbnail.file_path}` : undefined,
      }

      console.log("Transformed event:", transformedEvent.value) // Debugging point
    } else {
      console.warn("Event not found, redirecting.") // Debugging point
      router.push({ name: 'NotFound' }) // Redirect if event not found
    }
  } catch (error) {
    console.error("Error fetching event details:", error)
    router.push({ name: 'NotFound' }) // Redirect if an error occurs
  }
})

// Handle join event action
const handleJoinEvent = async () => {
  if (!transformedEvent.value) return

  // Check if the user is authenticated
  if (!authStore.isAuthenticated) {
    console.warn("User is not authenticated, redirecting to login page.") // Debugging point
    await router.push({ name: 'Login', query: { redirect: `/events/${eventId}` } }) // Redirect to login page
    return
  }

  // If authenticated, proceed with joining the event
  try {
    await store.joinEvent(transformedEvent.value.id) // Call joinEvent from the store
    alert('Successfully joined the event!')
  } catch (error) {
    console.error('Error joining event:', error)
    alert('Failed to join the event. Please try again.')
  }
}
</script>
