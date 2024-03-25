<script setup>
import { ref } from 'vue'

const message = ref('Hello World!')

function reverseMessage() {
  message.value = message.value.split('').reverse().join('')
}
</script>

<template>
  <header>
    <h1>{{ message }}</h1>
  </header>

  <main>
    <button @click="reverseMessage" type="button">Reverse Message</button>

    <button @click="message += '!'" type="button">Append "!"</button>
  </main>
</template>

<style scoped>
button {
  display: block;
  margin-bottom: 1rem;
}
</style>
