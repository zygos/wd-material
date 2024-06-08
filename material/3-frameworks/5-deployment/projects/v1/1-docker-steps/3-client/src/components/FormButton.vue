<script setup lang="ts">
defineEmits(['click'])
</script>

<template>
  <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>