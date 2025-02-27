<script setup lang="ts">
import type { ViewType } from '~/constants/views'
import type { RickAndMortyApiResponse } from '~/types/rick-and-morty'
import { useNuxtApp } from '#app'
import { useQuery } from '@tanstack/vue-query'
import RickAndMortyFilters from '~/components/RickAndMorty/RickAndMortyFilters.vue'
import RickAndMortyGrid from '~/components/RickAndMorty/RickAndMortyGrid.vue'
import RickAndMortyTable from '~/components/RickAndMorty/RickAndMortyTable.vue'
import { VIEW_TYPES } from '~/constants/views'

const { $apiUrls } = useNuxtApp()

const currentPage = ref(1)
const view = ref<ViewType>(VIEW_TYPES.TABLE)
const pageSize = 20
const activeFilters = ref({})
const error = ref<string | null>(null)

const { data, refetch, isLoading } = useQuery({
  queryKey: ['rick-and-morty-data', currentPage, activeFilters],
  queryFn: async () => {
    error.value = null
    const filterParams = new URLSearchParams({
      page: currentPage.value.toString(),
      ...activeFilters.value,
    })
    const response = await fetch(`${$apiUrls.rickAndMorty}/character?${filterParams.toString()}`)

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
      } as RickAndMortyApiResponse
    }

    if (!response.ok) {
      throw new Error('Failed to fetch characters')
    }

    return response.json() as Promise<RickAndMortyApiResponse>
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
            <RickAndMortyTable
              v-if="view === VIEW_TYPES.TABLE"
              :characters="data?.results || []"
              :loading="isLoading"
            />
            <RickAndMortyGrid
              v-else
              :characters="data?.results || []"
              :loading="isLoading"
            />
          </Transition>
          <BasePagination
            :pagination-info="paginationInfo"
            @page-change="handlePageChange"
          />
        </div>
      </div>
    </UContainer>
  </div>
</template>
