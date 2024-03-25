import { readonly, ref } from 'vue';

// or error: Ref<Error | null>, if you import type { Ref } from 'vue'
const error = ref<Error | null>(null);

export const errorCurrent = readonly(error);

export function setError(errorObject: Error) {
  error.value = errorObject;
}
