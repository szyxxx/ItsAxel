<template>
  <div class="min-h-screen bg-gray-900 text-white flex flex-col">
    <!-- Header -->
    <header class="bg-gray-800/50 backdrop-blur-md border-b border-gray-700 py-4 px-6 sticky top-0 z-10">
      <div class="max-w-5xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-4">
          <NuxtLink to="/" class="flex items-center gap-2">
            <span class="text-xl font-bold text-blue-500">SZYX.AI</span>
          </NuxtLink>
          <div class="h-5 w-px bg-gray-700"></div>
          <span class="text-sm text-gray-400">Your personal AI assistant</span>
        </div>
        <div class="flex items-center gap-4">
          <NuxtLink to="/" class="text-sm text-gray-400 hover:text-white transition-colors">
            Back to Home
          </NuxtLink>
        </div>
      </div>
    </header>
    <!-- Main Content -->
    <main class="flex-grow container mx-auto max-w-5xl p-4 md:p-6 flex flex-col">
      <!-- Error Message -->
      <div v-if="errorMessage" class="bg-red-900/50 border border-red-700 text-white p-4 rounded-lg mb-6">
        {{ errorMessage }}
      </div>

      <!-- Chat Messages -->
      <div class="flex-grow overflow-y-auto space-y-6 py-4 mb-4">
        <div v-for="(message, index) in messages" :key="index" class="flex" :class="message.role === 'user' ? 'justify-end' : 'justify-start'">
          <div class="max-w-3xl rounded-lg p-4" 
              :class="message.role === 'user' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-800 border border-gray-700'">
            <div v-if="message.isLoading" class="flex items-center space-x-2">
              <span class="animate-bounce inline-block h-2 w-2 bg-white rounded-full"></span>
              <span class="animate-bounce inline-block h-2 w-2 bg-white rounded-full" style="animation-delay: 0.2s"></span>
              <span class="animate-bounce inline-block h-2 w-2 bg-white rounded-full" style="animation-delay: 0.4s"></span>
            </div>
            <div v-else class="whitespace-pre-wrap">{{ message.content }}</div>
          </div>
        </div>
      </div>
      <!-- Input Form -->
      <div class="border-t border-gray-800 pt-4">
        <form @submit.prevent="sendMessage" class="flex gap-4">
          <input
            v-model="userInput"
            type="text"
            placeholder="Send a message to SZYX.AI..."
            class="flex-grow bg-gray-800 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            :disabled="isLoading"
          />
          <button
            type="submit"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            :disabled="isLoading || !userInput.trim()"
          >
            <span v-if="!isLoading">Send</span>
            <span v-else>Sending...</span>
            <svg v-if="!isLoading" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const userInput = ref('');
const messages = ref([]);
const isLoading = ref(false);
const errorMessage = ref('');

const insertPrompt = (prompt) => {
  userInput.value = prompt;
};

const sendMessage = async () => {
  if (!userInput.value.trim() || isLoading.value) return;
  
  const userMessage = userInput.value.trim();
  messages.value.push({ role: 'user', content: userMessage });
  userInput.value = '';
  isLoading.value = true;
  errorMessage.value = '';
  
  try {
    // Add loading message
    const loadingMessage = { role: 'assistant', content: '', isLoading: true };
    messages.value.push(loadingMessage);
    
    console.log("Sending message:", userMessage);
    
    // Call the API
    const response = await $fetch('/api/chat', {
      method: 'POST',
      body: { message: userMessage }
    });
    
    console.log("Received response:", response);
    
    // Remove loading message
    const loadingIndex = messages.value.findIndex(m => m.isLoading);
    if (loadingIndex !== -1) {
      messages.value.splice(loadingIndex, 1);
    }
    
    // Add the AI response
    messages.value.push({ 
      role: 'assistant', 
      content: response.response || "I'm sorry, I couldn't generate a response."
    });
  } catch (error) {
    console.error('Error sending message:', error);
    
    // Remove loading message
    const loadingIndex = messages.value.findIndex(m => m.isLoading);
    if (loadingIndex !== -1) {
      messages.value.splice(loadingIndex, 1);
    }
    
    // Show error message
    errorMessage.value = "Failed to connect to the AI service. Please try again later.";
    
    messages.value.push({ 
      role: 'assistant', 
      content: "I'm sorry, there was an error processing your request. Please try again later."
    });
  } finally {
    isLoading.value = false;
  }
};

// Add a welcome message on page load
onMounted(() => {
  messages.value.push({
    role: 'assistant',
    content: "Hello! I'm Szyx, Axel's personal assistant. How can I help you today? Maybe you want to ask me about Axel's projects, or even tell me you unspoken secrets that you can't tell Axel?",
  });
});
</script>

<style scoped>
/* Custom scrollbar for the messages container */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(31, 41, 55, 0.5);
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(75, 85, 99, 0.8);
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(107, 114, 128, 1);
}
</style>