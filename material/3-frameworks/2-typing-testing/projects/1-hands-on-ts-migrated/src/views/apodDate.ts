import { ref, watchEffect } from 'vue';
import { setError } from '@/stores/errors';
import { fetchApodByDate, type Apod } from '@/stores/apod';

// or you could use apod: Ref<Apod | null> = ref(null);
export const apod = ref<Apod | null>(null);

export const date = ref(new Date().toISOString().slice(0, 10));

// set the apod image based on the date
watchEffect(async () => {
  try {
    apod.value = await fetchApodByDate(date.value);
  } catch (error) {
    setError(
      new Error('Could not fetch the picture of the day. Please try again.', {
        cause: error,
      })
    );
  }
});
