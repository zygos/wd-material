import { ref, watchEffect } from 'vue'
import { setError } from '../store/errors'

const apiKey = import.meta.env.VITE_NASA_API_KEY
export const apod = ref(null)
export const date = ref(new Date().toISOString().slice(0, 10))

// set the apod image based on the date
watchEffect(async () => {
  try {
    const request = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date.value}`
    )

    apod.value = await request.json()
  } catch (error) {
    setError(
      new Error('Could not fetch the picture of the day. Please try again.', {
        cause: error,
      })
    )
  }
})
