import { ref, computed } from 'vue'
import { useSupabaseClient } from '#imports'

// Mock journal composable
export const useMockJournal = () => {
  // Mock data for journal entries
  const mockEntries = ref([
    {
      id: '1',
      title: 'First Journal Entry',
      content: 'This is my first journal entry. I\'m excited to start documenting my thoughts and experiences here.',
      created_at: new Date('2025-04-01').toISOString(),
      tags: ['personal', 'first'],
      mood: 'excited',
      is_locked: false,
      user_id: '00000000-0000-0000-0000-000000000000'
    },
    {
      id: '2',
      title: 'Learning Vue.js',
      content: 'Today I spent some time learning Vue.js and Nuxt. The reactivity system is really intuitive and I\'m enjoying the development experience.',
      created_at: new Date('2025-04-03').toISOString(),
      tags: ['coding', 'learning', 'vue'],
      mood: 'inspired',
      is_locked: false,
      user_id: '00000000-0000-0000-0000-000000000000'
    },
    {
      id: '3',
      title: 'Private Thoughts',
      content: 'This is a private journal entry that should only be visible to specific people.',
      created_at: new Date('2025-04-04').toISOString(),
      tags: ['personal', 'private', 'name:john'],
      mood: 'reflective',
      is_locked: true,
      user_id: '00000000-0000-0000-0000-000000000000'
    }
  ])

  // Get all entries
  const getEntries = () => {
    return mockEntries.value
  }

  // Get entry by ID
  const getEntryById = (id) => {
    return mockEntries.value.find(entry => entry.id === id)
  }

  // Create a new entry
  const createEntry = (entry) => {
    const newEntry = {
      ...entry,
      id: (mockEntries.value.length + 1).toString(),
      created_at: new Date().toISOString(),
      user_id: '00000000-0000-0000-0000-000000000000',
      is_locked: entry.tags?.some(tag => tag.startsWith('name:')) || false
    }
    
    mockEntries.value.unshift(newEntry)
    return newEntry
  }

  return {
    getEntries,
    getEntryById,
    createEntry
  }
}

export function useJournal() {
  const supabase = useSupabaseClient()
  const entries = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Fetch all journal entries
  const fetchEntries = async () => {
    loading.value = true
    error.value = null
    
    try {
      const { data, error: supabaseError } = await supabase
        .from('diary_entries')
        .select('id, title, content, created_at, tags, mood, is_public, password')
        .order('created_at', { ascending: false })
      
      if (supabaseError) throw supabaseError
      
      entries.value = data || []
      return data
    } catch (err) {
      console.error('Error fetching journal entries:', err)
      error.value = err.message || 'Failed to fetch journal entries'
      return []
    } finally {
      loading.value = false
    }
  }

  // Fetch a single journal entry by ID
  const fetchEntry = async (id) => {
    loading.value = true
    error.value = null
    
    try {
      const { data, error: supabaseError } = await supabase
        .from('diary_entries')
        .select('id, title, content, created_at, tags, mood, is_public, password')
        .eq('id', id)
        .single()
      
      if (supabaseError) throw supabaseError
      
      return data
    } catch (err) {
      console.error('Error fetching journal entry:', err)
      error.value = err.message || 'Failed to fetch journal entry'
      return null
    } finally {
      loading.value = false
    }
  }

  // Create a new journal entry
  const createEntry = async (entry) => {
    loading.value = true
    error.value = null
    
    try {
      // Extract password if it exists in tags
      let password = null
      let entryTags = [...(entry.tags || [])]
      
      // Check if we have a password tag
      const passwordTagIndex = entryTags.findIndex(tag => tag.startsWith('password:'))
      if (passwordTagIndex !== -1) {
        const passwordTag = entryTags[passwordTagIndex]
        password = passwordTag.split(':')[1]
        // Remove password from tags
        entryTags.splice(passwordTagIndex, 1)
      }
      
      // Check if we have name tags
      const hasNameTags = entryTags.some(tag => tag.startsWith('name:'))
      
      console.log('Creating entry')
      console.log('Entry data:', entry)
      
      const { data, error: supabaseError } = await supabase
        .from('diary_entries')
        .insert({
          title: entry.title,
          content: entry.content,
          mood: entry.mood || null,
          tags: entryTags,
          is_public: !hasNameTags,
          password: entry.password || password,
          created_at: entry.created_at || undefined
        })
        .select()
      
      if (supabaseError) {
        console.error('Supabase error:', supabaseError)
        throw supabaseError
      }
      
      if (!data || data.length === 0) {
        console.error('No data returned from insert')
        throw new Error('No data returned from insert')
      }
      
      console.log('Entry created successfully:', data[0])
      return data[0]
    } catch (err) {
      console.error('Error creating journal entry:', err)
      error.value = err.message || 'Failed to create journal entry'
      return null
    } finally {
      loading.value = false
    }
  }

  // Check access to a protected entry
  const checkAccess = (entry, { password }) => {
    if (!entry) return false
    
    // If entry has no password, it's accessible
    if (!entry.password) return true
    
    // Check if password matches
    return password === entry.password
  }

  // Format date for display
  const formatDate = (dateString, format = 'short') => {
    if (!dateString) return ''
    
    const date = new Date(dateString)
    
    if (format === 'short') {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    } else if (format === 'long') {
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
    
    return date.toLocaleDateString()
  }

  return {
    entries,
    loading,
    error,
    fetchEntries,
    fetchEntry,
    createEntry,
    checkAccess,
    formatDate
  }
}
