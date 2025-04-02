<template>
  <div class="min-h-screen pt-16 md:pt-0 code-pattern-bg">
    <div class="bg-gradient-overlay"></div>
    <SiteNavigation />
    
    <!-- Hero Section -->
    <section id="hero" class="min-h-[110vh] flex flex-col items-center justify-center px-4 relative z-10">
      <div data-animate="fade" class="text-center">
        <div class="inline-block relative mb-2">
          <div class="hero-glow absolute -inset-10 rounded-full blur-3xl opacity-30 bg-blue-500"></div>
          <h1 class="text-4xl md:text-7xl font-bold mb-4 hero-text relative">Hi! <span class="wave">👋</span></h1>
        </div>
        <!-- Animated text with typewriter effect -->
        <h2 class="text-3xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text h-[3rem] md:h-[4.5rem] flex items-center justify-center">
          <span class="animated-text">{{ currentText }}</span>
        </h2>
        <p class="mt-6 text-lg md:text-xl text-gray-300">Computer Engineering Student & Software Developer</p>
        
        <div class="mt-10">
          <a href="#about" class="group animate-bounce inline-flex items-center justify-center">
            <div class="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full p-3 group-hover:bg-blue-600/50 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </section>
    
    <!-- About Section -->
    <section id="about" class="my-4 md:py-24 min-h-screen relative z-10">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          <div class="lg:col-span-2">
            <div data-animate="slide-up" class="glass-card p-8 rounded-2xl mb-8">
              <h1 class="text-3xl md:text-4xl font-bold mb-6 md:mb-8 relative">
                <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">About Me</span>
                <div class="absolute h-1 w-24 bg-blue-500 bottom-0 left-0"></div>
              </h1>
              
              <div class="text-lg md:text-xl">
                <p class="mb-4 md:mb-6">
                  I'm a passionate <span class="text-blue-400">Computer Engineering</span> student at 
                  <span class="text-blue-400">Telkom University</span> with a strong inclination towards 
                  <span class="text-blue-400">Software Development</span>.
                </p>
                
                <p class="mb-4 md:mb-6">
                  My journey in the world of coding has been fueled by a curiosity to create innovative 
                  solutions and a desire to make a positive impact.
                </p>
                
                <p class="mb-4 md:mb-6">
                  I'm excited to continue learning and growing as a software developer, and I'm always 
                  open to new opportunities and collaborations. Let's connect and create something amazing together!
                </p>
                
                <div class="flex flex-wrap gap-4 mt-8 md:mt-10">
                  <a href="https://github.com/szyxxx" target="_blank" rel="noopener noreferrer" 
                     class="social-btn github">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span>GitHub</span>
                  </a>
                  <a href="https://instagram.com/axelldvid" target="_blank" rel="noopener noreferrer" 
                     class="social-btn instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span>Instagram</span>
                  </a>
                  <a href="https://linkedin.com/in/axelldavid" target="_blank" rel="noopener noreferrer" 
                     class="social-btn linkedin">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div data-animate="slide-left" class="lg:col-span-1 mt-8 lg:mt-0">
            <div class="glass-card p-6 rounded-2xl">
              <h2 class="text-xl md:text-2xl font-bold mb-4 md:mb-6 relative">
                <span class="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">Trivia of Myself</span>
                <div class="absolute h-1 w-16 bg-purple-500 bottom-0 left-0"></div>
              </h2>
              
              <div class="mb-6">
                <h3 class="text-base md:text-lg font-medium mb-3 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                  My Fav Songs
                </h3>
                <div class="rounded-lg overflow-hidden neon-border">
                  <iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/2LlOeW5rVcvl3QcPNPcDus?utm_source=generator" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy">
                  </iframe>
                </div>
              </div>

              <!-- Tech Stack Section -->
              <div class="mt-8">
                <h3 class="text-base md:text-lg font-medium mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Tech Stack
                </h3>
                <div class="flex flex-wrap gap-2">
                  <span class="tech-badge">C</span>
                  <span class="tech-badge">Python</span>
                  <span class="tech-badge">Laravel</span>
                  <span class="tech-badge">Nuxt</span>
                  <span class="tech-badge">Arduino</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Career Section -->
    <section id="career" class="py-16 md:py-24 min-h-screen relative z-10">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 data-animate="fade" class="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
          My Computer Engineering Journey
        </h1>
        
        <div class="relative">
          <!-- Timeline line - centered on mobile, left-aligned on larger screens -->
          <div class="absolute left-1/2 md:left-16 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 transform -translate-x-1/2 md:-translate-x-0 z-0"></div>
          
          <div class="space-y-16 md:space-y-24">
            <!-- C Language -->
            <div data-animate="slide-right" class="flex flex-col md:flex-row relative z-10">
              <div class="flex-shrink-0 w-20 h-20 md:w-32 md:h-32 mx-auto md:mx-0 border-4 border-gray-800 rounded-full flex items-center justify-center mb-4 md:mb-0 md:mr-8 shadow-xl timeline-node">
                <span class="text-3xl md:text-6xl font-bold text-blue-400">C</span>
              </div>
              
              <div class="text-center md:text-left md:pt-6 glass-card rounded-2xl p-4 md:p-6">
                <h2 class="text-2xl md:text-3xl font-bold mb-3 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">First Programming Language: C</h2>
                <p class="text-base md:text-lg text-gray-300 leading-relaxed">
                  My journey in Computer Engineering began with a fascination for the digital world. 
                  I was drawn to the endless possibilities and the power of problem-solving that 
                  programming offered. My first steps into this exciting field were with the C language. 
                  Learning C provided a strong foundation in computer science fundamentals, helping me 
                  understand the building blocks of programming.
                </p>
              </div>
            </div>
            
            <!-- Python -->
            <div data-animate="slide-right" class="flex flex-col md:flex-row relative z-10">
              <div class="flex-shrink-0 w-20 h-20 md:w-32 md:h-32 mx-auto md:mx-0 border-4 border-gray-800 rounded-full flex items-center justify-center mb-4 md:mb-0 md:mr-8 shadow-xl timeline-node">
                <span class="text-3xl md:text-6xl font-bold text-blue-400">Py</span>
              </div>
              
              <div class="text-center md:text-left md:pt-6 glass-card rounded-2xl p-4 md:p-6">
                <h2 class="text-2xl md:text-3xl font-bold mb-3 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">Exploring Data Science with Python</h2>
                <p class="text-base md:text-lg text-gray-300 leading-relaxed">
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
import { ref, onMounted, onUnmounted } from 'vue'
import { useScrollAnimation } from '~/composables/useScrollAnimation'

// Text rotation variables
const textOptions = [
  'This is Axel',
  'I do code',
  'and messing with AI',
  'and some gaming',
  'and you\'ll find me singing',
  'anyway I\'m Axel'
];
const currentText = ref(textOptions[0]);
let currentIndex = 0;
let textInterval;

// Initialize text rotation
onMounted(() => {
  textInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % textOptions.length;
    fadeOut();
    setTimeout(() => {
      currentText.value = textOptions[currentIndex];
      fadeIn();
    }, 500); // Half of transition time for fade out/in
  }, 3500); // Change text every 2.5 seconds
});

// Clean up interval on component unmount
onUnmounted(() => {
  clearInterval(textInterval);
});

// Text fade helpers
function fadeOut() {
  const element = document.querySelector('.animated-text');
  if (element) element.classList.add('fade-out');
}

function fadeIn() {
  const element = document.querySelector('.animated-text');
  if (element) {
    element.classList.remove('fade-out');
    element.classList.add('fade-in');
    setTimeout(() => {
      element.classList.remove('fade-in');
    }, 500);
  }
}

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

const userInput = ref('')
const messages = ref([])

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
/* Add these new styles for the animated text */
.animated-text {
  display: inline-block;
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-out {
  opacity: 0;
  transform: translateY(10px);
}

.fade-in {
  opacity: 1;
  transform: translateY(0);
  animation: text-shimmer 2s ease;
}

@keyframes text-shimmer {
  0% {
    background-position: -100% 50%;
  }
  100% {
    background-position: 200% 50%;
  }
}

/* Rest of your styles remain the same */
.code-pattern-bg {
  background-color: #0f172a;
  background-image: 
    radial-gradient(rgba(120, 120, 255, 0.04) 2px, transparent 2px),
    radial-gradient(rgba(120, 120, 255, 0.03) 1.5px, transparent 1.5px);
  background-size: 50px 50px;
  background-position: 0 0, 25px 25px;
  position: relative;
}

.bg-gradient-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at top right, rgba(15, 23, 42, 0.1), #0f172a 70%);
  z-index: 0;
  pointer-events: none;
}

/* Glass card effects */
.glass-card {
  background: rgba(17, 25, 40, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}

/* Hero section styling */
.hero-text {
  text-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
}

.hero-glow {
  animation: glow 4s ease-in-out infinite alternate;
}

@keyframes glow {
  0% {
    opacity: 0.2;
    transform: scale(0.9);
  }
  100% {
    opacity: 0.4;
    transform: scale(1.1);
  }
}

/* Timeline node styling */
.timeline-node {
  background: rgba(17, 25, 40, 0.7);
  backdrop-filter: blur(10px);
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
  position: relative;
  z-index: 10;
}

/* Neon border for Spotify */
.neon-border {
  position: relative;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.5), 
              0 0 20px rgba(59, 130, 246, 0.3);
}

/* Tech badges */
.tech-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  background: rgba(59, 130, 246, 0.15);
  color: rgba(147, 197, 253, 1);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 9999px;
  font-size: 0.8rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.tech-badge:hover {
  background: rgba(59, 130, 246, 0.25);
  transform: translateY(-2px);
}

/* Social buttons */
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

.social-btn.instagram {
  background: linear-gradient(45deg, rgba(193, 53, 132, 0.2), rgba(131, 58, 180, 0.2));
  color: rgb(225, 48, 108);
  border: 1px solid rgba(193, 53, 132, 0.3);
}

.social-btn.linkedin {
  background: rgba(10, 102, 194, 0.2);
  color: rgb(10, 102, 194);
  border: 1px solid rgba(10, 102, 194, 0.3);
}

.social-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.social-btn.github:hover {
  background: rgba(39, 39, 42, 0.9);
}

.social-btn.instagram:hover {
  background: linear-gradient(45deg, rgba(193, 53, 132, 0.3), rgba(131, 58, 180, 0.3));
}

.social-btn.linkedin:hover {
  background: rgba(10, 102, 194, 0.3);
}

/* Wave animation */
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

/* Scrolling */
html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px;
}

section {
  scroll-margin-top: 80px;
}
</style>