<script setup lang="ts">
import type { CharacterListItem } from '~/types/rick-and-morty'
import { useQuery } from '@tanstack/vue-query'
import BaseGrid from '~/components/BaseGrid.vue'
import BaseTable from '~/components/BaseTable.vue'
import { VIEW_TYPES, type ViewType } from '~/constants/views'

const currentPage = ref(1)
const view = ref<ViewType>(VIEW_TYPES.TABLE)
const pageSize = 20 // Rick and Morty API has fixed page size
const activeFilters = ref({})
const error = ref<string | null>(null)

const columns = [
  {
    key: 'id',
    label: '#',
    class: 'w-16 hidden sm:table-cell',
  },
  {
    key: 'image',
    label: '',
    class: 'w-[80px]',
  },
  {
    key: 'name',
    label: 'Character',
    class: 'w-[180px]',
  },
  {
    key: 'status',
    label: 'Status',
    class: 'w-[100px] hidden sm:table-cell',
  },
  {
    key: 'species',
    label: 'Species',
    class: 'w-[120px] hidden md:table-cell',
  },
  {
    key: 'gender',
    label: 'Gender',
    class: 'w-[100px] hidden lg:table-cell',
  },
  {
    key: 'origin',
    label: 'Origin',
    class: 'min-w-[160px] hidden md:table-cell',
  },
  {
    key: 'actions',
    label: 'Actions',
    class: 'w-[100px] text-center',
  },
]

const { data, refetch, isLoading } = useQuery({
  queryKey: ['rick-and-morty-data', currentPage, activeFilters],
  queryFn: async () => {
    error.value = null
    const filterParams = new URLSearchParams({
      page: currentPage.value.toString(),
      ...activeFilters.value,
    })
    const response = await fetch(`https://rickandmortyapi.com/api/character?${filterParams.toString()}`)

    if (response.status === 404) {
      // API returns 404 when no results are found
      return {
        info: {
          count: 0,
          pages: 0,
          next: null,
          prev: null,
        },
        results: [],
      }
    }

    if (!response.ok) {
      throw new Error('Failed to fetch characters')
    }

    return response.json()
  },
  retry: (failureCount: number, error: Error) => {
    // Only retry on network errors, not on 404s or other API errors
    return failureCount < 2 && error.message !== 'Failed to fetch characters'
  },
  retryDelay: 1000, // Wait 1 second between retries
})

// Handle errors globally
watch(isLoading, (loading) => {
  if (!loading && !data.value && !error.value) {
    error.value = 'Failed to load characters. Please try again later.'
  }
})

function handlePageChange(page: number) {
  error.value = null
  currentPage.value = page
  refetch()
}

function handleFilter(filters: any) {
  error.value = null
  // Reset to first page when filters change
  currentPage.value = 1
  // Remove empty filter values
  activeFilters.value = Object.fromEntries(
    Object.entries(filters).filter(([_, value]) => value !== ''),
  )
  refetch()
}

const paginationInfo = computed(() => {
  const firstItemNumber = ((currentPage.value - 1) * pageSize) + 1
  const lastItemNumber = Math.min(currentPage.value * pageSize, data.value?.info?.count || 0)

  return {
    currentPage: currentPage.value,
    totalCount: data.value?.info?.count || 0,
    pageSize,
    firstItemNumber,
    lastItemNumber,
  }
})

watch([currentPage], () => {
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

      <div class="space-y-6">
        <RickAndMortyFilters @filter="handleFilter" />

        <UAlert
          v-if="error"
          color="red"
          variant="soft"
          icon="i-heroicons-exclamation-triangle"
          :title="error"
        />

        <div v-else-if="data?.results?.length === 0" class="bg-white dark:bg-stone-800 rounded-lg p-8 text-center">
          <UIcon name="i-heroicons-magnifying-glass" class="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            No characters found
          </h3>
          <p class="text-gray-500 dark:text-gray-400">
            Try adjusting your filters to find what you're looking for.
          </p>
        </div>

        <div v-else class="w-full">
          <Transition
            mode="out-in"
            enter-active-class="duration-200 ease-out"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="duration-200 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <BaseTable
              v-if="view === VIEW_TYPES.TABLE"
              :rows="data?.results || []"
              :columns="columns"
              :loading="isLoading"
              :pagination-info="paginationInfo"
              item-name="Characters"
              details-path="/rick-and-morty"
              @page-change="handlePageChange"
            />
            <BaseGrid
              v-else
              :items="data?.results || []"
              :loading="isLoading"
              :pagination-info="paginationInfo"
              item-name="Characters"
              details-path="/rick-and-morty"
              show-status
              show-origin
              image-class="object-cover"
              @page-change="handlePageChange"
            />
          </Transition>
        </div>
      </div>
    </UContainer>
  </div>
</template>
