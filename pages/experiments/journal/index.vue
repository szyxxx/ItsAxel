<template>
  <UContainer class="min-h-screen py-12 journal-index-bg">
    <!-- Background gradient overlay -->
    <div class="bg-gradient-overlay"></div>
    
    <!-- Floating decorative elements -->
    <div class="floating-elements">
      <div class="floating-circle circle-1"></div>
      <div class="floating-circle circle-2"></div>
      <div class="floating-square"></div>
      <div class="floating-triangle"></div>
    </div>
    
    <!-- Stage-themed header section -->
    <section class="relative mb-16 overflow-hidden">
      <!-- Main content -->
      <div class="relative z-10 pt-8 pb-12 px-4">
        
        <!-- Featured entry card with glass design -->
        <div data-animate="slide-up" class="featured-card max-w-4xl mx-auto overflow-hidden rounded-2xl">
          <div class="card-glow"></div>
          <div class="relative">
            <div class="p-6 relative z-10">
              <!-- Player title and subtitle -->
              <div class="text-center mb-6">
                <h2 class="text-2xl md:text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                  Vibe with Me
                </h2>
                <p class="text-gray-400 text-sm max-w-2xl mx-auto">
                  Hey you discover this page. I do some yapping here 😶‍🌫️.
                </p>
              </div>
              
              <!-- Player and content -->
              <div class="w-full flex flex-col">
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <h3 class="text-xl font-bold mb-1">Here Me Out!</h3>
                    <p class="text-sm text-gray-400">Why Szyx? Why making these?</p>
                  </div>
                  <UBadge color="blue" variant="subtle" class="uppercase tracking-wider">
                    07 April 2024
                  </UBadge>
                </div>
                
                <!-- Visualizer - only show on non-mobile screens -->
                <div class="hidden md:flex h-16 mb-4 bg-gray-800/50 rounded-lg overflow-hidden items-end justify-between p-2">
                  <div v-for="i in 20" :key="i" class="visualizer-bar mx-px rounded-t-sm" 
                       :style="{
                         height: `${10}%`,
                         animationDelay: `${i * 0.05}s`
                       }">
                  </div>
                </div>
                
                <!-- Audio controls with integrated volume -->
                <div class="bg-gray-800/50 rounded-lg p-4">
                  <div class="flex flex-col sm:flex-row items-center gap-4">
                    <UButton 
                      :icon="isPlaying ? 'i-heroicons-pause' : 'i-heroicons-play'" 
                      color="blue" 
                      variant="solid"
                      class="play-button w-full sm:w-auto"
                      @click="toggleAudio"
                    >
                      {{ isPlaying ? 'Pause' : 'Play' }}
                    </UButton>
                    
                    <div class="flex-1 w-full mt-3 sm:mt-0">
                      <div class="relative pt-1">
                        <div class="flex mb-2 items-center justify-between">
                          <div>
                            <span class="text-xs font-semibold inline-block text-blue-400">
                              {{ formatTime(currentTime) }}
                            </span>
                          </div>
                          <div class="flex items-center gap-2">
                            <!-- Volume control - simplified for mobile -->
                            <div class="hidden sm:flex items-center gap-2">
                              <UButton
                                :icon="volume === 0 ? 'i-heroicons-speaker-x-mark' : 'i-heroicons-speaker-wave'"
                                color="gray"
                                variant="ghost"
                                size="xs"
                                @click="toggleMute"
                              />
                              <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                v-model="volume"
                                @input="setVolume($event.target.value)"
                                class="w-20 accent-blue-500"
                              />
                            </div>
                            <!-- Mobile friendly volume button -->
                            <UButton
                              :icon="volume === 0 ? 'i-heroicons-speaker-x-mark' : 'i-heroicons-speaker-wave'"
                              color="gray"
                              variant="ghost"
                              size="xs"
                              @click="toggleMute"
                              class="sm:hidden"
                            />
                            <span class="text-xs font-semibold inline-block text-blue-400">
                              {{ formatTime(duration) }}
                            </span>
                          </div>
                        </div>
                        <!-- Improved progress bar -->
                        <div 
                          class="overflow-hidden h-2 mb-1 text-xs flex rounded bg-blue-900/30 cursor-pointer relative"
                          @click="seekAudio"
                          ref="progressBar"
                        >
                          <!-- Buffer progress -->
                          <div 
                            class="absolute h-full bg-blue-900/50"
                            :style="{ width: `${bufferProgress}%` }"
                          ></div>
                          <!-- Playback progress -->
                          <div 
                            class="absolute h-full bg-blue-500 transition-all duration-150"
                            :style="{ width: `${(currentTime / duration) * 100}%` }"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Journal entries grid section -->
    <section class="px-4">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div class="flex items-center gap-3">
          <!-- Enhanced section title for desktop -->
          <div>
            <h2 class="text-2xl font-bold mb-0 text-white">Journal Collection</h2>
            <p class="text-gray-50 text-sm hidden md:block mt-1">My thoughts, ideas and experiences captured in time</p>
          </div>
        </div>
        
        <div class="flex flex-col sm:flex-row flex-wrap gap-4 w-full md:w-auto">
          <div class="relative w-full sm:w-48 md:w-64">
            <UInput 
              v-model="searchQuery" 
              placeholder="Search entries" 
              class="w-full pr-10"
              @update:model-value="filterEntries"
            />
            <UIcon name="i-heroicons-magnifying-glass" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
        </div>
      </div>

      <div v-if="loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>

      <div v-else-if="filteredEntries.length === 0" class="empty-state p-8 text-center rounded-xl">
        <UIcon name="i-heroicons-document-text" class="text-4xl text-gray-600 mx-auto mb-4" />
        <h3 class="text-xl font-bold mb-2">No entries found</h3>
        <p class="text-gray-400 mb-4" v-if="searchQuery || tagFilter">Try adjusting your search filters</p>
        <p class="text-gray-400 mb-4" v-else>Start writing your thoughts and experiences</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="entry in filteredEntries"
          :key="entry.id"
          class="journal-card rounded-xl hover:shadow-lg transition-all group cursor-pointer"
          @click="navigateToEntry(entry.id)"
          data-animate="fade"
        >
          <div class="p-6">
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-xl font-bold group-hover:text-blue-400 transition-colors pr-2">
                {{ entry.title }}
              </h3>
              
              <UIcon 
                v-if="entry.is_locked" 
                name="i-heroicons-lock-closed" 
                class="text-blue-400 flex-shrink-0 ml-2" 
                :title="entry.is_locked ? 'This entry is private' : ''"
              />
            </div>
            
            <p class="text-gray-400 text-sm mb-4 line-clamp-3">
              <span v-if="!entry.is_locked">{{ entry.content }}</span>
              <span v-else><em>This content is password protected</em></span>
            </p>
            
            <div class="flex justify-between items-center">
              <div class="flex items-center text-xs text-gray-500">
                <UIcon name="i-heroicons-calendar" class="mr-1" />
                {{ formatEntryDate(entry.created_at) }}
                
                <span v-if="entry.mood" class="ml-2 flex items-center">
                  <UIcon name="i-heroicons-face-smile" class="mr-1" />
                  {{ entry.mood }}
                </span>
              </div>
              
              <UIcon name="i-heroicons-arrow-right" class="text-gray-400 group-hover:text-blue-400 transition-colors" />
            </div>
            
            <div v-if="entry.tags && entry.tags.length > 0" class="mt-4 flex flex-wrap gap-2">
              <span 
                v-for="tag in entry.tags.slice(0, 3)" 
                :key="tag" 
                class="tech-badge text-xs py-1 px-2"
                :class="{'bg-blue-900/30 text-blue-400 border-blue-900': tag.startsWith('name:') || tag.startsWith('password:')}"
              >
                {{ tag }}
              </span>
              <span v-if="entry.tags.length > 3" class="text-xs text-gray-500">+{{ entry.tags.length - 3 }} more</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </UContainer>
</template>

<script setup>
import { ref, computed, onMounted, watch, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useJournal } from '~/composables/useJournal'
import { useScrollAnimation } from '~/composables/useScrollAnimation'

const router = useRouter()
const { fetchEntries } = useJournal()

// Entries data
const entries = ref([])
const loading = ref(true)
const searchQuery = ref('')
const tagFilter = ref(null)

// Audio player state
const audio = ref(null)
const isPlaying = ref(false)
const audioReady = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const volume = ref(0.5)

// Audio visualization
const audioContext = ref(null)
const analyser = ref(null)
const audioSource = ref(null)
const audioData = ref(new Uint8Array(20))
const animationFrame = ref(null)

// Add these to the script section, after the existing refs
const bufferProgress = ref(0)
const progressBar = ref(null)

// Computed properties
const filteredEntries = computed(() => {
  if (!searchQuery.value.trim()) return entries.value
  
  const query = searchQuery.value.toLowerCase()
  return entries.value.filter(entry => 
    entry.title.toLowerCase().includes(query) || 
    entry.content.toLowerCase().includes(query) ||
    (entry.tags && entry.tags.some(tag => tag.toLowerCase().includes(query)))
  )
})

const availableTags = computed(() => {
  const tags = new Set()
  entries.value.forEach(entry => {
    if (entry.tags) {
      entry.tags.forEach(tag => {
        if (!tag.startsWith('password:')) {
          tags.add(tag)
        }
      })
    }
  })
  return Array.from(tags)
})

const uniqueTags = computed(() => {
  const tags = new Set()
  entries.value.forEach(entry => {
    if (entry.tags) {
      entry.tags.forEach(tag => {
        if (!tag.startsWith('password:') && !tag.startsWith('name:')) {
          tags.add(tag)
        }
      })
    }
  })
  return Array.from(tags)
})

const latestEntryDate = computed(() => {
  if (entries.value.length === 0) return 'None'
  return formatEntryDate(entries.value[0].created_at)
})

// Filter entries based on search and tag filter
const filterEntries = () => {
  // No need to filter entries here, it's already done in the computed property
}

// Fetch journal entries
const loadEntries = async () => {
  loading.value = true
  try {
    const data = await fetchEntries()
    entries.value = data.map(entry => ({
      ...entry,
      is_locked: entry.password ? true : false
    }))
  } catch (error) {
    console.error('Error loading entries:', error)
  } finally {
    loading.value = false
  }
}

// Format time for audio player (MM:SS)
const formatTime = (seconds) => {
  if (!seconds) return '00:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

// Format date
const formatEntryDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Navigate to entry detail
const navigateToEntry = (id) => {
  router.push(`/experiments/journal/${id}`)
}

// Initialize Web Audio API
const initAudioVisualizer = () => {
  if (audioContext.value || !audio.value) return
  
  // Check if we're on mobile - don't initialize visualizer on mobile devices
  const isMobile = window.innerWidth < 768
  if (isMobile) return
  
  try {
    audioContext.value = new (window.AudioContext || window.webkitAudioContext)()
    analyser.value = audioContext.value.createAnalyser()
    
    // Improve analyzer settings
    analyser.value.fftSize = 64 // Reduced for smoother visualization
    analyser.value.smoothingTimeConstant = 0.8 // Increased smoothing
    
    audioSource.value = audioContext.value.createMediaElementSource(audio.value)
    
    // Add gain node for better volume control
    const gainNode = audioContext.value.createGain()
    audioSource.value.connect(gainNode)
    gainNode.connect(analyser.value)
    analyser.value.connect(audioContext.value.destination)
    
    // Start visualization
    animateVisualizer()
    
  } catch (error) {
    console.error('Error initializing audio visualizer:', error)
  }
}

// Update visualizer animation
const animateVisualizer = () => {
  if (!analyser.value || !isPlaying.value) return
  
  const bufferLength = analyser.value.frequencyBinCount
  const dataArray = new Uint8Array(bufferLength)
  analyser.value.getByteFrequencyData(dataArray)
  
  const bars = document.querySelectorAll('.visualizer-bar')
  const barCount = Math.min(bars.length, bufferLength)
  
  for (let i = 0; i < barCount; i++) {
    const bar = bars[i]
    if (bar) {
      // Normalize and smooth the values
      const value = dataArray[i] / 255
      const height = Math.max(3, value * 50) // Min height of 3px
      bar.style.height = `${height}px`
      bar.style.opacity = Math.max(0.3, value) // Min opacity of 0.3
    }
  }
  
  animationFrame.value = requestAnimationFrame(animateVisualizer)
}

// Cleanup visualizer
const cleanupVisualizer = () => {
  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value)
    animationFrame.value = null
  }
  
  if (audioSource.value) {
    audioSource.value.disconnect()
    audioSource.value = null
  }
  
  if (analyser.value) {
    analyser.value.disconnect()
    analyser.value = null
  }
  
  if (audioContext.value) {
    audioContext.value.close()
    audioContext.value = null
  }
}

// Setup audio player
const setupAudio = () => {
  try {
    console.log('Setting up audio player')
    
    // Create a new audio element
    audio.value = new Audio()
    audio.value.crossOrigin = "anonymous" // Add this line for CORS
    audio.value.src = 'https://gsbvayifmvdojiqobkcz.supabase.co/storage/v1/object/public/podcast//Recording.m4a'
    audio.value.preload = 'auto'
    audio.value.loop = true
    audio.value.volume = volume.value
    
    // Add event listeners
    audio.value.addEventListener('loadedmetadata', () => {
      duration.value = audio.value.duration
      console.log('Audio duration loaded:', duration.value)
      audioReady.value = true
      initAudioVisualizer() // Initialize visualizer when audio is ready
    })
    
    audio.value.addEventListener('timeupdate', () => {
      currentTime.value = audio.value.currentTime
      console.log('Current time:', currentTime.value)
    })
    
    audio.value.addEventListener('error', (e) => {
      console.error('Audio error:', e)
      audioReady.value = false
      cleanupVisualizer()
    })
    
    audio.value.addEventListener('canplay', () => {
      console.log('Audio can play')
      audioReady.value = true
      initAudioVisualizer()
    })
    
    audio.value.addEventListener('play', () => {
      console.log('Audio playing')
      isPlaying.value = true
      initAudioVisualizer()
    })
    
    audio.value.addEventListener('pause', () => {
      console.log('Audio paused')
      isPlaying.value = false
      cleanupVisualizer()
    })
    
    audio.value.addEventListener('ended', () => {
      console.log('Audio ended')
      isPlaying.value = false
      cleanupVisualizer()
    })
    
    // Start loading the audio
    audio.value.load()
    
    audio.value.addEventListener('progress', () => {
      if (audio.value && audio.value.buffered.length > 0) {
        const buffered = audio.value.buffered.end(audio.value.buffered.length - 1)
        bufferProgress.value = (buffered / audio.value.duration) * 100
      }
    })
    
  } catch (error) {
    console.error('Audio setup error:', error)
    audioReady.value = false
    cleanupVisualizer()
  }
}

// Toggle audio playback
const toggleAudio = () => {
  if (!audio.value || !audioReady.value) return
  
  if (isPlaying.value) {
    audio.value.pause()
    isPlaying.value = false
    cleanupVisualizer()
    console.log('Audio paused')
  } else {
    audio.value.play().then(() => {
      isPlaying.value = true
      initAudioVisualizer()
      console.log('Audio playing')
    }).catch(e => {
      console.error('Error playing audio:', e)
      isPlaying.value = false
      cleanupVisualizer()
    })
  }
}

// Set volume
const setVolume = (newVolume) => {
  if (audio.value) {
    audio.value.volume = newVolume
    console.log('Volume set to:', newVolume)
  }
}

// Add these new methods in the script section
const toggleMute = () => {
  if (!audio.value) return
  if (volume.value > 0) {
    volume.value = 0
  } else {
    volume.value = 0.5
  }
  audio.value.volume = volume.value
}

const seekAudio = (event) => {
  if (!audio.value || !progressBar.value) return
  const rect = progressBar.value.getBoundingClientRect()
  const pos = (event.clientX - rect.left) / rect.width
  audio.value.currentTime = pos * duration.value
}

onMounted(() => {
  loadEntries()
  setupAudio()
  useScrollAnimation()
})

watch(audioReady, (newReady) => {
  console.log('Audio ready state changed:', newReady)
})

watch(duration, (newDuration) => {
  console.log('Audio duration changed:', newDuration)
})

onUnmounted(() => {
  cleanupVisualizer()
})
</script>

<style scoped>
/* Journal index specific background */
.journal-index-bg {
  background-color: #0f172a;
  background-image: 
    radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(56, 189, 248, 0.08) 0%, transparent 50%);
  background-size: 100% 100%, 100% 100%;
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

/* Floating decorative elements */
.floating-elements {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

.floating-circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
}

.circle-1 {
  width: 300px;
  height: 300px;
  top: 10%;
  right: 5%;
  background: linear-gradient(135deg, #3b82f6, #38bdf8);
  animation: float-slow 15s ease-in-out infinite alternate;
}

.circle-2 {
  width: 200px;
  height: 200px;
  bottom: 15%;
  left: 10%;
  background: linear-gradient(135deg, #38bdf8, #3b82f6);
  animation: float-slow 12s ease-in-out infinite alternate-reverse;
}

.floating-square {
  position: absolute;
  width: 100px;
  height: 100px;
  top: 40%;
  left: 15%;
  background: linear-gradient(135deg, #3b82f6, #38bdf8);
  opacity: 0.1;
  transform: rotate(45deg);
  animation: float-slow 20s ease-in-out infinite alternate;
}

.floating-triangle {
  position: absolute;
  bottom: 30%;
  right: 15%;
  width: 0;
  height: 0;
  border-left: 100px solid transparent;
  border-right: 100px solid transparent;
  border-bottom: 150px solid rgba(59, 130, 246, 0.1);
  animation: float-slow 18s ease-in-out infinite alternate-reverse;
}

@keyframes float-slow {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  100% {
    transform: translate(30px, 30px) rotate(5deg);
  }
}

/* Star divider */
.star-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.star-line {
  height: 1px;
  width: 80px;
  background: linear-gradient(to right, transparent, #3b82f6, transparent);
}

/* Featured card styling */
.featured-card {
  background: rgba(17, 25, 40, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.featured-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.5);
}

.card-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
  animation: rotate 20s linear infinite;
  z-index: 0;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Hero section styling */
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

/* Section title decoration */
.section-title-decoration {
  width: 4px;
  height: 24px;
  margin-right: 12px;
  background: linear-gradient(to bottom, #3b82f6, #38bdf8);
  border-radius: 2px;
  position: relative;
}

.section-title-decoration::before {
  content: '';
  position: absolute;
  top: -4px;
  left: -4px;
  width: 12px;
  height: 12px;
  background: #3b82f6;
  border-radius: 50%;
}

/* Journal cards */
.journal-card {
  background: rgba(17, 25, 40, 0.861);
  backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.journal-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(to right, #3b82f6, #38bdf8);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.journal-card:hover::before {
  transform: scaleX(1);
}

.journal-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.5);
}

/* Empty state styling */
.empty-state {
  background: rgba(17, 25, 40, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}

/* Tech badges for tags */
.tech-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  background: rgba(59, 130, 246, 0.15);
  color: rgba(147, 197, 253, 1);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 9999px;
  font-size: 0.8rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.tech-badge:hover {
  background: rgba(59, 130, 246, 0.25);
  transform: translateY(-2px);
}

/* Stat pills */
.stat-pill {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 4px 12px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 9999px;
  color: #94a3b8;
}

.stat-pill:hover {
  background: rgba(59, 130, 246, 0.15);
  border-color: rgba(59, 130, 246, 0.3);
}

/* Create button */
.create-button {
  position: relative;
  overflow: hidden;
}

.create-button::after {
  display: none;
}

/* Play button */
.play-button {
  position: relative;
  z-index: 1;
  overflow: hidden;
  transition: all 0.3s ease;
}

.play-button:hover {
  transform: scale(1.05);
}

.play-button:active {
  transform: scale(0.95);
}

.play-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.play-button:hover::before {
  opacity: 1;
}

/* Visualizer bars */
.visualizer-bar {
  width: 4px;
  background: linear-gradient(to top, #3b82f6, #38bdf8);
  border-radius: 999px;
  transition: height 0.1s ease-out;
  min-height: 3px;
  transform-origin: bottom;
  opacity: 0.7;
  box-shadow: 0 0 8px rgba(59, 130, 246, 0.3);
}

@media (min-width: 640px) {
  .visualizer-bar {
    width: 6px;
  }
}

.visualizer-bar:nth-child(odd) {
  background: linear-gradient(to top, #38bdf8, #3b82f6);
}

/* Smoother animations */
@keyframes visualize {
  0% { transform: scaleY(0.3); }
  50% { transform: scaleY(1); }
  100% { transform: scaleY(0.3); }
}

/* Add styles for the volume slider */
input[type="range"] {
  height: 4px;
  border-radius: 2px;
  appearance: none;
  background: rgba(59, 130, 246, 0.3);
}

input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 12px;
  height: 12px;
  background: #3b82f6;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
}

input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.2);
  background: #60a5fa;
}

/* Make visualizer bars responsive */
@media (max-width: 768px) {
  .visualizer-bar {
    display: none;
  }
  
  .featured-card {
    /* Simplify card on mobile */
    backdrop-filter: blur(5px);
  }
  
  section h2.text-2xl.font-bold {
    position: relative;
    padding-bottom: 0.5rem;
  }
  
  section h2.text-2xl.font-bold::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 2px;
    background: linear-gradient(to right, #3b82f6, transparent);
    border-radius: 2px;
  }
}
</style>