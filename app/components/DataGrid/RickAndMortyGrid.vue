<script setup lang="ts">
import type { PaginationInfo } from '~/types/pagination'
import { useRouter } from 'vue-router'

const props = defineProps<{
  characters: any[]
  loading?: boolean
  paginationInfo: PaginationInfo
}>()

const emit = defineEmits<{
  pageChange: [page: number]
}>()

const router = useRouter()
async function handleDetails(character: any) {
  await router.push(`/rick-and-morty/${character.id}`)
}
</script>

<template>
  <div class="space-y-4">
    <DataGridBaseGrid
      :items="characters"
      :loading="loading"
    >
      <template #item="{ item: character }">
        <div
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
      </template>
    </DataGridBaseGrid>

    <RickAndMortyPaginationWrapper
      :pagination-info="paginationInfo"
      @page-change="emit('pageChange', $event)"
    />
  </div>
</template>
