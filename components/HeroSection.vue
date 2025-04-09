<template>
  <PageSection id="hero" sectionClass="min-h-[110vh] flex flex-col items-center justify-center px-4 relative z-10">
    <div data-animate="fade" class="text-center">
      <div class="inline-block relative mb-2">
        <div class="hero-glow absolute -inset-10 rounded-full blur-3xl opacity-30 bg-blue-500"></div>
        <h1 class="text-4xl md:text-7xl font-bold mb-4 hero-text relative">Hi! <span class="wave">👋</span></h1>
      </div>
      <!-- Animated text with typewriter effect -->
      <h2 class="text-3xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text h-[3rem] md:h-[4.5rem] flex items-center justify-center">
        <span class="animated-text">{{ currentText }}</span>
      </h2>
      <p class="mt-6 text-lg md:text-xl text-gray-300">Computer Engineering Student & Software Developer</p>
      
      <div class="mt-10">
        <a href="#about" class="group animate-bounce inline-flex items-center justify-center">
          <div class="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full p-3 group-hover:bg-blue-600/50 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </a>
      </div>
    </div>
  </PageSection>
</template>

<script setup>
import { useTextAnimation } from '~/composables/useTextAnimation'

// Text rotation variables
const textOptions = [
  'This is Axel',
  'I do code',
  'and messing with AI',
  'and some gaming',
  'and you\'ll find me singing',
  'anyway I\'m Axel'
];

const { currentText } = useTextAnimation(textOptions);
</script>

<style scoped>
.animated-text {
  display: inline-block;
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-out {
  opacity: 0;
  transform: translateY(10px);
}

.fade-in {
  opacity: 1;
  transform: translateY(0);
  animation: text-shimmer 2s ease;
}

@keyframes text-shimmer {
  0% {
    background-position: -100% 50%;
  }
  100% {
    background-position: 200% 50%;
  }
}

.hero-text {
  text-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
}

.hero-glow {
  animation: glow 4s ease-in-out infinite alternate;
}

@keyframes glow {
  0% {
    opacity: 0.2;
    transform: scale(0.9);
  }
  100% {
    opacity: 0.4;
    transform: scale(1.1);
  }
}

.wave {
  display: inline-block;
  animation: wave 1.5s infinite;
  transform-origin: 70% 70%;
}

@keyframes wave {
  0% { transform: rotate(0deg); }
  10% { transform: rotate(14deg); }
  20% { transform: rotate(-8deg); }
  30% { transform: rotate(14deg); }
  40% { transform: rotate(-4deg); }
  50% { transform: rotate(10deg); }
  60% { transform: rotate(0deg); }
  100% { transform: rotate(0deg); }
}
</style> 