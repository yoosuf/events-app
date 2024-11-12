<template>
  <EventDetail v-if="transformedEvent" :event="transformedEvent" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEventStore } from '../../store/eventStore'
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
const route = useRoute()
const router = useRouter()

const eventId = parseInt(route.params.id as string, 10)
const transformedEvent = ref<TransformedEvent | null>(null) // Properly type `transformedEvent` to allow it to be either a TransformedEvent or null

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
        start_date: new Date(event.startDate), // Use startDate and convert to Date type
        end_date: new Date(event.endDate),     // Use endDate and convert to Date type
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
</script>
