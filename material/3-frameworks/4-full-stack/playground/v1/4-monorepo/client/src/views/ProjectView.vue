<script setup lang="ts">
import Bug from '@/components/Bug.vue'
import { trpc } from '@/trpc'
import type { BugBare } from '@mono/server/src/shared/entities'
import { FwbButton, FwbHeading, FwbInput } from 'flowbite-vue'
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import { apiBase } from '@/config'
import Card from '@/components/Card.vue'

const route = useRoute()
const bugs = ref<BugBare[]>([])
const bugReportUrl = ref('')
const project = ref()
const doShowGuide = ref(false)

const projectId = Number(route.params.id)

onBeforeMount(async () => {
  // Promise.all allows to run multiple promises in parallel.
  const [projectFound, bugsFound] = await Promise.all([
    trpc.project.get.query(projectId),
    trpc.bug.find.query({ projectId }),
  ])

  project.value = projectFound
  bugs.value = bugsFound

  bugReportUrl.value = [
    `curl '${apiBase}/bug.report'`,
    `-H 'content-type: application/json'`,
    `--data-raw '{"json":{"name":"Dummy Error","code":"FAKE_ERROR","projectId":${projectId}}}'`,
  ].join(' ')

  if (!bugsFound.length) showGuide()
})

function showGuide() {
  doShowGuide.value = true
}

function updateBug(bug: BugBare) {
  const index = bugs.value.findIndex((b) => b.id === bug.id)

  bugs.value[index] = bug
}

async function reportDummyBug() {
  const bugReported = await trpc.bug.report.mutate({
    name: 'Dummy Error',
    code: 'FAKE_ERROR',
    projectId,
  })

  // Add the new bug to the top of the list
  bugs.value = [bugReported, ...bugs.value]
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
        <Bug
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
