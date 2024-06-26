<script lang="ts" setup>
import type { CommentPublic } from '@server/shared/types'
import { computed } from 'vue'
import AvatarPlaceholder from './AvatarPlaceholder.vue'

const { comment } = defineProps<{
  comment: CommentPublic
}>()

const commentDate = computed(() =>
  // "Month DD, YYYY HH:MM:SS"
  new Date(comment.createdAt).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
)
</script>

<template>
  <div class="border-b border-gray-200 p-4" data-testid="comment">
    <div class="flex items-start space-x-4">
      <div class="flex-shrink-0">
        <AvatarPlaceholder :userId="comment.author.id" />
      </div>
      <div class="flex-1">
        <div class="flex items-center justify-between">
          <div>
            <h4 class="text-lg font-semibold text-gray-900">
              {{ comment.author.firstName }} {{ comment.author.lastName }}
            </h4>
            <p class="text-xs text-gray-500">
              {{ commentDate }}
            </p>
          </div>
        </div>
        <p class="mt-2 text-gray-700">
          {{ comment.content }}
        </p>
      </div>
    </div>
  </div>
</template>
