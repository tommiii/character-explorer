<script setup lang="ts">
const route = useRoute()
const id = route.params.id as string

const { data: character, pending } = await useRickAndMortyData(`/character/${id}`)

useHead({
  title: character.value?.name ? `${character.value.name} - Rick and Morty` : 'Character Details',
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
      <div class="max-w-3xl mx-auto space-y-6">
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
          <img
            :src="character.image"
            :alt="character.name"
            class="w-full h-96 object-cover"
          >

          <div class="p-6 space-y-6">
            <div class="space-y-4">
              <h1 class="text-3xl font-bold">
                {{ character.name }}
              </h1>
              <div class="flex flex-wrap gap-2">
                <UBadge
                  :color="character.status === 'Alive' ? 'green' : character.status === 'Dead' ? 'red' : 'gray'"
                  class="font-medium"
                >
                  {{ character.status }}
                </UBadge>
                <UBadge color="primary">
                  {{ character.species }}
                </UBadge>
                <UBadge color="gray">
                  {{ character.gender }}
                </UBadge>
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <h2 class="font-medium text-gray-500 dark:text-gray-400">
                  Origin
                </h2>
                <p class="text-lg">
                  {{ character.origin.name }}
                </p>
              </div>
              <div class="space-y-2">
                <h2 class="font-medium text-gray-500 dark:text-gray-400">
                  Last known location
                </h2>
                <p class="text-lg">
                  {{ character.location.name }}
                </p>
              </div>
            </div>

            <div class="space-y-2">
              <h2 class="font-medium text-gray-500 dark:text-gray-400">
                Episodes
              </h2>
              <div class="grid gap-2">
                <UBadge
                  v-for="episode in character.episode"
                  :key="episode"
                  color="gray"
                  variant="soft"
                >
                  Episode {{ episode.split('/').pop() }}
                </UBadge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
