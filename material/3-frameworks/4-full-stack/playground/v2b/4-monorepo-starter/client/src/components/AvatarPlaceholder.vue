<script lang="ts" setup>
const { userId } = defineProps<{
  userId: number
}>()

const onImageError = (event: Event) => {
  const image = event.target as HTMLImageElement

  image.src = 'https://via.placeholder.com/150'
}
</script>

<template>
  <img
    class="rounded-full"
    :src="`https://i.pravatar.cc/48?u=${userId}`"
    alt="Author Avatar"
    @error="onImageError"
  />
</template>
