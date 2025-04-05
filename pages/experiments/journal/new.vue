<template>
  <UContainer class="min-h-screen py-12 code-pattern-bg">
    <!-- Background gradient overlay -->
    <div class="bg-gradient-overlay"></div>
    
    <div class="relative z-10">
      <!-- Header section with floating action button -->
      <div class="flex justify-between items-start mb-8">
        <div>
          <UButton 
            icon="i-heroicons-arrow-left" 
            color="gray" 
            variant="ghost" 
            to="/experiments/journal"
            class="mb-4"
          >
            Back to Journal
          </UButton>
          
          <h1 class="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 hero-text">Create New Journal Entry</h1>
          <p class="text-gray-400">Share your thoughts, ideas, and experiences</p>
        </div>
        
        <div class="hidden md:block">
          <div class="floating-orb">
            <div class="orb-inner"></div>
          </div>
        </div>
      </div>
      
      <!-- Main content area with tabs -->
      <div class="glass-card rounded-xl overflow-hidden relative z-10">
        <!-- Tabs navigation -->
        <div class="flex border-b border-blue-900/30">
          <button 
            class="px-6 py-4 text-sm font-medium transition-colors duration-200 relative"
            :class="activeTab === 'write' ? 'text-blue-400' : 'text-gray-400 hover:text-white'"
            @click="switchTab('write')"
          >
            <div class="flex items-center">
              <UIcon name="i-heroicons-pencil" class="mr-2" />
              Write
            </div>
            <div v-if="activeTab === 'write'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
          </button>
          
          <button 
            class="px-6 py-4 text-sm font-medium transition-colors duration-200 relative"
            :class="activeTab === 'settings' ? 'text-blue-400' : 'text-gray-400 hover:text-white'"
            @click="switchTab('settings')"
          >
            <div class="flex items-center">
              <UIcon name="i-heroicons-cog-6-tooth" class="mr-2" />
              Settings
            </div>
            <div v-if="activeTab === 'settings'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
          </button>
          
          <button 
            class="px-6 py-4 text-sm font-medium transition-colors duration-200 relative"
            :class="activeTab === 'preview' ? 'text-blue-400' : 'text-gray-400 hover:text-white'"
            @click="switchTab('preview')"
            :disabled="!content"
          >
            <div class="flex items-center">
              <UIcon name="i-heroicons-eye" class="mr-2" />
              Preview
            </div>
            <div v-if="activeTab === 'preview'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
          </button>
        </div>
        
        <div class="p-6">
          <form class="space-y-6" @submit.prevent="saveEntry">
            <!-- Write tab content -->
            <div v-if="activeTab === 'write'">
              <div class="mb-4">
                <label for="title-input" class="block text-sm font-medium text-gray-200 mb-1">Title</label>
                <input 
                  id="title-input"
                  v-model="title" 
                  placeholder="Enter a title for your journal entry"
                  class="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div v-if="errors.title" class="text-red-500 text-sm mt-1">{{ errors.title }}</div>
              </div>
              
              <div class="mb-4">
                <label for="content-input" class="block text-sm font-medium text-gray-200 mb-1">Content</label>
                <textarea 
                  id="content-input"
                  v-model="content" 
                  placeholder="Write your journal entry here..." 
                  rows="15"
                  class="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                ></textarea>
                <div v-if="errors.content" class="text-red-500 text-sm mt-1">{{ errors.content }}</div>
              </div>
            </div>
            
            <!-- Settings tab content -->
            <div v-if="activeTab === 'settings'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-200 mb-1">Mood (optional)</label>
                <select 
                  v-model="mood" 
                  class="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a mood</option>
                  <option v-for="option in moodOptions" :key="option" :value="option">{{ option }}</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-200 mb-1">Entry Date</label>
                <input 
                  type="datetime-local" 
                  v-model="entryDate" 
                  class="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-200 mb-1">Tags</label>
                <div class="flex items-center mb-2">
                  <input 
                    v-model="tagInput" 
                    placeholder="Add a tag" 
                    class="flex-grow px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-l-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    @keydown.enter.prevent="addTag"
                  />
                  <button 
                    type="button"
                    class="px-3 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                    @click="addTag"
                  >
                    Add
                  </button>
                </div>
                
                <div class="flex flex-wrap gap-2 mt-2">
                  <span 
                    v-for="(tag, index) in tags" 
                    :key="index"
                    class="tech-badge flex items-center"
                  >
                    {{ tag }}
                    <button 
                      type="button"
                      class="ml-2 text-blue-300 hover:text-white focus:outline-none"
                      @click="removeTag(index)"
                    >
                      <UIcon name="i-heroicons-x-mark" class="w-4 h-4" />
                    </button>
                  </span>
                </div>
              </div>
              
              <div class="md:col-span-2">
                <div class="flex items-center mb-4">
                  <input 
                    type="checkbox" 
                    id="is-private" 
                    v-model="isPrivate"
                    class="w-4 h-4 text-blue-600 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
                  />
                  <label for="is-private" class="ml-2 text-sm font-medium text-gray-200">Make this entry private</label>
                </div>
              </div>
              
              <div v-if="isPrivate" class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-200 mb-1">Password Protection</label>
                <input 
                  v-model="password" 
                  type="password" 
                  placeholder="Enter a password to protect this entry"
                  class="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p class="text-sm text-gray-400 mt-1">This password will be required to view the entry</p>
              </div>
            </div>
            
            <!-- Preview tab content -->
            <div v-if="activeTab === 'preview' && content">
              <div class="mb-4">
                <h1 class="text-2xl font-bold text-white">{{ title || 'Untitled Entry' }}</h1>
                <div class="flex items-center text-gray-400 text-sm mt-2">
                  <UIcon name="i-heroicons-calendar" class="mr-1" />
                  <span>{{ formattedDate }}</span>
                  
                  <span v-if="mood" class="ml-4 flex items-center">
                    <UIcon name="i-heroicons-face-smile" class="mr-1" />
                    <span>{{ mood }}</span>
                  </span>
                </div>
                
                <div class="flex flex-wrap gap-2 mt-2">
                  <span 
                    v-for="(tag, index) in tags" 
                    :key="index"
                    class="tech-badge"
                  >
                    {{ tag }}
                  </span>
                </div>
                
                <div v-if="isPrivate" class="flex items-center text-amber-400 text-sm mt-2">
                  <UIcon name="i-heroicons-lock-closed" class="mr-1" />
                  <span>Password protected</span>
                </div>
              </div>
              
              <div class="prose prose-invert max-w-none preview-content">
                <div v-html="renderedContent"></div>
              </div>
            </div>
            
            <!-- Action buttons - always visible -->
            <div class="flex justify-between items-center pt-4 border-t border-blue-900/30">
              <div class="text-sm text-gray-400">
                <span v-if="wordCount > 0">{{ wordCount }} words</span>
              </div>
              
              <div class="flex items-center space-x-2">
                <button 
                  type="button"
                  class="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                  @click="resetForm"
                >
                  Clear
                </button>
                <button 
                  type="submit"
                  class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                  :disabled="saving"
                >
                  <span v-if="saving" class="flex items-center">
                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </span>
                  <span v-else>Save Entry</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useJournal } from '~/composables/useJournal'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

const router = useRouter()
const { createEntry } = useJournal()

// Form state
const title = ref('')
const content = ref('')
const mood = ref('')
const tags = ref([])
const tagInput = ref('')
const isPrivate = ref(false)
const password = ref('')
const activeTab = ref('write')
const saving = ref(false)
const entryDate = ref(new Date().toISOString().slice(0, 16)) // Format: YYYY-MM-DDThh:mm
const wordCount = computed(() => content.value.trim().split(/\s+/).filter(Boolean).length)

// Validation
const errors = ref({})

// Mood options
const moodOptions = [
  'happy', 'sad', 'excited', 'angry', 'anxious', 
  'calm', 'confused', 'content', 'curious', 'disappointed', 
  'frustrated', 'grateful', 'hopeful', 'inspired', 'lonely', 
  'nostalgic', 'optimistic', 'overwhelmed', 'peaceful', 'proud',
  'reflective', 'relaxed', 'stressed', 'surprised', 'tired'
]

// Computed properties
const renderedContent = computed(() => {
  if (!content.value) return ''
  return DOMPurify.sanitize(marked(content.value))
})

const formattedDate = computed(() => {
  const date = new Date(entryDate.value)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
})

// Methods
const switchTab = (tab) => {
  if (tab === 'preview' && !content.value) return
  activeTab.value = tab
}

const addTag = () => {
  if (!tagInput.value.trim()) return
  
  // Don't add duplicate tags
  if (!tags.value.includes(tagInput.value.trim())) {
    tags.value.push(tagInput.value.trim())
  }
  
  tagInput.value = ''
}

const removeTag = (index) => {
  tags.value.splice(index, 1)
}

// Save entry
const saveEntry = async () => {
  // Basic validation
  if (!title.value || !content.value) {
    errors.value = {}
    if (!title.value) errors.value.title = 'Title is required'
    if (!content.value) errors.value.content = 'Content is required'
    return
  }

  saving.value = true

  try {
    // Prepare tags
    const entryTags = [...tags.value]
    
    // Add password if needed
    let entryPassword = null
    if (isPrivate.value && password.value) {
      entryPassword = password.value
    }
    
    // Create entry object
    const entry = {
      title: title.value,
      content: content.value,
      mood: mood.value || null,
      tags: entryTags,
      password: entryPassword,
      created_at: new Date(entryDate.value).toISOString()
    }
    
    // Save to Supabase
    const savedEntry = await createEntry(entry)
    
    if (savedEntry) {
      // Navigate to the journal index page
      router.push('/experiments/journal')
    } else {
      throw new Error('Failed to save entry')
    }
  } catch (error) {
    console.error('Error saving entry:', error)
    // Show error notification
  } finally {
    saving.value = false
  }
}

// Reset form
const resetForm = () => {
  title.value = ''
  content.value = ''
  mood.value = ''
  tags.value = []
  tagInput.value = ''
  isPrivate.value = false
  password.value = ''
  entryDate.value = new Date().toISOString().slice(0, 16)
  activeTab.value = 'write'
  errors.value = {}
}

onMounted(() => {
  // Focus title input on load
  setTimeout(() => {
    document.querySelector('#title-input')?.focus()
  }, 100)
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

.glass-card-inner {
  background: rgba(17, 25, 40, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
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

/* Preview content styling */
.preview-content {
  position: relative;
  min-height: 200px;
  padding: 1rem;
  border-radius: 0.5rem;
  background: rgba(15, 23, 42, 0.3);
}
</style>
