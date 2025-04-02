<template>
  <section :id="id" :class="sectionClass">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <slot></slot>
    </div>
  </section>
</template>

<script setup>
defineProps({
  id: {
    type: String,
    required: true
  },
  sectionClass: {
    type: String,
    default: 'py-16 md:py-24 min-h-screen relative z-10'
  }
});
</script>