<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import PokemonGrid from '~/components/PokemonGrid.vue'
import PokemonTable from '~/components/PokemonTable.vue'
import { VIEW_TYPES, type ViewType } from '~/constants/views'

const currentPage = ref(1)
const pageSize = ref(20)
const view = ref<ViewType>(VIEW_TYPES.TABLE)

const { data, refetch } = useQuery({
  queryKey: ['pokemon-data', currentPage, pageSize],
  queryFn: () => fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pageSize.value}&offset=${(currentPage.value - 1) * pageSize.value}`).then(res => res.json()),
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

const paginationInfo = computed(() => {
  return {
    currentPage: currentPage.value,
    totalCount: data?.value?.count || 0,
    pageSize: pageSize.value,
  }
})

watch([currentPage, pageSize], () => {
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
          <PokemonTable
            v-if="view === VIEW_TYPES.TABLE"
            :pokemon="data?.results || []"
            :loading="!data"
            :pagination-info="{
              currentPage,
              totalCount: data?.count || 0,
              // pages: data?.count ? Math.ceil(data.count / pageSize) : 0,
              pageSize,
            }"
            @page-change="handlePageChange"
            @size-change="handlePageSizeChange"
          />
          <PokemonGrid
            v-else
            :pokemons="data?.results || []"
            :loading="!data"
            :pagination-info="paginationInfo"
            @page-change="handlePageChange"
            @size-change="handlePageSizeChange"
          />
        </Transition>
      </div>
    </UContainer>
  </div>
</template>
