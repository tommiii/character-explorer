<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import BaseGrid from '~/components/BaseGrid.vue'
import BaseTable from '~/components/BaseTable.vue'
import { VIEW_TYPES, type ViewType } from '~/constants/views'

interface PokemonListResult {
  name: string
  url: string
}

interface PokemonApiResponse {
  count: number
  next: string | null
  previous: string | null
  results: PokemonListResult[]
}

const currentPage = ref(1)
const pageSize = ref(20)
const view = ref<ViewType>(VIEW_TYPES.TABLE)

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

const { data, refetch, isLoading } = useQuery({
  queryKey: ['pokemon-list', currentPage, pageSize],
  queryFn: async () => {
    const offset = (currentPage.value - 1) * pageSize.value
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${pageSize.value}`)
    if (!response.ok) {
      throw new Error('Failed to fetch pokemon')
    }
    const data = await response.json() as PokemonApiResponse

    // Fetch additional details for each pokemon to get their images
    const pokemonDetails = await Promise.all(
      data.results.map(async (pokemon: PokemonListResult) => {
        const detailResponse = await fetch(pokemon.url)
        const detail = await detailResponse.json()
        return {
          id: detail.id,
          name: pokemon.name,
          image: detail.sprites.other['official-artwork'].front_default,
        }
      }),
    )

    return {
      ...data,
      results: pokemonDetails,
    }
  },
})

function handlePageChange(page: number) {
  currentPage.value = page
  refetch()
}

function handlePageSizeChange(size: number) {
  pageSize.value = size
  currentPage.value = 1 // Reset to first page when changing page size
  refetch()
}

const items = computed(() => {
  return data.value?.results?.map(pokemon => ({
    ...pokemon,
    name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
  })) || []
})

const paginationInfo = computed(() => {
  const firstItemNumber = ((currentPage.value - 1) * pageSize.value) + 1
  const lastItemNumber = Math.min(currentPage.value * pageSize.value, data.value?.count || 0)

  return {
    currentPage: currentPage.value,
    totalCount: data.value?.count || 0,
    pageSize: pageSize.value,
    firstItemNumber,
    lastItemNumber,
  }
})

watch([currentPage], () => {
  refreshNuxtData()
})

definePageMeta({
  title: 'Pokémon List',
})
</script>

<template>
  <div class="py-8">
    <UContainer>
      <div class="flex justify-between items-center border-b mb-8 py-2">
        <h1 class="text-2xl font-bold text-stone-800 dark:text-stone-200">
          Pokémon List
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
          <BaseTable
            v-if="view === VIEW_TYPES.TABLE"
            :rows="items"
            :columns="columns"
            :loading="isLoading"
            :pagination-info="paginationInfo"
            item-name="Pokémon"
            details-path="/pokemon"
            show-page-size
            :page-size-options="[10, 20, 50, 100]"
            image-class="w-20 h-20 object-contain"
            @page-change="handlePageChange"
            @size-change="handlePageSizeChange"
          />
          <BaseGrid
            v-else
            :items="items"
            :loading="isLoading"
            :pagination-info="paginationInfo"
            item-name="Pokémon"
            details-path="/pokemon"
            show-page-size
            :page-size-options="[10, 20, 50, 100]"
            image-class="object-contain"
            image-container-class="bg-gray-50 dark:bg-gray-900"
            @page-change="handlePageChange"
            @size-change="handlePageSizeChange"
          />
        </Transition>
      </div>
    </UContainer>
  </div>
</template>
