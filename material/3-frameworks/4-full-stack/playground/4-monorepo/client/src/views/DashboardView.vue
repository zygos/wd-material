<script lang="ts" setup>
import { trpc } from '@/trpc'
import { onBeforeMount, ref } from 'vue'
import { FwbAlert, FwbButton } from 'flowbite-vue'
import type { ProjectBare } from '@mono/server/src/shared/entities'
import Project from '@/components/Project.vue'

// If we want to get a type error at the place of assignment of
// projects.values, then we would declare the type of projects explicitly:
const projects = ref<ProjectBare[]>([])

// If we wanted to get a type error at the place of usage of non-existent
// or incorrectly typed properties, then we would declare the
// type of projects simply as being whatever the query returns:
// const projects = ref<Awaited<ReturnType<typeof trpc.project.find.query>>>([])

onBeforeMount(async () => {
  projects.value = await trpc.project.find.query()
})
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
