<template>
  <div class="fixed top-0 left-0 right-0 z-50 flex justify-center my-8">
    <div class="bg-gray-900/80 backdrop-blur-sm rounded-full px-2 py-2 flex space-x-2">
      <a href="#about" class="nav-link" :class="{ 'bg-gray-800': activeSection === 'about' }">
        About
      </a>
      <a href="#career" class="nav-link" :class="{ 'bg-gray-800': activeSection === 'career' }">
        Career
      </a>
      <NuxtLink to="/journals" class="nav-link" :class="{ 'bg-gray-800': route.path === '/journals' }">
        Journals
      </NuxtLink>
      <NuxtLink to="/szyx-ai" class="nav-link bg-blue-600 hover:bg-blue-700">
        Chat with SZYX.AI
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
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-radius: 9999px;
  color: white;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

.nav-link:hover {
  background-color: rgb(31 41 55);
}
</style>
