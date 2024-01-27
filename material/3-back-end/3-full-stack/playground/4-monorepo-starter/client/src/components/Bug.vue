<script lang="ts" setup>
import type { BugBare } from '@mono/server/src/shared/entities'
import { FwbBadge, FwbButton } from 'flowbite-vue'
import { CheckIcon } from '@heroicons/vue/24/outline'

const { bug } = defineProps<{
  bug: BugBare
}>()

const emit = defineEmits<{
  'update:bug': [bug: BugBare]
}>()

async function resolve() {
  emit('update:bug', {
    ...bug,
    resolvedAt: new Date(),
  })
}
</script>

<template>
  <div class="flex items-center justify-between gap-x-6 p-5">
    <div class="flex min-w-0 gap-x-4">
      <div class="flex items-center">
        <div class="flex-none rounded-full bg-red-500/20 p-1.5">
          <div class="h-2.5 w-2.5 rounded-full bg-red-500" />
        </div>
      </div>
      <div class="min-w-0 flex-auto">
        <div class="text-sm font-semibold leading-6 text-gray-900">
          {{ bug.name }}
          <span class="text-red-500">({{ bug.code }})</span>
        </div>
        <p class="mt-1 truncate font-mono text-sm leading-5 text-gray-500">{{ bug.stacktrace }}</p>
      </div>
    </div>
    <div class="flex shrink-0 flex-col items-end">
      <FwbBadge
        v-if="bug.resolvedAt"
        data-testid="bugResolved"
        type="green"
        size="sm"
        class="mr-0 py-2 pl-3 pr-4"
      >
        <CheckIcon aria-hidden="true" class="mr-1 h-5 w-5 text-green-400" />
        Resolved
      </FwbBadge>
      <FwbButton v-else data-testid="resolveBug" @click="resolve">Resolve</FwbButton>
    </div>
  </div>
</template>
