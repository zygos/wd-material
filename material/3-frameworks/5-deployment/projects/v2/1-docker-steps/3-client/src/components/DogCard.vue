<script lang="ts" setup>
const { dog } = defineProps<{
  dog: {
    id: number
    image: string
    name: string
    isGoodDog: boolean
  }
}>()
</script>

<template>
  <div
    class="flex flex-row items-center p-4 bg-white rounded-md shadow-md mb-4">
    <div class="w-32 h-32 rounded-md overflow-hidden">
      <img :src="dog.image" alt="dog" class="object-cover w-full h-full" />
    </div>
    <div class="mt-4 text-center flex-1">
      <h2 class="text-xl font-bold">{{ dog.name }}</h2>
    </div>
  </div>
</template>
