<template>
  <div class="mb-4">
      <label :for="id" class="block text-sm font-medium text-gray-700">{{ label }}</label>
      <input
          :id="id"
          :type="type"
          :placeholder="placeholder"
          :class="['mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm', { 'border-red-500': error }]"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
      />
      <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  id: { type: String, required: true },
  type: { type: String, default: 'text' },
  modelValue: { type: String, required: true },
  placeholder: { type: String, default: '' },
  error: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
/* Additional styling if needed */
</style>
