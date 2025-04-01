<template>
    <div class="min-h-screen">
      <SiteNavigation />
      
      <div class="flex items-center justify-center h-[70vh]">
        <div data-animate="fade" class="text-center">
          <h1 class="text-3xl font-bold mb-4">Journals are under construction ⚠️</h1>
          <p class="text-gray-400">Check back soon for updates on my latest projects and thoughts.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useScrollAnimation } from '~/composables/useScrollAnimation'
  
  // Initialize scroll animations
  onMounted(() => {
    useScrollAnimation()
  })
  </script>