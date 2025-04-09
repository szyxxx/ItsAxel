<template>
  <div class="min-h-screen pt-16 md:pt-0 code-pattern-bg">
    <div class="bg-gradient-overlay"></div>
    <SiteNavigation />
    
    <HeroSection />
    <AboutSection />
    <CareerSection />
    <ExperimentsSection />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useScrollAnimation } from '~/composables/useScrollAnimation'
import { setupSmoothScroll } from '~/utils/smoothScroll'

// Initialize scroll animations
onMounted(() => {
  useScrollAnimation()
  setupSmoothScroll()
})
</script>

<style scoped>
.code-pattern-bg {
  background-color: #0f172a;
  background-image: 
    radial-gradient(rgba(120, 120, 255, 0.04) 2px, transparent 2px),
    radial-gradient(rgba(120, 120, 255, 0.03) 1.5px, transparent 1.5px);
  background-size: 50px 50px;
  background-position: 0 0, 25px 25px;
  position: relative;
}

.bg-gradient-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at top right, rgba(15, 23, 42, 0.1), #0f172a 70%);
  z-index: 0;
  pointer-events: none;
}

/* Scrolling */
html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px;
}

section {
  scroll-margin-top: 80px;
}
</style>