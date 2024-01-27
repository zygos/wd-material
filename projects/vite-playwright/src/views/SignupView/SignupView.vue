<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <form @submit.prevent="router.push({ name: 'SignupSuccess' })" aria-label="Signup">
    <label>
      First name
      <input id="first-name" type="text" />
    </label>

    <label>
      Last name
      <input id="last-name" type="text" />
    </label>

    <label>
      Email
      <input id="email" type="email" />
    </label>

    <label>
      Password
      <input id="password" type="password" />
    </label>

    <label>
      Password (confirm)
      <input id="password" type="password" />
    </label>

    <button type="submit">Signup</button>
  </form>
</template>

<style scoped></style>
