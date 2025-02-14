<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { VIEW_TYPES, type ViewType } from '~/constants/views'

const currentPage = ref(1)
const pageSize = ref(20)
// const { data } = useRickAndMortyData(`character?page=${currentPage.value}`)

const { data, refetch } = useQuery({
  queryKey: ['data', currentPage, pageSize],
  queryFn: () => fetch(`https://rickandmortyapi.com/api/character?page=${currentPage.value}&per_page=${pageSize.value}`).then(res => res.json()),
  refetchInterval: 60000, // Auto-refetch every 60 seconds
})

const view = ref<ViewType>(VIEW_TYPES.TABLE)

function handlePageChange(page: number) {
  currentPage.value = page
  refetch()
}

function handlePageSizeChange(size: number) {
  pageSize.value = size
  currentPage.value = 1 // Reset to first page when changing page size
  refetch()
}

watch([currentPage, pageSize], () => {
  refreshNuxtData()
})

definePageMeta({
  title: 'Rick and Morty Characters',
})
</script>

<template>
  <div class="py-8">
    <UContainer>
      <div class="flex justify-between items-center border-b mb-8 py-2">
        <h1 class="text-2xl font-bold text-stone-800 dark:text-stone-200">
          Rick and Morty Characters
        </h1>
        <UButtonGroup size="sm">
          <UButton
            :color="view === VIEW_TYPES.TABLE ? 'primary' : 'gray'"
            :variant="view === VIEW_TYPES.TABLE ? 'solid' : 'ghost'"
            icon="i-heroicons-table-cells"
            @click="view = VIEW_TYPES.TABLE"
          />
          <UButton
            :color="view === VIEW_TYPES.GRID ? 'primary' : 'gray'"
            :variant="view === VIEW_TYPES.GRID ? 'solid' : 'ghost'"
            icon="i-heroicons-squares-2x2"
            @click="view = VIEW_TYPES.GRID"
          />
        </UButtonGroup>
      </div>
      <div class="w-full">
        <Transition
          mode="out-in"
          enter-active-class="duration-200 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="duration-200 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <DataTableRickAndMortyTable
            v-if="view === VIEW_TYPES.TABLE"
            :characters="data?.results || []"
            :pagination-info="{
              currentPage,
              totalCount: data?.info?.count,
              pages: data?.info?.pages,
            }"
            :loading="!data"
            @page-change="handlePageChange"
            @page-size-change="handlePageSizeChange"
          />
          <DataGridRickAndMortyGrid
            v-else
            :characters="data?.results || []"
            :loading="!data"
            :pagination-info="{
              currentPage,
              totalCount: data?.info?.count,
              pages: data?.info?.pages,
            }"
            @page-change="handlePageChange"
          />
        </Transition>
      </div>
    </UContainer>
  </div>
</template>
