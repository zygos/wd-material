<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import useMoviesStore from '@/stores/movies'

const { getMovies, getMovieFull } = useMoviesStore()

const movies = ref<Awaited<ReturnType<typeof getMovieFull>>[]>([])

// const fetchMovies = async () => {
//   movies.value = await getMovies([133093, 816692])
// }

const fetchMovieFull = async () => {
  movies.value = [await getMovieFull(133093)]
}

onMounted(async () => {
  await fetchMovieFull()
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
