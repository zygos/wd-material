<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import type { ArticlePublic } from '@server/shared/types'
import { FwbButton } from 'flowbite-vue'
import ArticleCard from '@/components/ArticleCard.vue'
import { isLoggedIn } from '@/stores/user'

const articles = ref<ArticlePublic[]>([])

const fetchArticles = async () => {
  // TODO: use an API call to get the list of articles

  // hard-coded data for demo
  articles.value = [
    {
      id: 1,
      title: 'What is a Static Site Generator?',
      content:
        'Learn what a static site generator is and how it can help you build websites faster.',
      userId: 123,
    },
    {
      id: 2,
      title: 'How to Build a Blog',
      content: 'Learn how to build a blog from scratch using your favorite technologies.',
      userId: 321,
    },
    {
      id: 3,
      title: 'The Future of Web Development',
      content: 'Explore the future of web development and what technologies you should learn next.',
      userId: 321,
    },
  ]
}

onMounted(fetchArticles)
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="!isLoggedIn" class="items-center lg:flex">
      <div class="lg:w-1/2">
        <h2 class="text-4xl font-bold text-gray-800 dark:text-gray-100">Open blogging platform</h2>
        <p class="mt-4 text-gray-500 dark:text-gray-400 lg:max-w-md">
          Hi! Join the community and start sharing your thoughts with the world. Sign up now and
          start writing your first article.
        </p>
        <div class="mt-6 flex items-center gap-2">
          <FwbButton component="RouterLink" tag="router-link" href="/signup">Sign up</FwbButton>
          <FwbButton component="RouterLink" tag="router-link" color="alternative" href="/login">
            Log in
          </FwbButton>
        </div>
      </div>
      <div class="mt-8 lg:mt-0 lg:w-1/2">
        <div class="flex items-center justify-center lg:justify-end">
          <div class="max-w-lg">
            <picture>
              <source srcset="../assets/illustration.webp" type="image/webp" />
              <img
                class="h-64 w-full rounded-md object-cover object-center"
                src="../assets/illustration.png"
                alt="Person typing"
              />
            </picture>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-12">
      <h3 class="text-2xl font-bold text-gray-800 dark:text-gray-100">Latest Articles</h3>
      <div v-if="articles.length" class="mt-6 grid gap-6 lg:grid-cols-2" data-testid="articleList">
        <ArticleCard v-for="article in articles" :key="article.id" :article="article" />
      </div>
      <div v-else class="text-center text-gray-500 dark:text-gray-400">No articles yet!</div>
    </div>
  </div>
</template>
