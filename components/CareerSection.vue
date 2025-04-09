<template>
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
</template>

<script setup>
// No script needed for this component
</script>

<style scoped>
.glass-card {
  background: rgba(17, 25, 40, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}

.timeline-node {
  background: rgba(17, 25, 40, 0.7);
  backdrop-filter: blur(10px);
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
  position: relative;
  z-index: 10;
}
</style> 