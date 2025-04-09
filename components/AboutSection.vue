<template>
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
                <SocialButton 
                  href="https://github.com/szyxxx" 
                  type="github"
                  icon="github"
                  label="GitHub"
                />
                <SocialButton 
                  href="https://instagram.com/axelldvid" 
                  type="instagram"
                  icon="instagram"
                  label="Instagram"
                />
                <SocialButton 
                  href="https://linkedin.com/in/axelldavid" 
                  type="linkedin"
                  icon="linkedin"
                  label="LinkedIn"
                />
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

.neon-border {
  position: relative;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.5), 
              0 0 20px rgba(59, 130, 246, 0.3);
}
</style> 