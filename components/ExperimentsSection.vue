<template>
  <PageSection id="experiments">
    <div class="max-w-6xl mx-auto">
      <h1 data-animate="fade" class="text-3xl md:text-4xl font-bold mb-12 md:mb-16 relative">
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-indigo-500">Experiments</span>
      </h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <!-- SZYX.AI Card -->
        <ExperimentCard
          title="Szyx.AI"
          description="My personal AI assistant that knows about me and can answer questions about my life."
          category="AI Project"
          categoryColor="blue"
          year="2025"
          to="/experiments/szyx-ai"
          :background="{
            gradient: 'from-blue-900 to-purple-900',
            image: '/img/ai-bg.jpg'
          }"
          data-animate="slide-up"
        />
        
        <!-- Journal Card -->
        <ExperimentCard
          title="Digital Journal"
          description="A personal journal app for documenting thoughts, ideas, and daily experiences."
          category="Productivity"
          categoryColor="green"
          year="2025"
          to="/experiments/journal"
          :background="{
            gradient: 'from-emerald-900 to-blue-900',
            image: '/img/journal-bg.jpg'
          }"
          data-animate="slide-up"
          data-animate-delay="100"
        />
        
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

.social-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  transition: all 0.3s ease;
  font-weight: 500;
  background: rgba(24, 24, 27, 0.8);
  color: white;
  border: 1px solid rgba(82, 82, 91, 0.5);
}

.social-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  background: rgba(39, 39, 42, 0.9);
}
</style> 