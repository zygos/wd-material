<script setup lang="ts">
import { ref, watch } from 'vue';
import { errorCurrent } from '@/stores/errors';

const isDisplayed = ref(false);

watch(errorCurrent, () => {
  isDisplayed.value = true;
});
</script>

<template>
  <div v-if="isDisplayed && errorCurrent" class="error-toast">
    <button type="button" @click="isDisplayed = false">✖️</button>
    {{ errorCurrent.message }}
  </div>
</template>

<style scoped>
.error-toast {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: pink;
  padding: 1rem;
  color: red;
  font-size: 12px;
  text-align: center;
}
</style>
