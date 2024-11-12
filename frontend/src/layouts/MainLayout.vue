<!-- src/layouts/MainLayout.vue -->
<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header -->
    <Header />

    <!-- Main Content -->
    <main class="flex-grow p-4">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <router-view />
      </div>
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from './Header.vue'
import Footer from './Footer.vue'
</script>

<style scoped>
/* Add basic styling for layout */
.main {
  padding: 20px;
  flex-grow: 1;
}
</style>