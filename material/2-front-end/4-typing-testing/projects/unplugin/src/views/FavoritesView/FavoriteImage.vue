<script setup>
defineProps({
  apod: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="favorite-image">
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
</template>

<style scoped>
.favorite-image {
  transition: border-color 0.3s ease;
  border: 1px solid var(--color-border);
  border-radius: 5px;
  background-color: var(--color-background);
  overflow: hidden;
}

.favorite-image:hover {
  border-color: var(--color-border-hover);
}

.favorite-image .image {
  position: relative;
  padding-bottom: 75%;
  width: 100%;
  height: 0;
  overflow: hidden;
}

.favorite-image .image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.favorite-image .details {
  padding: 1rem;
}

.favorite-image .details .title {
  margin-bottom: 0.5rem;
  color: var(--color-heading);
  font-size: 1.2rem;
  line-height: 1.4;
}

.favorite-image .details time {
  display: block;
  margin-bottom: 1rem;
  color: var(--color-text);
  font-size: 0.9rem;
}

.favorite-image .details .explanation {
  color: var(--color-text);
  font-size: 1rem;
  line-height: 1.5;
}
</style>
