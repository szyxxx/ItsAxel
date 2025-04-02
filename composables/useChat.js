import { ref } from 'vue';

export function useChat() {
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

  return {
    userInput,
    messages,
    isLoading,
    errorMessage,
    chatContainer,
    insertPrompt,
    resetConversation,
    sendMessage,
    scrollToBottom
  };
}