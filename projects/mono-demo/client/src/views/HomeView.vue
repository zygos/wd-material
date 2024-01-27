<script lang="ts" setup>
import type { Movie } from '@mono/server/src/database'
import { onMounted, ref } from 'vue'
import useMoviesStore from '@/stores/movies'

const moviesStore = useMoviesStore()

const movies = ref<Movie[]>([])

const fetchMovies = async () => {
  movies.value = await moviesStore.getMovies([133093, 816692])
}

onMounted(async () => {
  await fetchMovies()
})
</script>

<template>
  <div id="HomeView">
    {{ movies }}
  </div>
</template>

<style scoped>
#HomeView {
}
</style>
