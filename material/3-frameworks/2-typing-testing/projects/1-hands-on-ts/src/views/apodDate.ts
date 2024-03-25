import { ref, watchEffect } from 'vue';
import { fetchApodByDate } from '@/stores/apod';
import { setError } from '@/stores/errors';

export const apod = ref(null);
export const date = ref(new Date().toISOString().slice(0, 10));

// set the apod image based on the date
watchEffect(async () => {
  try {
    const apodImage = await fetchApodByDate(date.value);

    apod.value = apodImage;
  } catch (error) {
    setError(
      new Error('Could not fetch the picture of the day. Please try again.', {
        cause: error,
      })
    );
  }
});
