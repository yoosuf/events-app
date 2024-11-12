<template>
  <button
    :type="type"
    :class="[
      'flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
      bgColor,
      textColor,
      hoverBgColor
    ]"
    @click="handleClick"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, PropType } from 'vue'

// Define allowed button types
type ButtonType = 'button' | 'submit' | 'reset'

// Define props with specific type options, including `label` for button text
const props = defineProps({
  type: { type: String as PropType<ButtonType>, default: 'submit' }, // Default type to 'submit'
  label: { type: String, required: true },
  bgColor: { type: String, default: 'bg-indigo-600' },
  textColor: { type: String, default: 'text-white' },
  hoverBgColor: { type: String, default: 'hover:bg-indigo-500' },
})

const emit = defineEmits(['click'])

const handleClick = (event: Event) => {
  if (props.type !== 'submit') {
    emit('click', event)
  }
}
</script>

<style scoped>
/* Additional styling if needed */
</style>
