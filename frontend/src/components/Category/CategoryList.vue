<template>
  <div class="flex overflow-x-auto space-x-4 bg-gray-100">
    <div
      v-for="category in categories"
      :key="category.id"
      class="flex-shrink-0 w-48 cursor-pointer rounded-lg shadow-md bg-white"
      @click="navigateToCategory(category.slug)"
    >
      <img
        :src="`https://abh.ai/nature/400/200?random=${category.name}`"
        :alt="category.name"
        class="w-full h-32 object-cover rounded-t-lg"
      />
      <div class="p-4 text-center">
        <h3 class="text-lg font-semibold text-gray-800">{{ category.name }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { defineProps } from 'vue'

// Define props
const props = defineProps<{
  categories: Array<{
    id: number
    name: string
    slug: string
    description: string
    cover_image_id: number
    thumbnail_id: number
  }>
}>()

const router = useRouter()

// Navigation function
const navigateToCategory = (slug: string) => {
  router.push({ name: 'CategoryPage', params: { slug } })
}
</script>

<style scoped>
/* Additional styling for scrollable area if needed */
</style>
