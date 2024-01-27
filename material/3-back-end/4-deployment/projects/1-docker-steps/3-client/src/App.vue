<script setup lang="ts">
import DogCard from '@/components/DogCard.vue'
import FormButton from '@/components/FormButton.vue'
import { computed, ref } from 'vue'
import { formRandomDog } from './dogs'

const dogs = ref([
  // In practice, you would store these files in the server-side (e.g. S3).
  // For a minimal example, we'll just store them in the client-side.
  { id: 1, name: 'Lassie', isGoodDog: true, image: '/dogs/good-dog-1.jpg' },
  { id: 2, name: 'Molly', isGoodDog: false, image: '/dogs/bad-dog-1.jpg' },
  { id: 3, name: 'Cinnamon', isGoodDog: true, image: '/dogs/good-dog-2.jpg' },
  { id: 4, name: 'Buddy', isGoodDog: false, image: '/dogs/bad-dog-2.jpg' },
  { id: 5, name: 'Sparky', isGoodDog: true, image: '/dogs/good-dog-3.jpg' },
  { id: 6, name: 'Rascal', isGoodDog: false, image: '/dogs/bad-dog-3.jpg' },
])

const goodDogs = computed(() => dogs.value.filter(dog => dog.isGoodDog))
const notGoodDogs = computed(() => dogs.value.filter(dog => !dog.isGoodDog))

const addDog = (isGoodDog: boolean) => {
  const dog = formRandomDog(
    // naive assumption that works as long as we do not delete dogs
    dogs.value.length + 1,
    isGoodDog,
  )

  dogs.value.push(dog)
}
</script>

<template>
  <div class="container mx-auto px-4">
    <h1 class="text-2xl font-bold mb-6">Dogs</h1>
    <div class="grid grid-cols-2 gap-6 grid-flow-col">
      <div>
        <h2 class="text-xl font-bold mb-4">Good dogs</h2>
        <DogCard v-for="dog in goodDogs" :key="dog.id" :dog="dog" />
        <FormButton @click="addDog(true)">
          Add a dog
        </FormButton>
      </div>
      <div>
        <h2 class="text-xl font-bold mb-4">Not good dogs</h2>
        <DogCard v-for="dog in notGoodDogs" :key="dog.id" :dog="dog" />
        <FormButton @click="addDog(false)">
          Add a dog
        </FormButton>
      </div>
    </div>
  </div>
</template>
