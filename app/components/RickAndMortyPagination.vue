<script setup lang="ts">
import type { PaginationInfo } from '~/types/pagination'

defineProps<{
  paginationInfo: PaginationInfo
}>()

const emit = defineEmits<{
  pageChange: [page: number]
}>()
</script>

<template>
  <div class="mt-4 flex justify-center">
    <UPagination
      :model-value="paginationInfo?.currentPage"
      :total="paginationInfo?.totalCount"
      :page-count="paginationInfo?.pages"
      :ui="{ rounded: 'rounded-lg' }"
      @update:model-value="(page) => emit('pageChange', page)"
    />
  </div>
</template>
