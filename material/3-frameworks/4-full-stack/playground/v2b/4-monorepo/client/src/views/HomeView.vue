<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { trpc } from '@/trpc'
import type { Selectable } from 'kysely'
import type { Article } from '@server/shared/types'
import { FwbButton } from 'flowbite-vue'
import ArticleCard from '@/components/ArticleCard.vue'
import { isLoggedIn } from '@/stores/user'

const articles = ref<Selectable<Article>[]>([])

const fetchArticles = async () => {
  articles.value = await trpc.article.findAll.query()
}

onMounted(fetchArticles)
</script>

<template>
  <div class="dark:bg-gray-800">
    <div v-if="!isLoggedIn" class="rounded-md bg-white px-6 py-8">
      <div class="items-center lg:flex">
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
    </div>
    <div class="mt-12">
      <h3 class="text-2xl font-bold text-gray-800 dark:text-gray-100">Latest Articles</h3>
      <div v-if="articles.length" class="mt-6 grid gap-6 lg:grid-cols-3" data-testid="articleList">
        <ArticleCard v-for="article in articles" :key="article.id" :article="article" />
      </div>
      <div v-else class="text-center text-gray-500 dark:text-gray-400">No articles yet!</div>
    </div>
  </div>
</template>
