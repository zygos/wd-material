<script lang="ts" setup>
import { trpc } from '@/trpc'
import { onBeforeMount, ref } from 'vue'
import { FwbAlert, FwbButton } from 'flowbite-vue'
import type { Project } from '@server/shared/types'
import ProjectCard from '@/components/ProjectCard.vue'
import type { Selectable } from 'kysely'

const projects = ref<Selectable<Project>[]>([])

onBeforeMount(async () => {
  projects.value = await trpc.project.find.query()
})
</script>

<template>
  <div class="DashboardView">
    <div v-if="projects.length" data-testid="projectList">
      <ProjectCard v-for="project in projects" :key="project.id" :project="project" />
    </div>
    <FwbAlert v-else data-testid="projectListEmpty">No projects yet!</FwbAlert>

    <div class="mt-4">
      <!-- prettier-ignore -->
      <FwbButton
        component="RouterLink"
        tag="router-link"
        :href="({ name: 'ProjectCreate' } as any)"
        data-testid="createProject"
        size="xl"
      >
        Add a new project
      </FwbButton>
    </div>
  </div>
</template>
