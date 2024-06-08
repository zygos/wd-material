<script lang="ts" setup>
import { ref } from 'vue'
import { FwbAlert, FwbButton } from 'flowbite-vue'
import type { Project } from '@server/shared/types'
import ProjectCard from '@/components/ProjectCard.vue'
import type { Selectable } from 'kysely'

const projects = ref<Selectable<Project>[]>([
  {
    id: 1,
    name: 'Project 1',
    userId: 1,
  },
  {
    id: 2,
    name: 'Project 2',
    userId: 2,
  },
])
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
