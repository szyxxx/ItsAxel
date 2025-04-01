import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollAnimation() {
  const animatedElements = ref([])
  
  const setupScrollAnimation = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })
    
    // Find all elements with data-animate attribute
    document.querySelectorAll('[data-animate]').forEach(el => {
      // Add base animation classes
      el.classList.add('opacity-0', 'transition-all', 'duration-700')
      
      // Add specific animation classes based on data-animate value
      const animationType = el.getAttribute('data-animate')
      
      switch (animationType) {
        case 'fade':
          // Just fade in, no additional classes needed
          break
        case 'slide-up':
          el.classList.add('translate-y-10')
          break
        case 'slide-down':
          el.classList.add('-translate-y-10')
          break
        case 'slide-left':
          el.classList.add('translate-x-10')
          break
        case 'slide-right':
          el.classList.add('-translate-x-10')
          break
        case 'zoom-in':
          el.classList.add('scale-95')
          break
        case 'zoom-out':
          el.classList.add('scale-105')
          break
        default:
          // Default to fade
          break
      }
      
      // Store reference to element
      animatedElements.value.push(el)
      
      // Observe element
      observer.observe(el)
    })
    
    // Add CSS for animate-in class
    const style = document.createElement('style')
    style.textContent = `
      .animate-in {
        opacity: 1 !important;
        transform: translate(0, 0) scale(1) !important;
      }
    `
    document.head.appendChild(style)
    
    return observer
  }
  
  onMounted(() => {
    const observer = setupScrollAnimation()
    
    onUnmounted(() => {
      if (observer) {
        animatedElements.value.forEach(el => {
          observer.unobserve(el)
        })
      }
    })
  })
  
  return {
    animatedElements
  }
}