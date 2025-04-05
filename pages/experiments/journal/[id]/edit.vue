<template>
  <UContainer class="min-h-screen py-12 code-pattern-bg">
    <!-- Background gradient overlay -->
    <div class="bg-gradient-overlay"></div>
    
    <div class="relative z-10">
      <!-- Header section -->
      <div class="flex items-start mb-8">
        <div class="w-full">
          <UButton 
            icon="i-heroicons-arrow-left" 
            color="primary" 
            variant="ghost" 
            @click="router.back()"
            class="mb-4"
          >
            Back
          </UButton>
          
          <h1 class="text-2xl md:text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 hero-text">
            Edit Journal Entry
          </h1>
        </div>
      </div>
      
      <!-- Edit form -->
      <div class="glass-card rounded-xl overflow-hidden relative z-10">
        <form @submit.prevent="saveEntry" class="space-y-6 p-6">
          <div>
            <label class="block text-sm font-medium text-gray-200 mb-1">Title</label>
            <input 
              v-model="entry.title" 
              type="text" 
              class="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              required
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-200 mb-1">Content</label>
            <textarea 
              v-model="entry.content" 
              rows="10"
              class="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              required
            ></textarea>
            <p class="text-xs text-gray-400 mt-1">Supports Markdown formatting</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-200 mb-1">Mood</label>
              <select 
                v-model="entry.mood" 
                class="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select mood</option>
                <option v-for="mood in moods" :key="mood" :value="mood">{{ mood }}</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-200 mb-1">Tags</label>
              <input 
                v-model="tagsInput" 
                type="text" 
                class="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                placeholder="Enter tags separated by commas"
              >
              <p class="text-xs text-gray-400 mt-1">E.g. personal, work, ideas</p>
            </div>
          </div>

          <div class="flex items-center">
            <UToggle v-model="entry.is_public" color="blue" />
            <label class="ml-2 text-sm text-gray-300">Make this entry public</label>
          </div>

          <div v-if="!entry.is_public" class="pt-2">
            <label class="block text-sm font-medium text-gray-200 mb-1">Password Protection (optional)</label>
            <input 
              v-model="entry.password" 
              type="password" 
              class="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Leave blank for no password"
            >
            <p class="text-xs text-gray-400 mt-1">Set a password to protect this entry</p>
          </div>

          <div class="flex flex-col md:flex-row gap-4 pt-4 border-t border-gray-700">
            <UButton
              type="submit"
              color="primary"
              icon="i-heroicons-check"
              :loading="isSaving"
              :disabled="isSaving"
            >
              Save Changes
            </UButton>
            
            <UButton
              type="button"
              color="secondary"
              variant="soft"
              icon="i-heroicons-x-mark"
              @click="router.back()"
            >
              Cancel
            </UButton>
            
            <div class="flex-grow"></div>
            
            <UButton
              v-if="entry.id"
              type="button"
              color="error"
              variant="ghost"
              icon="i-heroicons-trash"
              @click="confirmDelete"
            >
              Delete
            </UButton>
          </div>
        </form>
      </div>
    </div>
  </UContainer>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useJournal } from '~/composables/useJournal'

type JournalEntry = {
  id: string
  title: string
  content: string
  mood: string
  tags: string[] | null
  is_public: boolean
  password: string | null
  created_at: string
  updated_at: string
}

type Database = {
  public: {
    Tables: {
      diary_entries: {
        Row: JournalEntry
        Insert: Omit<JournalEntry, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<JournalEntry>
      }
    }
  }
}

const supabase = useSupabaseClient<Database>()
const route = useRoute()
const router = useRouter()
const { fetchEntry } = useJournal()
const isSaving = ref(false)

const entry = ref<JournalEntry>({
  id: '',
  title: '',
  content: '',
  mood: '',
  tags: [],
  is_public: false,
  password: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
})

const moods = ['Happy', 'Sad', 'Excited', 'Angry', 'Neutral', 'Anxious', 'Grateful']
const tagsInput = ref('')

// Load existing entry
onMounted(async () => {
  const id = route.params.id as string
  const loadedEntry = await fetchEntry(id)
  if (loadedEntry) {
    entry.value = loadedEntry as JournalEntry
    tagsInput.value = (loadedEntry as JournalEntry).tags?.join(', ') || ''
  }
})

const saveEntry = async () => {
  isSaving.value = true
  try {
    const { data, error } = await supabase
      .from('diary_entries')
      .update({
        title: entry.value.title,
        content: entry.value.content,
        mood: entry.value.mood,
        tags: tagsInput.value.split(',').map(tag => tag.trim()).filter(Boolean),
        is_public: entry.value.is_public,
        password: entry.value.password,
        updated_at: new Date().toISOString()
      })
      .eq('id', route.params.id)
      .select()
      .single()

    if (error) throw error
    
    // Success, navigate back to entry view
    router.push(`/experiments/journal/${route.params.id}`)
  } catch (error) {
    console.error('Failed to save entry:', error)
    alert('Failed to save entry')
  } finally {
    isSaving.value = false
  }
}

const confirmDelete = async () => {
  if (!confirm('Are you sure you want to delete this journal entry? This action cannot be undone.')) {
    return
  }
  
  try {
    const { error } = await supabase
      .from('diary_entries')
      .delete()
      .eq('id', route.params.id)
      
    if (error) throw error
    
    // Success, navigate back to journal list
    router.push('/experiments/journal')
  } catch (error) {
    console.error('Failed to delete entry:', error)
    alert('Failed to delete entry')
  }
}
</script>

<style scoped>
/* Code pattern background */
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

/* Hero text styling */
.hero-text {
  text-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
}
</style>