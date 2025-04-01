<template>
  <div class="min-h-screen">
    <SiteNavigation />
    
    <!-- Hero Section -->
    <section id="hero" class="min-h-screen flex flex-col items-center justify-center">
      <div data-animate="fade" class="text-center">
        <h1 class="text-6xl font-bold mb-4">Hi! <span class="wave">👋</span></h1>
        <h2 class="text-5xl font-bold">This is Axel</h2>
        <p class="mt-6 text-xl text-gray-400">Computer Engineering Student & Software Developer</p>
      </div>
    </section>
    
    <!-- About Section -->
    <section id="about" class="py-24 min-h-screen">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div class="lg:col-span-2">
            <h1 data-animate="slide-up" class="text-4xl font-bold mb-8">About Me</h1>
            
            <div data-animate="slide-up" class="text-xl">
              <p class="mb-6">
                I'm a passionate <span class="text-red-500">Computer Engineering</span> student at 
                <span class="text-red-500">Telkom University</span> with a strong inclination towards 
                <span class="text-red-500">Software Development</span>.
              </p>
              
              <p class="mb-6">
                My journey in the world of coding has been fueled by a curiosity to create innovative 
                solutions and a desire to make a positive impact.
              </p>
              
              <p class="mb-6">
                I'm excited to continue learning and growing as a software developer, and I'm always 
                open to new opportunities and collaborations. Let's connect and create something amazing together!
              </p>
              
              <div class="flex space-x-6 mt-10">
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" 
                   class="bg-white rounded-full p-3 transition-transform hover:scale-110">
                  <!-- GitHub icon placeholder -->
                </a>
                <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer" 
                   class="bg-white rounded-full p-3 transition-transform hover:scale-110">
                  <!-- Instagram icon placeholder -->
                </a>
                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" 
                   class="bg-white rounded-full p-3 transition-transform hover:scale-110">
                  <!-- LinkedIn icon placeholder -->
                </a>
              </div>
            </div>
          </div>
          
          <div data-animate="slide-left" class="lg:col-span-1">
            <div class="bg-gray-900 rounded-lg p-6">
              <h2 class="text-2xl font-bold mb-6">Trivia of Myself</h2>
              
              <div class="mb-6">
                <h3 class="text-lg font-medium mb-3">My Fav Songs</h3>
                <div class="bg-blue-600 rounded-lg overflow-hidden">
                  <iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/2LlOeW5rVcvl3QcPNPcDus?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy">
                  </iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Career Section -->
    <section id="career" class="py-24 min-h-screen">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 data-animate="fade" class="text-4xl font-bold text-center mb-16">
          My Computer Engineering Journey
        </h1>
        
        <div class="relative">
          <!-- Timeline line -->
          <div class="absolute left-16 top-0 bottom-0 w-0.5 bg-gray-700"></div>
          
          <div class="space-y-24">
            <!-- C Language -->
            <div data-animate="slide-right" class="flex">
              <div class="flex-shrink-0 w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center mr-8">
                <span class="text-6xl font-bold text-blue-500">C</span>
              </div>
              
              <div class="pt-6">
                <h2 class="text-3xl font-bold mb-4">First Programming Language : C Language</h2>
                <p class="text-lg text-gray-300 leading-relaxed">
                  My journey in Computer Engineering began with a fascination for the digital world. 
                  I was drawn to the endless possibilities and the power of problem-solving that 
                  programming offered. My first steps into this exciting field were with the C language. 
                  Learning C provided a strong foundation in computer science fundamentals, helping me 
                  understand the building blocks of programming.
                </p>
              </div>
            </div>
            
            <!-- Python -->
            <div data-animate="slide-right" class="flex">
              <div class="flex-shrink-0 w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center mr-8">
                <span class="text-6xl font-bold text-blue-500">Py</span>
              </div>
              
              <div class="pt-6">
                <h2 class="text-3xl font-bold mb-4">Exploring Data Science with Python</h2>
                <p class="text-lg text-gray-300 leading-relaxed">
                  After mastering the basics with C, I discovered Python and its powerful ecosystem for 
                  data science and machine learning. Python's simplicity and versatility allowed me to 
                  quickly prototype ideas and build data-driven applications. I explored libraries like 
                  NumPy, Pandas, and TensorFlow, which opened up new possibilities in data analysis and 
                  artificial intelligence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useScrollAnimation } from '~/composables/useScrollAnimation'

const userInput = ref('')
const messages = ref([])

// Initialize scroll animations
onMounted(() => {
  useScrollAnimation()
})

// Smooth scroll for navigation
onMounted(() => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault()
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      })
    })
  })
})

const sendMessage = async () => {
  if (!userInput.value.trim()) return
  
  const userMessage = userInput.value.trim()
  messages.value.push({ role: 'user', content: userMessage })
  userInput.value = ''
  
  try {
    // Add loading message
    const loadingIndex = messages.value.length;
    messages.value.push({ role: 'assistant', content: "Thinking...", isLoading: true })
    
    // Call the API
    const response = await $fetch('/api/chat', {
      method: 'POST',
      body: { message: userMessage }
    })
    
    // Remove loading message and add response
    if (messages.value[loadingIndex].isLoading) {
      messages.value.splice(loadingIndex, 1);
    }
    
    messages.value.push({ 
      role: 'assistant', 
      content: response.response || "I'm sorry, I couldn't generate a response."
    })
  } catch (error) {
    console.error('Error sending message:', error)
    messages.value.push({ 
      role: 'assistant', 
      content: "I'm sorry, there was an error processing your request. Please try again later."
    })
  }
}
</script>

<style scoped>
.wave {
  display: inline-block;
  animation: wave 1.5s infinite;
  transform-origin: 70% 70%;
}

@keyframes wave {
  0% { transform: rotate(0deg); }
  10% { transform: rotate(14deg); }
  20% { transform: rotate(-8deg); }
  30% { transform: rotate(14deg); }
  40% { transform: rotate(-4deg); }
  50% { transform: rotate(10deg); }
  60% { transform: rotate(0deg); }
  100% { transform: rotate(0deg); }
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px;
}

section {
  scroll-margin-top: 80px;
}
</style>