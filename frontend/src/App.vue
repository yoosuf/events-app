<template>
  <router-view />
</template>

<script setup lang="ts">
import { useEventStore } from './store/eventStore';


const store = useEventStore()
const isAuthenticated = store.isAuthenticated
const logout = () => {
  store.logout()
}
</script>
