<template>
  <div class="p-4">
    <h2 class="text-3xl font-bold mb-4">{{ category?.name }}</h2>
    <p class="text-gray-600 mb-6">{{ category?.description }}</p>

    <h3 class="text-2xl font-semibold mb-4">Events in {{ category?.name }}</h3>

    <EventList :events="categoryEvents" />

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { categories } from '../../data/categoryData';
import { events } from '../../data/eventData';
import EventList from '../../components/Event/EventList.vue'


// Get the category slug from route parameters
const route = useRoute()
const slug = route.params.slug as string

// Find the category based on the slug
const category = computed(() => categories.find(cat => cat.slug === slug))

// Get events related to the category
const categoryEvents = computed(() => events.filter(event => event.categories_id === category.value?.id))

console.log(categoryEvents)
</script>

<style scoped>
/* Additional styling if needed */
</style>