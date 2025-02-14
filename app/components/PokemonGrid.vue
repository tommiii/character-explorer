<script setup lang="ts">
import type { PaginationInfo } from '~/types/pagination'
import { useRouter } from 'vue-router'
import PokemonPagination from './PokemonPagination.vue'

interface Props {
  pokemons: any[]
  loading?: boolean
  paginationInfo: PaginationInfo
}

defineProps<Props>()

const emit = defineEmits<{
  pageChange: [page: number]
  sizeChange: [size: number]
}>()

const router = useRouter()
async function handleDetails(pokemon: any) {
  await router.push(`/pokemon/${pokemon.id}`)
}
</script>

<template>
  <div class="space-y-4">
    <div v-if="loading" class="flex items-center justify-center p-4">
      <UIcon name="i-heroicons-arrow-path" class="animate-spin h-6 w-6" />
    </div>

    <div v-else-if="!pokemons.length" class="flex flex-col items-center justify-center p-4 text-gray-500">
      <UIcon name="i-heroicons-inbox" class="h-8 w-8 mb-2" />
      <p>No data available</p>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="pokemon in pokemons"
        :key="pokemon.id"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-200 dark:border-gray-700"
      >
        <img
          :src="pokemon.image"
          :alt="pokemon.name"
          class="w-full h-48 object-contain bg-gray-50 dark:bg-gray-900"
        >
        <div class="p-4 space-y-2">
          <div class="flex justify-between items-center">
            <h3 class="font-medium text-lg capitalize">
              {{ pokemon.name }}
            </h3>
            <span class="text-lg font-semibold text-primary-500 dark:text-primary-400">
              #{{ pokemon.id.toString().padStart(3, '0') }}
            </span>
          </div>
          <div class="pt-2 text-center">
            <UButton
              size="sm"
              color="primary"
              variant="soft"
              @click="handleDetails(pokemon)"
            >
              Details
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <PokemonPagination
      :pagination-info="paginationInfo"
      @page-change="emit('pageChange', $event)"
      @size-change="emit('sizeChange', $event)"
    />
  </div>
</template>
