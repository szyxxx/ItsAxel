import { ref, watch, nextTick } from 'vue'

export function useChatMessages(initialWelcomeMessage = null) {
  const userInput = ref('')
  const messages = ref([])
  const isLoading = ref(false)
  const errorMessage = ref('')
  const chatContainer = ref(null)
  
  // Maximum number of past messages to include in context (to avoid token limits)
  const MAX_CONTEXT_MESSAGES = 10

  // Initialize with welcome message if provided
  if (initialWelcomeMessage) {
    onMounted(() => {
      messages.value.push({
        role: 'assistant',
        content: initialWelcomeMessage
      })
    })
  }

  const scrollToBottom = async () => {
    await nextTick()
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  }

  const sendMessage = async (customPrompt = null) => {
    const messageToSend = customPrompt || userInput.value.trim()
    
    if (!messageToSend || isLoading.value) return
    
    messages.value.push({ role: 'user', content: messageToSend })
    userInput.value = ''
    isLoading.value = true
    errorMessage.value = ''
    
    await scrollToBottom()
    
    try {
      // Add loading message
      const loadingMessage = { role: 'assistant', content: '', isLoading: true }
      messages.value.push(loadingMessage)
      await scrollToBottom()
      
      // Extract conversation history for context
      const conversationHistory = messages.value
        .filter(msg => !msg.isLoading)
        .slice(-MAX_CONTEXT_MESSAGES)
      
      // Call the API with conversation history
      const response = await $fetch('/api/chat', {
        method: 'POST',
        body: { 
          message: messageToSend,
          history: conversationHistory
        }
      })
      
      // Remove loading message
      const loadingIndex = messages.value.findIndex(m => m.isLoading)
      if (loadingIndex !== -1) {
        messages.value.splice(loadingIndex, 1)
      }
      
      // Add the AI response
      messages.value.push({ 
        role: 'assistant', 
        content: response.response || "Sorry, I couldn't generate a response."
      })
      
      await scrollToBottom()
    } catch (error) {
      console.error('Error sending message:', error)
      
      // Remove loading message
      const loadingIndex = messages.value.findIndex(m => m.isLoading)
      if (loadingIndex !== -1) {
        messages.value.splice(loadingIndex, 1)
      }
      
      // Show error message
      errorMessage.value = "Failed to connect to the AI service. Please try again later."
      
      messages.value.push({ 
        role: 'assistant', 
        content: "Sorry, there was an error processing your request. Please try again later."
      })
      
      await scrollToBottom()
    } finally {
      isLoading.value = false
    }
  }

  const insertPrompt = (prompt) => {
    userInput.value = prompt
    sendMessage(prompt)
  }

  const resetConversation = (welcomeMessage) => {
    messages.value = []
    
    // Add the welcome message again if provided
    if (welcomeMessage) {
      messages.value.push({
        role: 'assistant',
        content: welcomeMessage
      })
    }
  }

  // Watch for new messages and scroll to bottom
  watch(messages, () => {
    scrollToBottom()
  }, { deep: true })

  return {
    userInput,
    messages,
    isLoading,
    errorMessage,
    chatContainer,
    sendMessage,
    insertPrompt,
    resetConversation
  }
}