<template>
  <NuxtLink :to="to" class="experiment-card group">
    <div class="aspect-[4/3] rounded-lg overflow-hidden relative">
      <div :class="`absolute inset-0 bg-gradient-to-br ${background.gradient} group-hover:opacity-80 opacity-100 transition-all duration-500`"></div>
      <div v-if="background.image" :class="`absolute inset-0 bg-[url('${background.image}')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-all duration-500 mix-blend-overlay`"></div>
      <div class="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500"></div>
      <div class="absolute top-0 left-0 w-full h-full p-6 flex flex-col justify-between">
        <div class="flex justify-between items-start">
          <div :class="`glass-card text-${categoryColor}-300 text-xs px-3 py-1.5 rounded-full uppercase tracking-wider font-medium`">
            {{ category }}
          </div>
        </div>
        <div>
          <h3 class="text-xl font-bold text-white">{{ title }}</h3>
        </div>
      </div>
    </div>
    <div class="mt-4 group-hover:mt-5 transition-all duration-300">
      <p class="text-gray-400 text-sm mb-2 font-normal">
        {{ year }}
      </p>
      <p class="text-white text-base">
        {{ description }}
      </p>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  categoryColor: {
    type: String,
    default: 'blue'
  },
  year: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  background: {
    type: Object,
    required: true,
    validator: (value) => {
      return value.gradient && typeof value.gradient === 'string'
    }
  }
})
</script>

<style scoped>
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

.glass-card {
  background: rgba(17, 25, 40, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}
</style> 