<script setup lang="ts">
import type { PaginationInfo } from '~/types/pagination'
import type { CharacterListItem } from '~/types/rick-and-morty'
import { useRouter } from 'vue-router'
import BasePagination from '../BasePagination.vue'

const { characters, loading, paginationInfo } = defineProps<{
  characters: CharacterListItem[]
  loading?: boolean
  paginationInfo: PaginationInfo
}>()

const emit = defineEmits<{
  pageChange: [page: number]
}>()

const router = useRouter()
async function handleDetails(character: CharacterListItem) {
  await router.push(`/rick-and-morty/${character.id}`)
}
</script>

<template>
  <div class="space-y-4">
    <div v-if="loading" class="flex items-center justify-center p-4">
      <UIcon name="i-heroicons-arrow-path" class="animate-spin h-6 w-6" />
    </div>

    <div v-else-if="!characters.length" class="flex flex-col items-center justify-center p-4 text-gray-500">
      <UIcon name="i-heroicons-inbox" class="h-8 w-8 mb-2" />
      <p>No data available</p>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="character in characters"
        :key="character.id"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-200 dark:border-gray-700"
      >
        <img
          :src="character.image"
          :alt="character.name"
          class="w-full h-48 object-cover"
        >
        <div class="p-4 space-y-2">
          <h3 class="font-medium text-lg truncate">
            {{ character.name }}
          </h3>
          <div class="flex flex-wrap gap-2">
            <UBadge
              :color="character.status === 'Alive' ? 'green' : character.status === 'Dead' ? 'red' : 'gray'"
              size="sm"
              class="font-medium"
            >
              {{ character.status }}
            </UBadge>
            <UBadge color="gray" size="sm" class="font-medium">
              {{ character.species }}
            </UBadge>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400 truncate">
            From: {{ character.origin.name }}
          </p>
          <div class="pt-2 text-center">
            <UButton
              size="sm"
              color="primary"
              variant="soft"
              @click="handleDetails(character)"
            >
              Details
            </UButton>
          </div>
        </div>
      </div>
    </div>
    <BasePagination
      :pagination-info="paginationInfo"
      item-name="Rick and Morty Character"
      @page-change="emit('pageChange', $event)"
    />
  </div>
</template>