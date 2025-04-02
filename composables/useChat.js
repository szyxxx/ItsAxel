import { ref } from 'vue';

export function useChat() {
  const userInput = ref('');
  const messages = ref([]);
  const isLoading = ref(false);
  const errorMessage = ref('');
  const chatContainer = ref(null);

  // Maximum number of past messages to include in context (to avoid token limits)
  const MAX_CONTEXT_MESSAGES = 10;

  // Function to split response into multiple chat bubbles
  const splitResponseIntoBubbles = (response) => {
    // Don't split short responses
    if (response.length < 200) {
      return [response];
    }

    const bubbles = [];
    
    // Split on paragraphs or bullet points
    const segments = response.split(/(?=\n\n|\n- )/g);
    
    // If there are too few segments, return as is
    if (segments.length <= 1) {
      return [response];
    }
    
    // Process segments into logical groups
    let currentBubble = '';
    
    for (const segment of segments) {
      // If adding this segment would make the bubble too long, push current and start new
      if (currentBubble.length + segment.length > 300 && currentBubble.length > 0) {
        bubbles.push(currentBubble.trim());
        currentBubble = segment;
      } 
      // If this segment itself is long enough to be its own bubble and contains complete info
      else if (segment.length > 150 && (segment.includes('- ') || segment.includes('**'))) {
        if (currentBubble.length > 0) {
          bubbles.push(currentBubble.trim());
        }
        bubbles.push(segment.trim());
        currentBubble = '';
      }
      // Otherwise, add to current bubble
      else {
        currentBubble += segment;
      }
    }
    
    // Add any remaining content
    if (currentBubble.trim().length > 0) {
      bubbles.push(currentBubble.trim());
    }
    
    // If we somehow still have no bubbles, just use the original response
    if (bubbles.length === 0) {
      return [response];
    }
    
    return bubbles;
  };

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
      
      // Split response into multiple bubbles
      const responseText = response.response || "Maaf, saya tidak bisa memberikan respon saat ini.";
      const bubbles = splitResponseIntoBubbles(responseText);
      
      // Add small delay between bubbles to simulate typing
      for (let i = 0; i < bubbles.length; i++) {
        // Add typing indicator
        if (i > 0) {
          messages.value.push({ 
            role: 'assistant', 
            content: '',
            isLoading: true
          });
          await scrollToBottom();
          
          // Simulate typing delay
          await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 800));
          
          // Remove typing indicator
          const typingIndex = messages.value.findIndex(m => m.isLoading);
          if (typingIndex !== -1) {
            messages.value.splice(typingIndex, 1);
          }
        }
        
        // Add the bubble content
        messages.value.push({ 
          role: 'assistant', 
          content: bubbles[i]
        });
        
        await scrollToBottom();
      }
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