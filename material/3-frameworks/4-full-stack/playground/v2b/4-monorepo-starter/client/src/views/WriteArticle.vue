<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { FwbButton, FwbHeading, FwbInput, FwbTextarea } from 'flowbite-vue'
import useErrorMessage from '@/composables/useErrorMessage'
import AlertError from '@/components/AlertError.vue'

const router = useRouter()

const articleForm = ref({
  title: '',
  content: '',
})

const [createArticle, errorMessage] = useErrorMessage(async () => {
  // TODO: call the API to create a new article instead of hard-coding the data
  const article = {
    id: 1,
    title: articleForm.value.title,
    content: articleForm.value.content,
    userId: 123,
  }

  router.push({
    name: 'Article',
    params: { id: article.id },
  })
})
</script>

<template>
  <form aria-label="Article" @submit.prevent="createArticle">
    <div class="space-y-6">
      <FwbHeading tag="h1" class="text-3xl">Create a new article</FwbHeading>

      <div class="mt-6">
        <FwbInput
          aria-label="Article title"
          v-model="articleForm.title"
          :minlength="2"
          label="Article title"
          placeholder="My article"
        />
      </div>

      <div class="mt-6">
        <FwbTextarea
          aria-label="Article content"
          v-model="articleForm.content"
          :rows="12"
          label="Article content"
          placeholder="Write your article here..."
        />
      </div>
    </div>

    <AlertError :message="errorMessage" />

    <div class="mt-6 flex justify-end">
      <FwbButton size="lg" type="submit">Post article</FwbButton>
    </div>
  </form>
</template>
