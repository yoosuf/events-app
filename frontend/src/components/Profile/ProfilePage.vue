<template>
  <div class="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
    <!-- Profile Information Section -->
    <div class="flex items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">{{ user?.name }}</h1>
        <p class="text-gray-600">{{ user?.email }}</p>
      </div>
    </div>

    <!-- Joined Events Section -->
    <div v-if="joinedEvents.length > 0" class="mt-8">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">Events You've Joined</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Use EventCard Component for each event -->
        <EventCard
          v-for="event in joinedEvents"
          :key="event.id"
          :event="event"
        />
      </div>
    </div>
    <div v-else class="mt-8 text-gray-600">
      <p>You haven’t joined any events yet.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useEventStore } from '../../store/eventStore'
import { useAuthStore } from '../../store/authStore'
import EventCard from '../../components/Event/EventCard.vue'

// Use the event store to get joined events
const eventStore = useEventStore()
const authStore = useAuthStore()

// Fetch joined events on component mount
onMounted(async () => {
  console.log('Component mounted. Fetching joined events...')
  try {
    await eventStore.fetchJoinedEvents()
    console.log('Successfully fetched joined events:', eventStore.joinedEvents)
  } catch (error) {
    console.error('Error fetching joined events:', error)
  }
})

// Compute joined events from the store
const joinedEvents = computed(() => {
  console.log('Computed joined events:', eventStore.joinedEvents)
  return eventStore.joinedEvents
})

// Get user information from the auth store
const user = computed(() => {
  console.log('User information from auth store:', authStore.user)
  return authStore.user
})
</script>

<style scoped>
/* Additional styling if needed */
</style>
