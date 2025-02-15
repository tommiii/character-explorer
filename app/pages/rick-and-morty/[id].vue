<script setup lang="ts">
import type { Character, Episode } from '~/types/rick-and-morty'
import { useNuxtApp } from '#app'
import { useQuery } from '@tanstack/vue-query'

const { $apiUrls } = useNuxtApp()
const route = useRoute()
const id = computed(() => {
  const paramId = (route.params as { id: string | string[] }).id
  return typeof paramId === 'string' ? paramId : Array.isArray(paramId) ? paramId[0] : ''
})


const { data: character, isLoading: pending } = useQuery<Character>({
  queryKey: ['character-details', id],
  queryFn: () => fetch(`${$apiUrls.rickAndMorty}/character/${id.value}`).then(res => res.json()),
})

const statusColors = {
  Alive: 'green',
  Dead: 'red',
  unknown: 'gray',
} as const

useHead({
  title: character.value?.name ? `${character.value.name} - Rick and Morty` : 'Character Details',
  meta: [
    {
      name: 'description',
      content: character.value ? `Details about ${character.value.name} from Rick and Morty` : 'Character details page',
    },
  ],
})
</script>

<template>
  <div class="container mx-auto p-4">
    <template v-if="pending">
      <div class="flex justify-center items-center min-h-[400px]">
        <UIcon name="i-heroicons-arrow-path" class="animate-spin h-8 w-8" />
      </div>
    </template>

    <template v-else-if="character">
      <div class="max-w-4xl mx-auto space-y-6">
        <div>
          <NuxtLink to="/rick-and-morty">
            <UButton
              icon="i-heroicons-arrow-left"
              variant="ghost"
            >
              Back to list
            </UButton>
          </NuxtLink>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div class="relative bg-gray-100 dark:bg-gray-700/50 p-8">
            <div class="absolute top-4 right-4">
              <span class="text-2xl font-bold text-gray-400">
                #{{ character.id }}
              </span>
            </div>
            <div class="flex flex-col md:flex-row gap-8 items-center">
              <div class="relative">
                <img
                  :src="character.image"
                  :alt="character.name"
                  class="w-64 h-64 object-cover rounded-lg"
                >
              </div>
              <div class="space-y-4 text-center md:text-left flex-1">
                <div>
                  <h1 class="text-3xl font-bold">
                    {{ character.name }}
                  </h1>
                </div>
                <div class="flex flex-wrap gap-2 justify-center md:justify-start">
                  <UBadge
                    :color="statusColors[character.status as keyof typeof statusColors]"
                    class="capitalize"
                  >
                    {{ character.status }}
                  </UBadge>
                  <UBadge color="blue" class="capitalize">
                    {{ character.species }}
                  </UBadge>
                  <UBadge color="purple" class="capitalize">
                    {{ character.gender }}
                  </UBadge>
                </div>
              </div>
            </div>
          </div>
          <div class="p-6 space-y-8">
            <div>
              <h2 class="text-xl font-semibold mb-4">
                Character Information
              </h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    Origin
                  </div>
                  <div class="font-medium">
                    {{ character.origin.name }}
                  </div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    Last Known Location
                  </div>
                  <div class="font-medium">
                    {{ character.location.name }}
                  </div>
                </div>
                <div v-if="character.type" class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    Type
                  </div>
                  <div class="font-medium">
                    {{ character.type }}
                  </div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    Number of Episodes
                  </div>
                  <div class="font-medium">
                    {{ character.episode.length }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
