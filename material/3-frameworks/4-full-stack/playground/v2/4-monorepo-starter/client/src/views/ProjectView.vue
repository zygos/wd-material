<script setup lang="ts">
import BugRow from '@/components/BugRow.vue'
import type { Bug, Project } from '@server/shared/types'
import { FwbButton, FwbHeading, FwbInput } from 'flowbite-vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { apiBase } from '@/config'
import Card from '@/components/Card.vue'
import type { Selectable } from 'kysely'

const route = useRoute()
const projectId = Number(route.params.id)
// this is dummy data
const project = ref<Selectable<Project>>({
  id: projectId,
  name: 'My Project',
  userId: 1,
})
const bugs = ref<Selectable<Bug>[]>([
  {
    id: 1,
    name: 'Not Found',
    code: '404',
    projectId,
    stacktrace: 'Error: Not Found\n    at /home/user/app.js:1:1',
    resolvedAt: null,
  },
  {
    id: 2,
    name: 'Internal Server Error',
    code: '500',
    projectId,
    stacktrace: 'Error: Internal Server Error\n    at /home/user/app.js:1:1',
    resolvedAt: new Date(),
  },
])

const bugReportUrl = ref(
  // This will work only if you create a procedure "bug.report" in the API.
  [
    `curl '${apiBase}/bug.report'`,
    `-H 'content-type: application/json'`,
    `--data-raw '{"json":{"name":"Dummy Error","code":"FAKE_ERROR","projectId":${projectId}}}'`,
  ].join(' ')
)

const doShowGuide = ref(false)
function showGuide() {
  doShowGuide.value = true
}

function updateBug(bug: Selectable<Bug>) {
  const index = bugs.value.findIndex((b) => b.id === bug.id)

  bugs.value[index] = bug
}

async function reportDummyBug() {
  // TODO: call the API to create a new bug
}
</script>

<template>
  <div v-if="project">
    <div class="mb-4 flex flex-row">
      <FwbHeading tag="h1" class="mb-0 !text-xl">
        {{ project.name }}
      </FwbHeading>
      <RouterLink
        v-if="!doShowGuide"
        class="text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:whitespace-nowrap"
        to="#"
        @click.prevent="showGuide"
        >How to report a bug?</RouterLink
      >
    </div>

    <Transition enter-from-class="opacity-0" enter-active-class="transition duration-500">
      <Card v-if="doShowGuide">
        <p>To report a bug, call the provided endpoint:</p>

        <FwbInput class="mt-2 font-mono" type="text" v-model="bugReportUrl" readonly />

        <FwbButton class="mt-4" @click="reportDummyBug">Report a Dummy Bug</FwbButton>
      </Card>
    </Transition>

    <Card v-if="!bugs.length" class="text-center" data-testid="bugListEmpty">
      No bugs! Congratulations! 🎉
    </Card>

    <div
      v-else
      role="list"
      aria-label="Bugs"
      class="divide-y divide-gray-200 rounded-lg bg-white shadow-lg"
    >
      <TransitionGroup
        enter-from-class="opacity-0"
        enter-active-class="transition duration-500"
        tag="div"
      >
        <BugRow
          v-for="bug in bugs"
          role="listitem"
          :key="bug.id"
          :bug="bug"
          @update:bug="updateBug($event)"
        />
      </TransitionGroup>
    </div>
  </div>
</template>
