<template>
  <UContainer class="min-h-screen py-12 code-pattern-bg">
    <!-- Background gradient overlay -->
    <div class="bg-gradient-overlay"></div>
    
    <div class="relative z-10">
      <!-- Header section -->
      <div class="flex flex-col md:flex-row justify-between items-start mb-8">
        <div class="w-full md:w-auto">
          <UButton 
            icon="i-heroicons-arrow-left" 
            color="gray" 
            variant="ghost" 
            to="/experiments/journal"
            class="mb-4"
          >
            Back to Journal
          </UButton>
          
          <h1 v-if="entry" class="text-2xl md:text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 hero-text">
            {{ entry.title }}
          </h1>
        </div>
        
        <div class="hidden md:block">
          <div class="floating-orb">
            <div class="orb-inner"></div>
          </div>
        </div>
      </div>
      
      <!-- Loading state -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
      
      <!-- Password modal -->
      <UModal v-model="showPasswordModal" v-if="entry && entry.password" class="z-50">
        <div class="p-6">
          <h3 class="text-xl font-bold mb-4 text-white">Protected Journal Entry</h3>
          
          <p class="mb-4">This journal entry is protected. Please enter your password to view it.</p>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-200 mb-1">Password</label>
            <input 
              v-model="password" 
              type="password" 
              placeholder="Enter password" 
              class="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              @keyup.enter="checkPassword"
              ref="passwordInput"
              autocomplete="off"
            />
            <div v-if="passwordError" class="text-red-500 text-sm mt-1">{{ passwordError }}</div>
          </div>
          
          <div class="flex justify-end space-x-2">
            <button 
              class="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              @click="router.push('/experiments/journal')"
            >
              Cancel
            </button>
            <button 
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              @click="checkPassword"
            >
              Verify
            </button>
          </div>
        </div>
      </UModal>

      <!-- Journal entry content -->
      <div v-if="entry && (!isLocked || !entry.password)" class="glass-card rounded-xl overflow-hidden relative z-10">
        <!-- Entry metadata header -->
        <div class="p-4 md:p-6 border-b border-blue-900/30">
          <div class="flex flex-wrap items-center gap-2 md:gap-4 text-sm text-gray-400">
            <div class="flex items-center">
              <UIcon name="i-heroicons-calendar" class="mr-2 text-blue-400" />
              <span>{{ formattedDate }}</span>
            </div>
            
            <div v-if="entry.mood" class="flex items-center">
              <UIcon name="i-heroicons-face-smile" class="mr-2 text-blue-400" />
              <span>{{ entry.mood }}</span>
            </div>
            
            <div v-if="entry.password" class="flex items-center text-amber-400">
              <UIcon name="i-heroicons-lock-closed" class="mr-2" />
              <span>Password protected</span>
            </div>
          </div>
          
          <div v-if="entry.tags && entry.tags.length > 0" class="flex flex-wrap gap-2 mt-3 md:mt-4">
            <span 
              v-for="(tag, index) in entry.tags" 
              :key="index"
              class="tech-badge"
            >
              {{ tag }}
            </span>
          </div>
        </div>
        
        <!-- Entry content -->
        <div class="p-4 md:p-6">
          <div class="prose prose-invert max-w-none">
            <div v-html="renderedContent"></div>
          </div>
        </div>
        
        <!-- Entry footer -->
        <div class="p-4 md:p-6 border-t border-blue-900/30 flex flex-col md:flex-row justify-between items-center gap-3">
          <div class="text-xs text-gray-500">
            Entry #{{ id }}
          </div>
          
          <div class="flex items-center space-x-2">
            <UButton 
              icon="i-heroicons-pencil-square" 
              color="blue"
              :to="`/experiments/journal/${id}/edit`"
            >
              Edit
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useJournal } from '~/composables/useJournal'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

const route = useRoute()
const router = useRouter()
const { fetchEntry, checkAccess } = useJournal()

const id = route.params.id
const entry = ref(null)
const loading = ref(true)
const renderedContent = ref('')
const isLocked = ref(false)
const password = ref('')
const showPasswordModal = ref(false)
const passwordError = ref('')
const passwordInput = ref(null)

// Fetch entry data
const fetchEntryData = async () => {
  loading.value = true
  try {
    const data = await fetchEntry(id)
    
    if (!data) {
      router.push('/experiments/journal')
      return
    }
    
    entry.value = data
    
    // Check if entry is password protected
    if (entry.value.password) {
      isLocked.value = true
      showPasswordModal.value = true
    } else {
      renderContent()
    }
  } catch (error) {
    console.error('Error fetching entry:', error)
  } finally {
    loading.value = false
  }
}

// Render markdown content
const renderContent = () => {
  if (!entry.value) return
  
  const sanitizedContent = DOMPurify.sanitize(marked(entry.value.content))
  renderedContent.value = sanitizedContent
}

// Check password
const checkPassword = () => {
  if (!password.value) {
    passwordError.value = 'Please enter a password'
    return
  }
  
  const hasAccess = checkAccess(entry.value, { password: password.value })
  
  if (hasAccess) {
    isLocked.value = false
    showPasswordModal.value = false
    renderContent()
  } else {
    passwordError.value = 'Incorrect password'
  }
}

// Format date
const formattedDate = computed(() => {
  if (!entry.value) return ''
  
  const date = new Date(entry.value.created_at)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

onMounted(() => {
  fetchEntryData()
  
  // Watch for modal opening to focus the password input
  watch(showPasswordModal, (newVal) => {
    if (newVal && passwordInput.value) {
      // Use nextTick to ensure the DOM is updated before focusing
      nextTick(() => {
        passwordInput.value.focus()
      })
    }
  })
})

onUnmounted(() => {
})
</script>

<style>
/* Add any custom styles for content rendering here */
.prose {
  color: #e2e8f0;
}

.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
  color: white;
  margin-top: 1.5em;
  margin-bottom: 0.75em;
}

.prose p {
  margin-bottom: 1.25em;
}

.prose a {
  color: #60a5fa; /* Blue link color to match theme */
  text-decoration: underline;
}

.prose blockquote {
  border-left: 4px solid #3b82f6; /* Blue accent to match theme */
  padding-left: 1rem;
  font-style: italic;
  color: #cbd5e1;
}

.prose ul, .prose ol {
  padding-left: 1.5rem;
  margin-bottom: 1.25em;
}

.prose li {
  margin-bottom: 0.5em;
}

.prose img {
  border-radius: 0.375rem;
  max-width: 100%;
}

.prose code {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 0.2em 0.4em;
  border-radius: 0.25rem;
  font-size: 0.875em;
}

.prose pre {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 1rem;
  border-radius: 0.375rem;
  overflow-x: auto;
  margin-bottom: 1.25em;
}

/* Importing the main site styles */
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

/* Glass card effects */
.glass-card {
  background: rgba(17, 25, 40, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}

/* Hero section styling */
.hero-text {
  text-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
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

/* Floating orb animation */
.floating-orb {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.2), rgba(56, 189, 248, 0.1));
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  animation: float 6s ease-in-out infinite;
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
}

.orb-inner {
  position: absolute;
  width: 60%;
  height: 60%;
  top: 20%;
  left: 20%;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.4), rgba(56, 189, 248, 0.2));
  animation: pulse 4s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(5deg);
  }
  100% {
    transform: translateY(0px) rotate(0deg);
  }
}

@keyframes pulse {
  0% {
    opacity: 0.5;
    transform: scale(0.8);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
  100% {
    opacity: 0.5;
    transform: scale(0.8);
  }
}
</style>
