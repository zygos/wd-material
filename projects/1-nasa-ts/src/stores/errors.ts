import { readonly, ref } from 'vue';

const error = ref(null);

export const errorCurrent = readonly(error);

export function setError(errorObject) {
  error.value = errorObject;
}
