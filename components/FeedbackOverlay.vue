<template>
  <div>
    <!-- Feedback Button - Optimized for mobile -->
    <button 
      @click="isOpen = true"
      class="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] left-4 sm:left-6 z-40 social-btn github rounded-full p-3 shadow-lg hover:shadow-blue-500/20 translate-y-0"
      aria-label="Open Feedback"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
      </svg>
    </button>

    <!-- Backdrop -->
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] transition-opacity duration-300"
      :class="isOpen ? 'opacity-100' : 'opacity-0'"
      @click="isOpen = false"
    ></div>

    <!-- Sliding Drawer - Mobile optimized -->
    <div
      class="fixed top-0 left-0 h-[100dvh] w-full sm:w-[400px] bg-gray-900 z-[61] shadow-xl transform transition-transform duration-300 ease-in-out overflow-hidden"
      :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="h-full flex flex-col">
        <!-- Header -->
        <div class="flex justify-between items-center p-4 border-b border-gray-800">
          <h1 class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-500">
            Are You Satisfied?
          </h1>
          <button 
            @click="isOpen = false"
            class="p-2 text-gray-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Scrollable content -->
        <div class="flex-1 overflow-y-auto p-4">
          <!-- Success view -->
          <div v-if="feedbackSubmitted" class="text-center py-8">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="text-2xl font-bold text-white mb-2">Thank You!</h3>
            <p class="text-gray-300">Your feedback has been submitted successfully.</p>
            <button @click="resetFeedbackForm" class="mt-6 social-btn github">
              <span>Submit Another Feedback</span>
            </button>
          </div>
          
          <!-- Form view -->
          <form v-else @submit.prevent="submitFeedback" class="space-y-6">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
              <input 
                type="text" 
                id="name" 
                v-model="feedbackForm.name" 
                required
                class="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label for="feedback" class="block text-sm font-medium text-gray-300 mb-2">Your Feedback</label>
              <textarea 
                id="feedback" 
                v-model="feedbackForm.message" 
                required
                rows="4"
                class="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white resize-none"
                placeholder="Share your thoughts about my website or projects..."
              ></textarea>
            </div>
            
            <div>
              <label for="rating" class="block text-sm font-medium text-gray-300 mb-2">Rating</label>
              <div class="flex items-center gap-2">
                <template v-for="star in 5" :key="star">
                  <button 
                    type="button"
                    @click="feedbackForm.rating = star"
                    class="focus:outline-none"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" 
                      :class="[
                        'h-8 w-8 transition-colors duration-200',
                        feedbackForm.rating >= star ? 'text-yellow-400' : 'text-gray-600'
                      ]" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                </template>
              </div>
            </div>
            
            <div class="pt-4">
              <button 
                type="submit" 
                class="w-full social-btn github py-3 text-center justify-center"
                :disabled="isSubmitting"
              >
                <span v-if="isSubmitting">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
                <span v-else>Submit Feedback</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'
import { useSupabaseClient } from '#imports'

const isOpen = ref(false)
const supabase = useSupabaseClient()

const feedbackForm = ref({
  name: '',
  message: '',
  rating: 0
})

const isSubmitting = ref(false)
const feedbackSubmitted = ref(false)

const submitFeedback = async () => {
  if (!feedbackForm.value.name || !feedbackForm.value.message || !feedbackForm.value.rating) {
    alert('Please fill all fields and provide a rating')
    return
  }
  
  isSubmitting.value = true
  
  try {
    const { error } = await supabase.from('feedback').insert({
      name: feedbackForm.value.name,
      message: feedbackForm.value.message,
      rating: feedbackForm.value.rating
    })
    
    if (error) throw error
    
    feedbackSubmitted.value = true
  } catch (error) {
    console.error('Error submitting feedback:', error)
    alert('Failed to submit feedback. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}

const resetFeedbackForm = () => {
  feedbackForm.value = {
    name: '',
    message: '',
    rating: 0
  }
  feedbackSubmitted.value = false
}

// Add locale injection
provide('nuxt-ui.locale-context', {
  locale: ref('en-US'),
  messages: ref({})
})
</script>

<style scoped>
.social-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.social-btn.github {
  background: rgba(24, 24, 27, 0.8);
  color: white;
  border: 1px solid rgba(82, 82, 91, 0.5);
}

.social-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.social-btn.github:hover {
  background: rgba(39, 39, 42, 0.9);
}

/* Add smooth transition for drawer */
.transform {
  will-change: transform;
}
</style>
