<script lang="ts" setup>
import { signup } from '@/stores/user'
import { ref } from 'vue'
import PageForm from '@/components/PageForm.vue'
import { FwbAlert, FwbButton, FwbInput } from 'flowbite-vue'
import { DEFAULT_SERVER_ERROR } from '@/consts'
import AlertError from '@/components/AlertError.vue'
// import useErrorMessage from '@/composables/useErrorMessage'

const userForm = ref({
  email: '',
  password: '',
})

const hasSucceeded = ref(false)

// Wrap our signup call in a try/catch block to catch any errors.
// Set the error message if there is an error.
const errorMessage = ref('')
async function submitSignup() {
  try {
    await signup(userForm.value)

    // clear error
    errorMessage.value = ''

    // display success message
    hasSucceeded.value = true
  } catch (error) {
    // set error, which will be automatically displayed
    errorMessage.value = error instanceof Error ? error.message : DEFAULT_SERVER_ERROR
  }
}

// Or, if we move the generic error handling to a separate composable
// function, which creates an error message ref for us and handles
// the try/catch block, we can simplify our submitSignup function to:
// const [submitSignup, errorMessage] = useErrorMessage(async () => {
//   await signup(userForm.value)

//   hasSucceeded.value = true
// })
</script>

<template>
  <PageForm heading="Sign up for an account" formLabel="Signup" @submit="submitSignup">
    <template #default>
      <FwbInput label="Email" type="email" v-model="userForm.email" :required="true" />

      <FwbInput
        label="Password"
        id="password"
        name="password"
        type="password"
        autocomplete="current-password"
        v-model="userForm.password"
        :required="true"
      />

      <FwbAlert v-if="hasSucceeded" data-testid="successMessage" type="success">
        You have successfully signed up! You can now log in.
        <RouterLink
          :to="{ name: 'Login' }"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >Go to the login page</RouterLink
        >
      </FwbAlert>
      <AlertError :message="errorMessage">
        {{ errorMessage }}
      </AlertError>

      <div class="grid">
        <FwbButton color="default" type="submit" size="xl">Sign up</FwbButton>
      </div>
    </template>

    <template #footer>
      <FwbAlert class="bg-transparent text-center">
        Already a member?
        {{ ' ' }}
        <RouterLink
          :to="{ name: 'Login' }"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >Log in</RouterLink
        >
      </FwbAlert>
    </template>
  </PageForm>
</template>
