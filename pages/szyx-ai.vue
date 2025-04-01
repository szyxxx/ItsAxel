<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white flex flex-col">
    <!-- Header -->
    <header class="bg-gray-900/80 backdrop-blur-md border-b border-gray-800 py-4 px-6 sticky top-0 z-10">
      <div class="max-w-5xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-4">
          <NuxtLink to="/" class="flex items-center gap-2">
            <div class="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center">
              <span class="font-bold text-white">S</span>
            </div>
            <span class="text-xl font-bold text-blue-400">SZYX<span class="text-white">.AI</span></span>
          </NuxtLink>
          <div class="h-5 w-px bg-gray-700"></div>
          <span class="text-sm text-gray-400 hidden sm:inline">V0.2</span>
        </div>
        <div class="flex items-center gap-4">
          <button @click="resetConversation" class="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span class="hidden sm:inline">New Chat</span>
          </button>
          <NuxtLink to="/" class="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span class="hidden sm:inline">Home</span>
          </NuxtLink>
        </div>
      </div>
    </header>
    
    <!-- Main Content -->
    <main class="flex-grow container mx-auto max-w-5xl p-4 md:p-6 flex flex-col">
      <!-- Welcome and disclaimer message -->
      <div v-if="messages.length <= 1" class="mb-8 space-y-6">
        <div class="text-center">
          <div class="inline-block bg-blue-600 rounded-full p-5 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h1 class="text-2xl font-bold mb-2">Chat with Szyx</h1>
          <p class="text-gray-400 max-w-xl mx-auto">
            Saat ini Szyx hanya mengetahui 30% cerita kehidupan Axel, jadi tolong diwajarin aja ya kalau dia agak ngigo dikit 😉
          </p>
        </div>

        <div>
          <h2 class="text-lg font-medium text-gray-300 mb-3 text-center">Tanyakan sesuatu tentang Axel:</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
            <button 
              @click="insertPrompt('Axel itu orangnya kayak gimana sih?')"
              class="text-left p-4 bg-gray-800/60 hover:bg-gray-700/80 border border-gray-700 rounded-xl transition-all hover:shadow-md hover:-translate-y-0.5 text-sm flex items-center gap-3"
            >
              <span class="bg-indigo-600/30 text-indigo-400 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <span>Axel itu orangnya kayak gimana sih?</span>
            </button>
            <button 
              @click="insertPrompt('Axel lagi ngapain sekarang?')"
              class="text-left p-4 bg-gray-800/60 hover:bg-gray-700/80 border border-gray-700 rounded-xl transition-all hover:shadow-md hover:-translate-y-0.5 text-sm flex items-center gap-3"
            >
              <span class="bg-blue-600/30 text-blue-400 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <span>Axel lagi ngapain sekarang?</span>
            </button>
            <button 
              @click="insertPrompt('Axel sukanya apa?')"
              class="text-left p-4 bg-gray-800/60 hover:bg-gray-700/80 border border-gray-700 rounded-xl transition-all hover:shadow-md hover:-translate-y-0.5 text-sm flex items-center gap-3"
            >
              <span class="bg-red-600/30 text-red-400 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </span>
              <span>Axel sukanya apa?</span>
            </button>
            <button 
              @click="insertPrompt('Lagu favorit Axel?')"
              class="text-left p-4 bg-gray-800/60 hover:bg-gray-700/80 border border-gray-700 rounded-xl transition-all hover:shadow-md hover:-translate-y-0.5 text-sm flex items-center gap-3"
            >
              <span class="bg-green-600/30 text-green-400 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </span>
              <span>Lagu favorit Axel?</span>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Error Message -->
      <div v-if="errorMessage" class="bg-red-900/50 border border-red-700 text-white p-4 rounded-lg mb-6 animate-fade">
        {{ errorMessage }}
      </div>

      <!-- Chat Messages -->
      <div ref="chatContainer" class="flex-grow overflow-y-auto space-y-4 py-4 mb-4 custom-scrollbar">
        <div v-for="(message, index) in messages" :key="index" 
            class="flex animate-fade-in" 
            :class="message.role === 'user' ? 'justify-end' : 'justify-start'">
          <div class="max-w-[85%] md:max-w-2xl rounded-2xl p-4 shadow-md" 
              :class="message.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-gray-800/70 border border-gray-700 rounded-bl-none'">
            <div class="flex items-center mb-2">
              <div class="w-6 h-6 rounded-full flex items-center justify-center mr-2"
                  :class="message.role === 'user' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-blue-400'">
                <span v-if="message.role === 'user'">Y</span>
                <span v-else>S</span>
              </div>
              <div class="text-xs opacity-70">
                {{ message.role === 'user' ? 'You' : 'SZYX.AI' }}
              </div>
            </div>
            <div v-if="message.isLoading" class="flex items-center space-x-2 mt-1">
              <div class="dot-flashing"></div>
            </div>
            <div v-else class="whitespace-pre-wrap text-sm md:text-base">{{ message.content }}</div>
          </div>
        </div>
      </div>
      
      <!-- Input Form -->
      <div class="border-t border-gray-800 pt-4">
        <form @submit.prevent="sendMessage" class="flex gap-2 items-center bg-gray-800/60 rounded-xl border border-gray-700 p-1">
          <input
            v-model="userInput"
            type="text"
            placeholder="Send a message to SZYX.AI..."
            class="flex-grow bg-transparent text-white px-3 py-2 focus:outline-none text-sm md:text-base"
            :disabled="isLoading"
          />
          <button
            type="submit"
            class="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors flex items-center justify-center"
            :class="isLoading || !userInput.trim() ? 'opacity-50 cursor-not-allowed' : 'opacity-100'"
            :disabled="isLoading || !userInput.trim()"
          >
            <span v-if="isLoading" class="loading-spinner"></span>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </form>
        <div class="text-xs text-center text-gray-500 mt-3">
          Saat ini Szyx hanya mengetahui 30% cerita kehidupan Axel, jadi tolong diwajarin aja ya kalau dia agak ngigo dikit 😉
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';

const userInput = ref('');
const messages = ref([]);
const isLoading = ref(false);
const errorMessage = ref('');
const chatContainer = ref(null);

// Maximum number of past messages to include in context (to avoid token limits)
const MAX_CONTEXT_MESSAGES = 10;

const insertPrompt = (prompt) => {
  userInput.value = prompt;
  sendMessage();
};

const resetConversation = () => {
  messages.value = [];
  
  // Add the welcome message again
  messages.value.push({
    role: 'assistant',
    content: "Halo! Aku Szyx, asisten AI Agent buatan Axel. Apa yang kamu mau tahu tentang Axel?"
  });
};

const scrollToBottom = async () => {
  await nextTick();
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};

const sendMessage = async () => {
  if (!userInput.value.trim() || isLoading.value) return;
  
  const userMessage = userInput.value.trim();
  messages.value.push({ role: 'user', content: userMessage });
  userInput.value = '';
  isLoading.value = true;
  errorMessage.value = '';
  
  await scrollToBottom();
  
  try {
    // Add loading message
    const loadingMessage = { role: 'assistant', content: '', isLoading: true };
    messages.value.push(loadingMessage);
    await scrollToBottom();
    
    // Extract conversation history for context
    // We exclude the loading message and limit to last 10 messages to prevent token limit issues
    const conversationHistory = messages.value
      .filter(msg => !msg.isLoading)
      .slice(-MAX_CONTEXT_MESSAGES);
    
    // Call the API with conversation history
    const response = await $fetch('/api/chat', {
      method: 'POST',
      body: { 
        message: userMessage,
        history: conversationHistory
      }
    });
    
    // Remove loading message
    const loadingIndex = messages.value.findIndex(m => m.isLoading);
    if (loadingIndex !== -1) {
      messages.value.splice(loadingIndex, 1);
    }
    
    // Add the AI response
    messages.value.push({ 
      role: 'assistant', 
      content: response.response || "Maaf, saya tidak bisa memberikan respon saat ini."
    });
    
    await scrollToBottom();
  } catch (error) {
    console.error('Error sending message:', error);
    
    // Remove loading message
    const loadingIndex = messages.value.findIndex(m => m.isLoading);
    if (loadingIndex !== -1) {
      messages.value.splice(loadingIndex, 1);
    }
    
    // Show error message
    errorMessage.value = "Gagal terhubung ke layanan AI. Silakan coba lagi nanti.";
    
    messages.value.push({ 
      role: 'assistant', 
      content: "Maaf, terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi nanti."
    });
    
    await scrollToBottom();
  } finally {
    isLoading.value = false;
  }
};

// Add a welcome message on page load
onMounted(() => {
  messages.value.push({
    role: 'assistant',
    content: "Halo! Aku Szyx, asisten AI Agent buatan Axel. Apa yang kamu mau tahu tentang Axel?"
  });
});

// Watch for new messages and scroll to bottom
watch(messages, () => {
  scrollToBottom();
}, { deep: true });
</script>

<style scoped>
/* Custom scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(31, 41, 55, 0.2);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(75, 85, 99, 0.6);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(107, 114, 128, 0.8);
}

.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(75, 85, 99, 0.6) rgba(31, 41, 55, 0.2);
  max-height: calc(100vh - 280px);
}

/* Dot flashing animation for loading */
.dot-flashing {
  position: relative;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #60a5fa;
  color: #60a5fa;
  animation: dot-flashing 1s infinite linear alternate;
  animation-delay: 0.5s;
}
.dot-flashing::before, .dot-flashing::after {
  content: '';
  display: inline-block;
  position: absolute;
  top: 0;
}
.dot-flashing::before {
  left: -12px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #60a5fa;
  color: #60a5fa;
  animation: dot-flashing 1s infinite alternate;
  animation-delay: 0s;
}
.dot-flashing::after {
  left: 12px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #60a5fa;
  color: #60a5fa;
  animation: dot-flashing 1s infinite alternate;
  animation-delay: 1s;
}

@keyframes dot-flashing {
  0% {
    background-color: #60a5fa;
  }
  50%, 100% {
    background-color: rgba(96, 165, 250, 0.2);
  }
}

/* Loading spinner */
.loading-spinner {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Animation classes */
.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade {
  animation: fade 0.3s ease-in-out;
}

@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>