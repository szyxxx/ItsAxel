<template>
  <div class="message-wrapper" :class="messageWrapperClass">
    <div class="message" :class="messageClass">
      <div class="message-content" :class="{ 'flex-row-reverse': message.role === 'user' }">
        <div v-if="showAvatar" class="assistant-icon">
          <div class="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center">
            <span class="font-bold text-white">S</span>
          </div>
        </div>
        
        <div v-if="message.isLoading" class="typing-indicator">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
        
        <div v-else class="message-text" v-html="renderedMarkdown"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
  html: false,
  breaks: true,
  linkify: true,
  typographer: true
});

const props = defineProps({
  message: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    default: 0
  },
  messages: {
    type: Array,
    default: () => []
  }
});

// Determine if this message should show the avatar
// Only show avatar if it's the first message in a sequence from the assistant
const showAvatar = computed(() => {
  if (props.message.role !== 'assistant') return false;
  
  // For first message, always show avatar
  if (props.index === 0) return true;
  
  // Otherwise, show avatar only if previous message was not from assistant
  const prevMessage = props.messages[props.index - 1];
  return prevMessage && prevMessage.role !== 'assistant';
});

// Calculate classes based on message position in sequence
const messageWrapperClass = computed(() => {
  const classes = [props.message.role === 'user' ? 'justify-end' : 'justify-start'];
  
  if (props.message.isLoading) {
    classes.push('typing-wrapper');
  }
  
  return classes;
});

const messageClass = computed(() => {
  const isUser = props.message.role === 'user';
  const classes = [isUser ? 'user-message' : 'assistant-message'];
  
  if (props.message.isLoading) {
    return [...classes, 'loading-bubble'];
  }
  
  // If it's the assistant and there are adjacent messages, adjust the bubble shape
  if (!isUser && props.index > 0 && props.index < props.messages.length - 1) {
    const prevMessage = props.messages[props.index - 1];
    const nextMessage = props.messages[props.index + 1];
    
    const isPrevFromSameRole = prevMessage && prevMessage.role === props.message.role;
    const isNextFromSameRole = nextMessage && nextMessage.role === props.message.role;
    
    if (isPrevFromSameRole && isNextFromSameRole) {
      classes.push('middle-bubble');
    } else if (isPrevFromSameRole) {
      classes.push('last-bubble');
    } else if (isNextFromSameRole) {
      classes.push('first-bubble');
    }
  }
  
  return classes;
});

// Process content and render markdown
const renderedMarkdown = computed(() => {
  if (!props.message.content) return '';
  
  let content = props.message.content;
  
  // Replace HTML tags with markdown equivalents
  content = content
    .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
    .replace(/<em>(.*?)<\/em>/g, '*$1*')
    
    // Fix lists that may have improper formatting
    .replace(/^[ \t]*•[ \t]*/gm, '- ')
    .replace(/^[ \t]*\*[ \t]*/gm, '- ')
    
    // Fix common formatting issues from AI responses
    .replace(/\*(.*?)\*/g, (match, inner) => {
      // If it looks like it's being used for actions, remove the asterisks
      if (inner.includes(' ') && inner.length > 10 && !inner.includes('*')) {
        return inner;
      }
      // Otherwise keep the formatting
      return match;
    });
  
  return md.render(content);
});
</script>

<style scoped>
/* Message wrapper for proper alignment */
.message-wrapper {
  display: flex;
  width: 100%;
  margin-bottom: 0.5rem;
}

/* Typing indicator wrapper */
.typing-wrapper {
  margin-bottom: 0.25rem;
}

/* Message container styles */
.message {
  display: inline-block;
  padding: 0.75rem;
  border-radius: 1rem;
  max-width: 80%;
  min-width: 0; /* Required for text overflow to work */
}

.user-message {
  background-color: rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-bottom-right-radius: 0.25rem;
}

.assistant-message {
  background-color: rgba(55, 65, 81, 0.3);
  border: 1px solid rgba(75, 85, 99, 0.3);
  border-bottom-left-radius: 0.25rem;
}

/* Bubble shapes for message sequences */
.first-bubble {
  border-bottom-left-radius: 0.5rem;
}

.middle-bubble {
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
}

.last-bubble {
  border-top-left-radius: 0.5rem;
  margin-top: 0.2rem;
}

.message-content {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}

.assistant-icon {
  flex-shrink: 0;
  margin-right: 0.5rem;
}

.message-text {
  flex: 1;
  min-width: 0;
  overflow-wrap: break-word;
  word-break: break-word;
}

/* Loading bubble (typing indicator) */
.loading-bubble {
  padding: 0.5rem 1rem;
  background-color: rgba(55, 65, 81, 0.2);
  border: 1px solid rgba(75, 85, 99, 0.2);
}

.typing-indicator {
  display: flex;
  align-items: center;
  height: 1.5rem;
}

.dot {
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: #a0aec0;
  margin: 0 0.15rem;
  animation: bounce 1.4s infinite ease-in-out;
}

.dot:nth-child(1) {
  animation-delay: -0.32s;
}

.dot:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

/* Markdown styles */
:deep(.message-text) {
  line-height: 1.6;
}

:deep(.message-text p) {
  margin-bottom: 0.75rem;
}

:deep(.message-text p:last-child) {
  margin-bottom: 0;
}

:deep(.message-text ul) {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin: 0.75rem 0;
}

:deep(.message-text ol) {
  list-style-type: decimal;
  padding-left: 1.5rem;
  margin: 0.75rem 0;
}

:deep(.message-text li) {
  margin-bottom: 0.25rem;
}

:deep(.message-text strong) {
  font-weight: 600;
}

:deep(.message-text em) {
  font-style: italic;
}

:deep(.message-text h1, .message-text h2, .message-text h3, .message-text h4) {
  font-weight: bold;
  margin: 1rem 0 0.5rem 0;
}

:deep(.message-text h1) {
  font-size: 1.5rem;
}

:deep(.message-text h2) {
  font-size: 1.25rem;
}

:deep(.message-text h3) {
  font-size: 1.125rem;
}

:deep(.message-text pre) {
  background-color: rgba(30, 41, 59, 0.5);
  padding: 0.75rem;
  border-radius: 0.375rem;
  margin: 0.75rem 0;
  overflow-x: auto;
}

:deep(.message-text code) {
  font-family: monospace;
  background-color: rgba(30, 41, 59, 0.5);
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.9em;
}

:deep(.message-text pre code) {
  background-color: transparent;
  padding: 0;
}
</style>