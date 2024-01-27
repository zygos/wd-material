<script lang="ts" setup>
import { ref } from 'vue';

const count = ref(0);
</script>

<template>
  <div id="CounterView">
    <button data-testid="counter" @click="count++">
      {{ count }}
    </button>
  </div>
</template>

<style scoped>
#CounterView {
}
</style>
