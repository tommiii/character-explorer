<script setup lang="ts">
import type { PaginationInfo } from '~/types/pagination'

const props = defineProps<{
  characters: any[]
  loading?: boolean
  paginationInfo: PaginationInfo
}>()

const emit = defineEmits<{
  pageChange: [page: number]
  pageSizeChange: [pageSize: number]
}>()

const columns = [
  {
    key: 'image',
    label: '',
    class: 'w-[60px]',
  },
  {
    key: 'name',
    label: 'Character',
    class: 'w-[180px]',
  },
  {
    key: 'status',
    label: 'Status',
    class: 'w-[100px]',
  },
  {
    key: 'species',
    label: 'Species',
    class: 'w-[120px]',
  },
  {
    key: 'gender',
    label: 'Gender',
    class: 'w-[100px]',
  },
  {
    key: 'origin',
    label: 'Origin',
    class: 'min-w-[160px]',
  },
  {
    key: 'actions',
    label: 'Actions',
    class: 'w-[100px] text-center',
  },
]

const rows = computed(() => {
  return props.characters?.map(character => ({
    ...character,
    origin: character.origin.name,
  })) || []
})
</script>

<template>
  <div class="space-y-4">
    <div class="w-full">
      <div class="max-w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
        <UTable
          :rows="rows"
          :columns="columns"
          :loading="loading"
          hover
          class="w-full"
        >
          <template #loading>
            <div class="flex items-center justify-center p-4">
              <UIcon name="i-heroicons-arrow-path" class="animate-spin h-6 w-6" />
            </div>
          </template>

          <template #empty-state>
            <div class="flex flex-col items-center justify-center p-4 text-gray-500">
              <UIcon name="i-heroicons-inbox" class="h-8 w-8 mb-2" />
              <p>No data available</p>
            </div>
          </template>

          <template #header-cell="{ column }">
            <div class="flex items-center gap-2" :class="[column.class]">
              {{ column.label }}
            </div>
          </template>

          <template #image-data="{ row }">
            <img
              :src="row.image"
              :alt="row.name"
              class="w-10 h-10 rounded-full object-cover"
            >
          </template>

          <template #actions-data="{ row }">
            <NuxtLink :to="`/rick-and-morty/${row.id}`">
              <UButton
                size="sm"
                color="primary"
                variant="soft"
              >
                Details
              </UButton>
            </NuxtLink>
          </template>
        </UTable>
      </div>

      <RickAndMortyPaginationWrapper
        :pagination-info="paginationInfo"
        @page-change="emit('pageChange', $event)"
      />
    </div>
  </div>
</template>
