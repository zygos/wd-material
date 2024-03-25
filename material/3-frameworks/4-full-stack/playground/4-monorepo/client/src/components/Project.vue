<script lang="ts" setup>
import { ArrowRightIcon } from '@heroicons/vue/24/outline'
import type { ProjectBare } from '@mono/server/src/shared/entities'
import { FwbButton } from 'flowbite-vue'
import Card from './Card.vue'

defineProps<{
  project: ProjectBare
}>()
</script>

<template>
  <Card class="flex flex-row items-center justify-between" data-testid="project">
    <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      {{ project.name }}
    </h5>
    <!-- prettier-ignore -->
    <FwbButton
      component="RouterLink"
      tag="router-link"
      data-testid="viewProjectBugs"
      :href="({ name: 'Project', params: { id: project.id } } as any)"
      class="pr-3"
    >
      View project bugs
      <ArrowRightIcon aria-hidden="true" class="inline h-4 w-4" />
    </FwbButton>
  </Card>
</template>
