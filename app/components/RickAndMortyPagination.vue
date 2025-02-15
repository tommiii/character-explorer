<script setup lang="ts">
import type { PaginationInfo } from '~/types/pagination'

const { paginationInfo } = defineProps<{
  paginationInfo: PaginationInfo
}>()

const emit = defineEmits<{
  pageChange: [page: number]
}>()
</script>

<template>
  <div class="mt-4 space-y-2">
    <div class="text-sm text-gray-600 dark:text-gray-400 text-center">
      Showing {{ paginationInfo.firstItemNumber }} -
      {{ paginationInfo.lastItemNumber }}
      of {{ paginationInfo.totalCount }} Characters
    </div>
    <div class="flex justify-center items-center gap-4">
      <UPagination
        :model-value="paginationInfo.currentPage"
        :total="paginationInfo.totalCount"
        :page-count="paginationInfo.pageSize"
        :ui="{ rounded: 'rounded-lg' }"
        @update:model-value="(page) => emit('pageChange', page)"
      />
    </div>
  </div>
</template>
