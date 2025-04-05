<template>
  <div class="min-h-screen pt-16 md:pt-0 code-pattern-bg">
    <div class="bg-gradient-overlay"></div>
    <SiteNavigation />
    
    <!-- Hero Section -->
    <PageSection id="hero" sectionClass="min-h-[110vh] flex flex-col items-center justify-center px-4 relative z-10">
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
    </PageSection>
    
    <!-- About Section -->
    <PageSection id="about" sectionClass="my-4 md:py-24 min-h-screen relative z-10">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          <div class="lg:col-span-2">
            <div data-animate="slide-up" class="glass-card p-8 rounded-2xl mb-8">
              <h1 class="text-3xl md:text-4xl font-bold mb-6 md:mb-8 relative">
                <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">About Me</span>
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
    </PageSection>
    
    <!-- Career Section -->
    <PageSection id="career">
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
    </PageSection>

    <!-- Experiments Section -->
    <PageSection id="experiments">
      <div class="max-w-6xl mx-auto">
        <h1 data-animate="fade" class="text-3xl md:text-4xl font-bold mb-12 md:mb-16 relative">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-indigo-500">Experiments</span>
        </h1>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <!-- SZYX.AI Card -->
          <NuxtLink to="/experiments/szyx-ai" class="experiment-card group" data-animate="slide-up">
            <div class="aspect-[4/3] rounded-lg overflow-hidden relative">
              <div class="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900 group-hover:opacity-80 opacity-100 transition-all duration-500"></div>
              <div class="absolute inset-0 bg-[url('/img/ai-bg.jpg')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-all duration-500 mix-blend-overlay"></div>
              <div class="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500"></div>
              <div class="absolute top-0 left-0 w-full h-full p-6 flex flex-col justify-between">
                <div class="flex justify-between items-start">
                  <div class="glass-card text-blue-300 text-xs px-3 py-1.5 rounded-full uppercase tracking-wider font-medium">
                    AI Project
                  </div>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-white">Szyx.AI</h3>
                </div>
              </div>
            </div>
            <div class="mt-4 group-hover:mt-5 transition-all duration-300">
              <p class="text-gray-400 text-sm mb-2 font-normal">
                2025
              </p>
              <p class="text-white text-base">
                My personal AI assistant that knows about me and can answer questions about my life.
              </p>
            </div>
          </NuxtLink>
          
          <!-- Journal Card -->
          <NuxtLink to="/experiments/journal" class="experiment-card group" data-animate="slide-up" data-animate-delay="100">
            <div class="aspect-[4/3] rounded-lg overflow-hidden relative">
              <div class="absolute inset-0 bg-gradient-to-br from-emerald-900 to-blue-900 group-hover:opacity-80 opacity-100 transition-all duration-500"></div>
              <div class="absolute inset-0 bg-[url('/img/journal-bg.jpg')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-all duration-500 mix-blend-overlay"></div>
              <div class="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500"></div>
              <div class="absolute top-0 left-0 w-full h-full p-6 flex flex-col justify-between">
                <div class="flex justify-between items-start">
                  <div class="glass-card text-green-300 text-xs px-3 py-1.5 rounded-full uppercase tracking-wider font-medium">
                    Productivity
                  </div>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-white">Digital Journal</h3>
                </div>
              </div>
            </div>
            <div class="mt-4 group-hover:mt-5 transition-all duration-300">
              <p class="text-gray-400 text-sm mb-2 font-normal">
                2025
              </p>
              <p class="text-white text-base">
                A personal journal app for documenting thoughts, ideas, and daily experiences.
              </p>
            </div>
          </NuxtLink>
          
          <!-- Coming Soon Card -->
          <div class="experiment-card-soon group" data-animate="slide-up" data-animate-delay="200">
            <div class="aspect-[4/3] rounded-lg overflow-hidden relative glass-card border border-gray-700/50 border-dashed">
              <div class="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 opacity-60"></div>
              <div class="absolute top-0 left-0 w-full h-full p-6 flex flex-col justify-center items-center text-center">
                <div class="glass-card rounded-full p-4 mb-4 border border-gray-700/30">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-gray-300">More coming soon</h3>
              </div>
            </div>
            <div class="mt-4 group-hover:mt-5 transition-all duration-300">
              <p class="text-gray-400 text-sm mb-2 font-normal">
                Future
              </p>
              <p class="text-gray-300 text-base">
                I'm always working on new projects. Check back later!
              </p>
            </div>
          </div>
        </div>
        
        <!-- View All Projects Link -->
        <div class="mt-16 text-center" data-animate="fade" data-animate-delay="300">
          <NuxtLink to="/experiments" class="inline-flex items-center social-btn github px-6 py-2">
            <span class="text-lg">View All Projects</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-5 w-5 transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </PageSection>
    
    <!-- Feedback Section -->
    <PageSection id="feedback" sectionClass="py-16 md:py-24 relative z-10">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 data-animate="fade" class="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-500">
          Are You Sattisfied?
        </h1>
        
        <div data-animate="slide-up" class="glass-card rounded-2xl p-6 md:p-8">
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
          
          <form v-else @submit.prevent="submitFeedback" class="space-y-6">
            <div class="feedback-animate">
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
            
            <div class="feedback-animate" style="--delay: 100ms">
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
            
            <div class="feedback-animate" style="--delay: 200ms">
              <label for="rating" class="block text-sm font-medium text-gray-300 mb-2">Rating</label>
              <div class="flex items-center gap-2">
                <template v-for="star in 5" :key="star">
                  <button 
                    type="button"
                    @click="feedbackForm.rating = star"
                    class="focus:outline-none"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" 
                      :class="
                        [
                          'h-8 w-8 transition-colors duration-200',
                          feedbackForm.rating >= star ? 'text-yellow-400' : 'text-gray-600'
                        ]" 
                      viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                </template>
              </div>
            </div>
            
            <div class="pt-4 feedback-animate" style="--delay: 300ms">
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
    </PageSection>
    
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useScrollAnimation } from '~/composables/useScrollAnimation'
import { useTextAnimation } from '~/composables/useTextAnimation'
import { setupSmoothScroll } from '~/utils/smoothScroll'
import { useSupabaseClient } from '#imports'

// Text rotation variables
const textOptions = [
  'This is Axel',
  'I do code',
  'and messing with AI',
  'and some gaming',
  'and you\'ll find me singing',
  'anyway I\'m Axel'
];

const { currentText } = useTextAnimation(textOptions);

// Supabase client
const supabase = useSupabaseClient()

// Feedback form data
const feedbackForm = ref({
  name: '',
  message: '',
  rating: 0
})

const isSubmitting = ref(false)
const feedbackSubmitted = ref(false)
const recentFeedbacks = ref([])

// Submit feedback function
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
    // Refresh feedback list
    fetchRecentFeedback()
  } catch (error) {
    console.error('Error submitting feedback:', error)
    alert('Failed to submit feedback. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}

// Reset form after submission
const resetFeedbackForm = () => {
  feedbackForm.value = {
    name: '',
    message: '',
    rating: 0
  }
  feedbackSubmitted.value = false
}

// Fetch recent feedback
const fetchRecentFeedback = async () => {
  try {
    const { data, error } = await supabase
      .from('feedback')
      .select('name, message, rating, created_at')
      .order('created_at', { ascending: false })
      .limit(4)
    
    if (error) throw error
    
    recentFeedbacks.value = data
  } catch (error) {
    console.error('Error fetching recent feedback:', error)
  }
}

// Format date for display
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

// Initialize scroll animations and fetch feedback
onMounted(() => {
  useScrollAnimation();
  setupSmoothScroll();
  fetchRecentFeedback();
  
  // Setup scroll-driven animations for feedback form
  const setupFeedbackAnimations = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const elements = entry.target.querySelectorAll('.feedback-animate')
          elements.forEach((el, index) => {
            const delay = el.style.getPropertyValue('--delay') || `${index * 100}ms`
            el.style.transitionDelay = delay
            el.classList.add('feedback-animate-visible')
          })
        }
      })
    }, { threshold: 0.2 })
    
    const feedbackSection = document.getElementById('feedback')
    if (feedbackSection) {
      observer.observe(feedbackSection)
    }
    
    return observer
  }
  
  const observer = setupFeedbackAnimations()
  
  onUnmounted(() => {
    observer.disconnect()
  })
})
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

/* Additional styles for feedback section */
.feedback-animate {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
  transition-delay: var(--delay, 0ms);
}

.feedback-animate-visible {
  opacity: 1;
  transform: translateY(0);
}

.feedback-card {
  transition: all 0.3s ease;
}

.feedback-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(59, 130, 246, 0.2);
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

/* Experiment card styles */
.experiment-card {
  display: block;
  transition-property: all;
  transition-duration: 300ms;
}

.experiment-card-soon {
  transition-property: all;
  transition-duration: 300ms;
}

/* Enhanced experiment card styles */
.experiment-card {
  display: block;
  transition-property: all;
  transition-duration: 300ms;
  border-radius: 0.5rem;
  overflow: hidden;
}

.experiment-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px -10px rgba(59, 130, 246, 0.3);
}

.experiment-card-soon {
  transition-property: all;
  transition-duration: 300ms;
  border-radius: 0.5rem;
  overflow: hidden;
}

.experiment-card-soon:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px -10px rgba(99, 102, 241, 0.2);
}

/* Layer utilities */
@layer utilities {
  .grayscale {
    filter: grayscale(100%);
  }
  
  .grayscale-0 {
    filter: grayscale(0%);
  }
}
</style>