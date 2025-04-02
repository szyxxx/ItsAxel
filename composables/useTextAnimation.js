import { ref, onMounted, onUnmounted } from 'vue';

export function useTextAnimation(options, interval = 3500) {
  const currentText = ref(options[0]);
  let currentIndex = 0;
  let textInterval;

  const fadeOut = () => {
    const element = document.querySelector('.animated-text');
    if (element) element.classList.add('fade-out');
  };

  const fadeIn = () => {
    const element = document.querySelector('.animated-text');
    if (element) {
      element.classList.remove('fade-out');
      element.classList.add('fade-in');
      setTimeout(() => {
        element.classList.remove('fade-in');
      }, 500);
    }
  };

  // Initialize text rotation
  onMounted(() => {
    textInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % options.length;
      fadeOut();
      setTimeout(() => {
        currentText.value = options[currentIndex];
        fadeIn();
      }, 500); // Half of transition time for fade out/in
    }, interval); // Change text every interval ms
  });

  // Clean up interval on component unmount
  onUnmounted(() => {
    clearInterval(textInterval);
  });

  return {
    currentText
  };
}