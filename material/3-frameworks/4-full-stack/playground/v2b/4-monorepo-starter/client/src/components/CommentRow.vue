<script lang="ts" setup>
import { authUserId } from '@/stores/user'
import { trpc } from '@/trpc'
import type { CommentPublic } from '@server/shared/types'
import { computed } from 'vue'

// comment as v-model
const { articleAuthorId, comment } = defineProps<{
  articleAuthorId: number
  comment: CommentPublic
}>()

const emit = defineEmits<{
  deleted: [comment: CommentPublic]
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

const canMarkAsSpam = computed(() => authUserId.value === articleAuthorId)

async function markAsSpam() {
  const commentMarked = await trpc.comment.markAsSpam.mutate(comment)

  emit('deleted', commentMarked)
}

const onImageError = (event: Event) => {
  const image = event.target as HTMLImageElement

  image.src = 'https://via.placeholder.com/150'
}
</script>

<template>
  <div class="p-4" data-testid="comment">
    <div class="flex items-start space-x-4">
      <div class="flex-shrink-0">
        <img
          class="h-11 w-11 rounded-full"
          :src="`https://i.pravatar.cc/150?u=${comment.author.id}`"
          alt="Author Avatar"
          @error="onImageError"
        />
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
          <button
            v-if="canMarkAsSpam"
            @click="markAsSpam"
            data-testid="markAsSpam"
            class="text-xs font-medium text-gray-600 hover:text-red-600"
            aria-label="Mark this comment as spam and delete it"
          >
            Mark as spam
          </button>
        </div>
        <p class="mt-2 text-gray-700">
          {{ comment.content }}
        </p>
      </div>
    </div>
  </div>
</template>
