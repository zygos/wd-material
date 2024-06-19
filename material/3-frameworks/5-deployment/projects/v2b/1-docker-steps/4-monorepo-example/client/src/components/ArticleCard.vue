<script lang="ts" setup>
import { computed } from 'vue'
import type { Selectable } from 'kysely'
import type { Article } from '@server/shared/types'

interface Props {
  article: Selectable<Article>
}

const props = defineProps<Props>()

const truncatedContent = computed(() =>
  props.article.content.length > 100
    ? props.article.content.slice(0, 100) + '...'
    : props.article.content
)
</script>

<template>
  <div class="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-700">
    <h4 class="text-xl font-semibold hover:text-blue-700">
      <RouterLink :to="`/article/${article.id}`">
        {{ article.title }}
      </RouterLink>
    </h4>
    <p class="mt-2 text-gray-600 dark:text-gray-300">{{ truncatedContent }}</p>
    <RouterLink
      :to="`/article/${article.id}`"
      class="mt-4 inline-block text-blue-500 dark:text-blue-300"
    >
      Read more
    </RouterLink>
  </div>
</template>
