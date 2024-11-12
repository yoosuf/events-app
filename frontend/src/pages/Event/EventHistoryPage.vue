<template>
    <div>
      <h2 class="text-3xl font-bold underline">Joined Event History</h2>
      <div v-if="!store.isAuthenticated" class="text-red-600">
        You must be logged in to view your joined events.
      </div>
      <div v-else-if="store.joinedEvents.length === 0" class="text-gray-600">
        No events joined.
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <div
          v-for="event in store.joinedEvents"
          :key="event.id"
          class="border rounded-lg p-4 shadow-md"
        >
          <h3 class="text-xl font-semibold">{{ event.title }}</h3>
          <p class="text-gray-500">{{ event.description }}</p>
          <p class="text-gray-700 mt-2">
            {{ event.is_online ? 'Online' : event.location }}
          </p>
          <p class="text-gray-700 mt-1">
            {{ event.start_date() }} - {{ event.end_date() }}
          </p>
          <span class="mt-4 text-green-600 font-semibold">Joined</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted } from 'vue'
  import { useEventStore } from '../../store/eventStore'
  
  const store = useEventStore()
  
  onMounted(() => {
    store.fetchEvents()
    if (store.isAuthenticated) {
      store.fetchJoinedEvents()
    }
  })
  </script>
  
  <style scoped>
  /* Additional styling if needed */
  </style>
  