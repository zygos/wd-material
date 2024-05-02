<script setup>
import { isFavorite, toggleFavorite } from '../store/favorites'

defineProps({
  apod: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <button
    class="favorite-button"
    :class="{ active: isFavorite(apod) }"
    type="button"
    @click="toggleFavorite(apod)"
  >
    ❤️
  </button>
</template>

<style scoped>
.favorite-button {
  position: absolute;
  top: 0;
  right: 0;
  opacity: 0.6;
  z-index: 1;
  filter: saturate(0);
  transition:
    opacity,
    filter 0.3s ease;
  cursor: pointer;
  border: none;
  background: transparent;
  padding: 0.5rem;
  font-size: 2.5rem;
}

.favorite-button.active {
  opacity: 1;
  filter: saturate(1);
}
</style>
