<template>
  <div class="fixed top-0 left-0 right-0 z-50 flex justify-center my-4 md:my-8 px-4">
    <div class="bg-gray-900/80 backdrop-blur-sm rounded-full py-2 flex flex-wrap justify-center space-x-1 md:space-x-2 w-full max-w-sm md:max-w-md">
      <a href="#about" class="nav-link text-sm md:text-base" :class="{ 'bg-gray-800': activeSection === 'about' }">
        About
      </a>
      <a href="#career" class="nav-link text-sm md:text-base" :class="{ 'bg-gray-800': activeSection === 'career' }">
        Career
      </a>
      <NuxtLink to="/journals" class="nav-link text-sm md:text-base" :class="{ 'bg-gray-800': route.path === '/journals' }">
        Journals
      </NuxtLink>
      <NuxtLink to="/szyx-ai" class="nav-link text-sm md:text-base bg-blue-600 hover:bg-blue-700">
        Szyx.AI
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const activeSection = ref('')

// Function to update active section based on scroll position
const updateActiveSection = () => {
  const sections = ['hero', 'about', 'career']
  
  for (const section of sections) {
    const element = document.getElementById(section)
    if (!element) continue
    
    const rect = element.getBoundingClientRect()
    if (rect.top <= 100 && rect.bottom >= 100) {
      activeSection.value = section
      break
    }
  }
}

// Add scroll event listener
onMounted(() => {
  window.addEventListener('scroll', updateActiveSection)
  updateActiveSection() // Initial check
  
  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault()
      const targetId = this.getAttribute('href')
      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        })
      }
    })
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveSection)
})
</script>

<style>
.nav-link {
  padding: 0.5rem 0.75rem;
  border-radius: 9999px;
  color: white;
  transition: all 0.3s ease;
  white-space: nowrap;
}

@media (min-width: 768px) {
  .nav-link {
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }
}

.nav-link:hover {
  background-color: rgb(31 41 55);
}
</style>
