<script lang="ts" setup>
import { ref } from 'vue'
import { FwbAlert, FwbButton } from 'flowbite-vue'
import type { ProjectBare } from '@mono/server/src/shared/entities'
import Project from '@/components/Project.vue'

const projects = ref<ProjectBare[]>([
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
      <Project v-for="project in projects" :key="project.id" :project="project" />
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
