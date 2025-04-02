<template>
  <div class="flex animate-fade-in" :class="message.role === 'user' ? 'justify-end' : 'justify-start'">
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
</template>

<script setup>
defineProps({
  message: {
    type: Object,
    required: true
  }
});
</script>