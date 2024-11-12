<template>
  <router-link :to="{ name: 'EventDetail', params: { id: event.id } }" class="block group">
    <div class="border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200 bg-white cursor-pointer">
      <!-- Placeholder Image or Thumbnail -->
      <div class="h-48 w-full overflow-hidden">
        <img
          :src="event.thumbnail_url"
          alt="Event image"
          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <!-- Card Content -->
      <div class="p-4">
        <h3 class="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors duration-200">
          {{ event.title }}
        </h3>
        <p class="text-gray-600 mb-4 line-clamp-2">
          {{ event.description }}
        </p>
        <p class="text-sm text-gray-500 mb-2">
          <span class="font-semibold">Date:</span>
          <span v-if="event.start_date && event.end_date">
            {{ formatEventDate(event.start_date) }} - {{ formatEventDate(event.end_date) }}
          </span>
          <span v-else>Date not available</span>
        </p>
        <p class="text-sm text-gray-500">
          <span class="font-semibold">Location:</span> {{ event.is_online ? 'Online' : event.location }}
        </p>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { format } from 'date-fns'

const props = defineProps<{
  event: {
    id: number
    title: string
    description: string
    location: string
    is_online: boolean
    start_date: Date | null
    end_date: Date | null
    thumbnail_url?: string
  }
}>()

const formatEventDate = (date: Date) => {
  return format(date, 'MMM dd, yyyy')
}
</script>
