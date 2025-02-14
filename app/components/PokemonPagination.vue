<script setup lang="ts">
import type { PaginationInfo } from '~/types/pagination'

const { paginationInfo } = defineProps<{
  paginationInfo: PaginationInfo
}>()

const emit = defineEmits<{
  pageChange: [page: number]
  sizeChange: [size: number]
}>()
</script>

<template>
  <div class="mt-4 space-y-2">
    <div class="text-sm text-gray-600 dark:text-gray-400 text-center">
      Showing {{ ((paginationInfo?.currentPage || 1 - 1) * (paginationInfo?.pageSize || 20)) + 1 }} -
      {{ Math.min((paginationInfo?.currentPage || 1) * (paginationInfo?.pageSize || 20), paginationInfo?.totalCount || 0) }}
      of {{ paginationInfo?.totalCount || 0 }} Pokémon
    </div>
    <div class="flex justify-center items-center gap-4">
      <USelect
        :model-value="paginationInfo.pageSize"
        :options="[10, 20, 50, 100]"
        size="sm"
        placeholder="Items per page"
        @update:model-value="(size: number) => emit('sizeChange', size)"
      />
      <UPagination
        :model-value="paginationInfo?.currentPage"
        :total="paginationInfo?.totalCount"
        :page-count="paginationInfo?.pageSize"
        :ui="{ rounded: 'rounded-lg' }"
        @update:model-value="(page) => emit('pageChange', page)"
      />
    </div>
  </div>
</template>
