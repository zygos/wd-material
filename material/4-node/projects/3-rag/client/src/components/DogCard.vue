<script lang="ts" setup>
import type { Dog } from '@mono/server/src/shared/entities'

const { dog } = defineProps<{
  dog: Dog
}>()
</script>

<template>
  <div
    class="flex flex-row items-center p-4 bg-white rounded-md shadow-md mb-4"
  >
    <div class="w-32 h-32 rounded-md overflow-hidden">
      <img
        v-if="dog.image"
        :src="dog.image"
        alt="dog"
        class="object-cover w-full h-full"
      />
    </div>
    <div class="mt-4 text-center flex-1">
      <h2 class="text-xl font-bold">{{ dog.name }}</h2>
    </div>
  </div>
</template>
