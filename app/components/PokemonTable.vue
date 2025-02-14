<script setup lang="ts">
import type { PaginationInfo } from '~/types/pagination'
import type { PokemonListItem } from '~/types/pokemon'
import PokemonPagination from './PokemonPagination.vue'

const { pokemon, loading, paginationInfo } = defineProps<{
  pokemon: PokemonListItem[]
  loading?: boolean
  paginationInfo: PaginationInfo
}>()

const emit = defineEmits<{
  pageChange: [page: number]
  sizeChange: [size: number]
}>()

const columns = [
  {
    key: 'id',
    label: '#',
    class: 'w-16',
  },
  {
    key: 'image',
    label: '',
    class: 'w-[100px]',
  },
  {
    key: 'name',
    label: 'Name',
    class: 'min-w-[200px]',
  },
  {
    key: 'actions',
    label: 'Actions',
    class: 'w-[100px] text-center',
  },
]

const rows = computed(() => {
  return pokemon?.map(item => ({
    ...item,
    name: item.name.charAt(0).toUpperCase() + item.name.slice(1),

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
              class="w-20 h-20 object-contain"
            >
          </template>

          <template #actions-data="{ row }">
            <NuxtLink :to="`/pokemon/${row.id}`">
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
    </div>

    <PokemonPagination
      :pagination-info="paginationInfo"
      @page-change="emit('pageChange', $event)"
      @size-change="emit('sizeChange', $event)"
    />
  </div>
</template>
