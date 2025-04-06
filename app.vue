<template>
  <div class="min-h-screen bg-black text-white pb-safe">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <FeedbackOverlay />
  </div>
</template>

<script setup>
// Set dark mode by default
onMounted(() => {
  document.documentElement.classList.add('dark')
})
</script>

<style lang="postcss">
html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: #000;
  color: #fff;
}

/* Updated to use Tailwind CSS 4 @layer syntax */
@layer components {
  .card {
    @apply bg-gray-900 rounded-lg p-6 shadow-md;
  }

  .btn-primary {
    @apply inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300;
  }
}

/* Add safe area utilities */
.pb-safe {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>