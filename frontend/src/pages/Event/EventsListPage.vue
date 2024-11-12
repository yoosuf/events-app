<template>
  <div class="mx-auto max-w-2xl lg:max-w-none">
    <!-- <h2 class="text-2xl font-bold text-gray-900">Explore top categories</h2> -->
    <!-- <CategoryList :categories="categoryStore.categories" /> -->

    <h2 class="text-2xl font-bold text-gray-900 mt-6">All Events</h2>
    <EventList :events="eventStore.events" />

    <div v-if="isLoading" class="text-center mt-4">Loading more events...</div>
    <div v-if="eventStore.allEventsLoaded && !isLoading" class="text-center mt-4">All events are loaded</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useEventStore } from '../../store/eventStore'
import { useCategoryStore } from '../../store/categoryStore'
import EventList from '../../components/Event/EventList.vue'
// import CategoryList from '../../components/Category/CategoryList.vue'

const eventStore = useEventStore()
const categoryStore = useCategoryStore()

const isLoading = ref(false)
const currentPage = ref(1)

const fetchInitialData = async () => {
  console.log('Fetching initial data...')
  try {
    await categoryStore.fetchCategories()
    console.log('Fetched categories:', categoryStore.categories)
    await eventStore.fetchEvents({ page: currentPage.value })
    console.log('Fetched events:', eventStore.events)
  } catch (error) {
    console.error('Error fetching initial data:', error)
  }
}

const fetchMoreEvents = async () => {
  if (isLoading.value || eventStore.allEventsLoaded) {
    console.log('No more events to load or currently loading.') // Debugging point
    return
  }

  console.log('Fetching more events for page:', currentPage.value + 1) // Debugging point
  isLoading.value = true
  currentPage.value++
  
  try {
    await eventStore.fetchEvents({ page: currentPage.value })
    console.log('Fetched more events:', eventStore.events)
  } catch (error) {
    console.error('Error fetching more events:', error)
  } finally {
    isLoading.value = false
    console.log('Loading state set to false.')
  }
}

const onScroll = () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement
  if (scrollTop + clientHeight >= scrollHeight - 50) {
    console.log('Triggering fetchMoreEvents on scroll')
    fetchMoreEvents()
  }
}

onMounted(() => {
  console.log('Component mounted, fetching initial data...')
  fetchInitialData()
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  console.log('Component unmounted, removing scroll listener.')
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
/* Additional styling if needed */
</style>
