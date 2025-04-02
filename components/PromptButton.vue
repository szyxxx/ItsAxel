<template>
  <button 
    @click="$emit('click')"
    class="text-left p-4 bg-gray-800/60 hover:bg-gray-700/80 border border-gray-700 rounded-xl transition-all hover:shadow-md hover:-translate-y-0.5 text-sm flex items-center gap-3"
  >
    <span :class="iconClass">
      <slot name="icon"></slot>
    </span>
    <span><slot></slot></span>
  </button>
</template>

<script setup>
defineProps({
  iconClass: {
    type: String,
    default: 'bg-blue-600/30 text-blue-400 p-2 rounded-lg'
  }
});

defineEmits(['click']);
</script>