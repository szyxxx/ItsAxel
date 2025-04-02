<template>
  <UContainer class="min-h-screen">
    <div class="flex flex-col items-center justify-center h-[100vh] px-4">
      <div data-animate="fade" class="text-center">
        <!-- Terminal-style header -->
        <UCard
          class="mb-8 bg-gray-900/50 border-gray-800 backdrop-blur-sm max-w-xl mx-auto"
        >
          <template #header>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <div class="w-3 h-3 rounded-full bg-red-500"></div>
                <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div class="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span class="text-xs text-gray-400">journal-service.sh</span>
            </div>
          </template>
          
          <div class="font-mono text-sm mb-4">
            <div class="flex items-start">
              <span class="text-green-400">→</span>
              <span class="text-blue-400">axel</span>
              <span class="text-gray-400">@</span>
              <span class="text-purple-400">journal</span>
              <span class="text-gray-400">$</span>
              <span class="ml-2 text-white">./check-status.sh</span>
            </div>
            <div class="mt-2 text-yellow-400">
              [WARNING]: Journal service is currently under construction.
            </div>
            <div class="mt-1 text-gray-300">
              Redirecting to home page in <span class="text-white font-bold">{{ countdown }}</span> seconds...
            </div>
          </div>
        </UCard>
        
        <UProgress
          :value="progressValue" 
          color="yellow"
          size="sm"
          class="max-w-md mx-auto mb-8"
        />
      </div>
    </div>
  </UContainer>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useScrollAnimation } from '~/composables/useScrollAnimation'
import { useRouter } from 'vue-router'

const router = useRouter()
const countdown = ref(10)
const progressValue = ref(0)

// Initialize scroll animations
onMounted(() => {
  useScrollAnimation()
  
  // Setup countdown and redirect
  const timer = setInterval(() => {
    countdown.value--
    progressValue.value = ((3 - countdown.value) / 3) * 100
    
    if (countdown.value <= 0) {
      clearInterval(timer)
      router.push('/')
    }
  }, 1000)
  
  // Cleanup on component unmount
  onUnmounted(() => {
    clearInterval(timer)
  })
})
</script>

<style scoped>
/* Terminal style animation */
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>