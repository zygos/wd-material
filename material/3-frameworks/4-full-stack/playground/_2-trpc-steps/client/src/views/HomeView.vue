<script lang="ts" setup>
import { ref } from 'vue'

const name = ref('')
const greeting = ref('')

async function greet() {
  // ...
}
</script>

<template>
  <form @submit.prevent="greet">
    <label>
      Your name
      <input type="text" v-model="name" />
    </label>
    <br />
    <button type="submit">Greet</button>
  </form>

  <h1>{{ greeting }}</h1>
</template>
