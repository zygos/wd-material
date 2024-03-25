<script setup>
import useCounter from './useCounter'

defineProps({
  msg: String,
})

const { count, setCount } = useCounter()
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <div>count is {{ count }}</div>
    <button type="button" @click="setCount(count + 1)">Increment</button>
    <button type="button" @click="setCount(count - 1)">Decrement</button>
    <button type="button" @click="setCount(0)">Reset</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
