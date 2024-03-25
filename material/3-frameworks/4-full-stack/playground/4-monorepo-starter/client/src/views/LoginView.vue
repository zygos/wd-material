<script lang="ts" setup>
import { ref } from 'vue'
import PageForm from '@/components/PageForm.vue'
import { FwbAlert, FwbButton, FwbInput } from 'flowbite-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const userForm = ref({
  email: '',
  password: '',
})

const errorMessage = ref('')

async function submitLogin() {
  router.push({ name: 'Dashboard' })
}
</script>

<template>
  <PageForm heading="Log in to your account" formLabel="Login" @submit="submitLogin">
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

      <FwbAlert v-if="errorMessage" data-testid="errorMessage" type="danger">
        {{ errorMessage }}
      </FwbAlert>

      <div class="grid">
        <FwbButton color="default" type="submit" size="xl">Log in</FwbButton>
      </div>
    </template>

    <template #footer>
      <FwbAlert class="bg-transparent text-center">
        Not a member?
        {{ ' ' }}
        <RouterLink
          :to="{ name: 'Signup' }"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >Sign up</RouterLink
        >
      </FwbAlert>
    </template>
  </PageForm>
</template>
