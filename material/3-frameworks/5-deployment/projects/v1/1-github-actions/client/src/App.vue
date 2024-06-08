<script setup lang="ts">
import DogCard from '@/components/DogCard.vue'
import FormButton from '@/components/FormButton.vue'
import { onBeforeMount } from 'vue'
import { formDog, save, findAll, goodDogs, badDogs } from '@/stores/dogs'

onBeforeMount(findAll)

const addDog = (isGoodDog: boolean) => save(formDog(isGoodDog))
</script>

<template>
  <div class="container mx-auto px-4">
    <h1 class="text-2xl font-bold mb-6">Dogs</h1>
    <div class="grid grid-cols-2 gap-6 grid-flow-col">
      <div>
        <h2 class="text-xl font-bold mb-4">Good dogs</h2>
        <div role="list" aria-label="Good dogs">
          <DogCard
            v-for="dog in goodDogs"
            :key="dog.id"
            :dog="dog"
            role="listitem"
          />
        </div>
        <FormButton data-testid="addGoodDog" @click="addDog(true)">
          Add a dog
        </FormButton>
      </div>
      <div>
        <h2 class="text-xl font-bold mb-4">Bad dogs</h2>
        <div role="list" aria-label="Bad dogs">
          <DogCard
            v-for="dog in badDogs"
            :key="dog.id"
            :dog="dog"
            role="listitem"
          />
        </div>
        <FormButton data-testid="addBadDog" @click="addDog(false)">
          Add a dog
        </FormButton>
      </div>
    </div>
  </div>
</template>
