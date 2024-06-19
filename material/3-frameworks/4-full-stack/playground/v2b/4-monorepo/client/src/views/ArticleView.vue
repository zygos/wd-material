<script setup lang="ts">
import CommentRow from '@/components/CommentRow.vue'
import { trpc } from '@/trpc'
import type { ArticlePublic, CommentPublic } from '@server/shared/types'
import { FwbButton, FwbHeading, FwbInput } from 'flowbite-vue'
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import Card from '@/components/Card.vue'
import { isLoggedIn } from '@/stores/user'

const route = useRoute()
const comments = ref<CommentPublic[]>([])
const commentNewContent = ref('')
const article = ref<ArticlePublic>()

const articleId = Number(route.params.id)

onBeforeMount(async () => {
  // Promise.all allows to run multiple promises in parallel.
  const [articleFound, commentsFound] = await Promise.all([
    trpc.article.get.query(articleId),
    trpc.comment.find.query({ articleId }),
  ])

  article.value = articleFound
  comments.value = commentsFound
})

// Local state manipulations.
function addComment(comment: CommentPublic) {
  comments.value = [...comments.value, comment]
}

function removeComment(comment: CommentPublic) {
  comments.value = comments.value.filter((c) => c.id !== comment.id)
}

// Data operations in the back end.
// for simplicity, we're not handling errors here
async function postComment() {
  if (!commentNewContent.value.trim()) return

  const commentPosted = await trpc.comment.post.mutate({
    content: commentNewContent.value,
    articleId,
  })

  // Add the new comment to the top of the list
  addComment(commentPosted)
  commentNewContent.value = ''
}
</script>

<template>
  <div v-if="article">
    <FwbHeading tag="h1" class="mb-8 mt-10">
      {{ article.title }}
    </FwbHeading>

    <Card>
      {{ article.content }}
    </Card>

    <div
      role="list"
      aria-label="Comments"
      class="divide-y divide-gray-200 rounded-lg bg-white shadow-lg"
    >
      <FwbHeading tag="h2" class="p-4 text-lg font-semibold">
        {{ comments.length ? comments.length : 'No' }}
        Comment{{ comments.length === 1 ? '' : 's' }}
      </FwbHeading>

      <div
        v-if="!comments.length"
        data-testid="commentListEmpty"
        class="p-4 text-center text-gray-500"
      >
        Be the first to comment! 🎉
      </div>

      <TransitionGroup
        enter-from-class="opacity-0"
        enter-active-class="transition duration-500"
        tag="div"
      >
        <CommentRow
          v-for="comment in comments"
          role="listitem"
          :key="comment.id"
          :articleAuthorId="article.userId"
          :comment="comment"
          @deleted="removeComment($event)"
        />
      </TransitionGroup>
    </div>

    <div class="mt-4">
      <div v-if="!isLoggedIn">
        Want to join the conversation? Please
        <RouterLink :to="`/login?redirect=${$route.fullPath}`" class="text-blue-600"
          >log in</RouterLink
        >
        or
        <RouterLink to="/signup" class="text-blue-600">sign up</RouterLink>
        first!
      </div>
      <form v-else @submit.prevent="postComment">
        <FwbInput
          class="w-full"
          type="text"
          v-model="commentNewContent"
          placeholder="Write a comment..."
        />
        <FwbButton class="mt-2" type="submit">Post Comment</FwbButton>
      </form>
    </div>
  </div>
</template>
