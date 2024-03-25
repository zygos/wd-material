<script setup lang="ts">
import FavoriteButton from '@/components/FavoriteButton.vue';
import { date, apod } from './apodDate';
</script>

<template>
  <main id="home-view">
    <h1>Picture of the day</h1>
    <div class="date-picker">
      <label for="date">Date for the NASA picture of the day</label>
      <input id="date" type="date" v-model="date" />
    </div>
    <div v-if="apod" class="apod">
      <div class="image">
        <FavoriteButton :apod="apod" />
        <img :src="apod.url" :alt="apod.title" />
      </div>
      <div class="details">
        <strong class="title">{{ apod.title }}</strong>
        <time :datetime="apod.date">{{ apod.date }}</time>
        <p class="explanation">{{ apod.explanation }}</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.date-picker {
  margin-bottom: 2rem;
}

.date-picker label {
  display: block;
  margin-bottom: 0.5rem;
}

.date-picker input {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem;
}

.apod {
  align-items: start;
}

@media (width >= 768px) {
  .apod {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
  }
}

.apod .image {
  position: relative;
}

.apod .image img {
  border-radius: 5px;
  width: 100%;
}
</style>
