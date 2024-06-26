import { clearStoredAccessToken, getStoredAccessToken, getUserIdFromToken } from '@/utils/auth'
import { computed, ref } from 'vue'

// We could wrap this inside of a Pinia store.
// We could use @tanstack/vue-query for query caching.
// You are free to experiment with more streamlined state management solutions
// in your own project.
// Here we will use a simple example that should be understandable for everyone.

// Intial state.
// Auth token is string OR null.
const authToken = ref<string | null>(getStoredAccessToken(localStorage))

export const authUserId = computed(() =>
  authToken.value ? getUserIdFromToken(authToken.value) : null
)

export const isLoggedIn = computed(() => !!authToken.value)

// Exported API procedures.
/**
 * Log in a user and store the access token in the store and in the local storage.
 */
export async function login(userLogin: { email: string; password: string }) {
  // TODO: call the login mutation with userLogin details to get the accessToken
  // TODO: set the authToken value
  // TODO: set the token in the local storage, maybe you can find a function
  //       in utils/auth.ts that can help you with that?
}

export function logout() {
  authToken.value = null
  clearStoredAccessToken(localStorage)
}
