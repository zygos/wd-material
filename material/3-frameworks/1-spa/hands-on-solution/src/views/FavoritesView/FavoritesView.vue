<script setup>
import { favoritesList } from '../../store/favorites'
import FavoriteImage from './FavoriteImage.vue'
</script>

<template>
  <main>
    <h1>Favorites</h1>
    <div class="favorites">
      <FavoriteImage
        v-for="apod in favoritesList"
        :key="apod.date"
        :apod="apod"
      />
    </div>
  </main>
</template>

<style scoped>
.favorites {
  grid-gap: 2em;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  margin-top: 3em;
}

@media (width >= 1024px) {
  .favorites {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
