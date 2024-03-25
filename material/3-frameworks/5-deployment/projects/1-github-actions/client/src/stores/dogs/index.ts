import type { Dog, DogInsert } from '@mono/server/src/shared/entities'
import { type Ref, computed, readonly, ref } from 'vue'
import { trpc } from '@/trpc'
export * from './formDog'

// We could use Pinia here, but here we are dealing with a simple
// array so, we will not introduce a new dependency.

// Our State. A list of dogs which is the source of truth. We will
// update it and it will be used to derive other state.
const dogsList = ref<Dog[]>([])

// Exporting only a readonly version of the ref, so we can't
// accidentally mutate it.
export const dogs = readonly(dogsList)

// Derived state
export const goodDogs = computed(() =>
  dogs.value.filter((dog) => dog.isGoodDog)
)
export const badDogs = computed(() =>
  dogs.value.filter((dog) => !dog.isGoodDog)
)

// Actions

// In practice, we would need to handle pagination, errors, etc.
export const findAll = async (): Promise<Ref<Dog[]>> => {
  dogsList.value = await trpc.dog.findAll.query()

  return dogsList
}

// This should be wrapped in some error handling, we are keeping
// it simple for the sake of an easy-to-follow example.
export const save = async (dog: DogInsert): Promise<Dog> => {
  // Pesimmistic update - requires a roundtrip to the server
  // to update the list of dogs.
  const dogSaved = await trpc.dog.create.mutate(dog)

  dogsList.value.push(dogSaved)

  return dogSaved
}
