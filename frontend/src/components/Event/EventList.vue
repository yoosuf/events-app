<template>
  <div>
    <!-- Loading Message -->
    <div v-if="loading" class="text-gray-600">
      Loading events...
    </div>
    <!-- No Events Available or Events List -->
    <div v-else>
      <div v-if="events.length === 0" class="text-gray-600">
        No events available.
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <EventCard v-for="event in events" :key="event.id" :event="event" :isJoined="isJoined" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useEventStore } from '../../store/eventStore'
import EventCard from './EventCard.vue'

const store = useEventStore()
const loading = ref(true)

const props = defineProps<{
  events: Array<{
    id: number
    title: string
    description: string
    location: string
    is_online: boolean
    start_date: Date
    end_date: Date
  }>
  isJoined?: boolean
}>()

onMounted(async () => {
  try {
    await store.fetchEvents({ page: 1 })
  } catch (error) {
    console.error('Error loading events:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
/* Additional styling if needed */
</style>
