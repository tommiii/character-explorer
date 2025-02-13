<script setup lang="ts">
interface Episode {
  id: string
  name: string
  episode: string
  air_date: string
}

interface Character {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
  image: string
  episode: string[]
  url: string
  created: string
}

const route = useRoute()
const id = String(route.params.id)

const { data: character, pending, error } = await useRickAndMortyData<Character>(`/character/${id}`)

// Fetch episode details for each episode URL
const episodes = ref<Episode[]>([])
const isOpen = ref(true)

if (character.value) {
  const episodeData = await Promise.all(
    character.value.episode.map(async (episodeUrl) => {
      try {
        const { data } = await useRickAndMortyData<Episode>(episodeUrl.replace('https://rickandmortyapi.com/api', ''))
        if (data.value) {
          return {
            id: data.value.id || episodeUrl.split('/').pop() || '',
            name: data.value.name || 'Unknown Episode',
            episode: data.value.episode || 'Unknown',
            air_date: data.value.air_date || 'Unknown',
          }
        }
        return null
      }
      catch {
        return null
      }
    }),
  )
  episodes.value = episodeData.filter((episode): episode is Episode => episode !== null)
}

useHead({
  title: character.value?.name ? `${character.value.name} - Rick and Morty` : 'Character Details',
  meta: [
    {
      name: 'description',
      content: character.value
        ? `Learn more about ${character.value.name} from Rick and Morty. Species: ${character.value.species}, Status: ${character.value.status}`
        : 'Character details from Rick and Morty',
    },
  ],
})

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <div class="container mx-auto p-4">
    <template v-if="error">
      <div class="max-w-3xl mx-auto text-center space-y-4">
        <h1 class="text-2xl font-bold text-red-600">
          Error loading character
        </h1>
        <p class="text-gray-600">
          {{ error.message }}
        </p>
        <NuxtLink to="/rick-and-morty">
          <UButton icon="i-heroicons-arrow-left">
            Back to list
          </UButton>
        </NuxtLink>
      </div>
    </template>

    <template v-else-if="pending">
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
          <div class="md:flex">
            <div class="md:w-1/3">
              <img
                :src="character.image"
                :alt="character.name"
                class="w-full h-full object-cover"
              >
            </div>
            <div class="p-6 md:w-2/3 space-y-6">
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
                  <UBadge v-if="character.type" color="yellow">
                    {{ character.type }}
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
                  First appearance
                </h2>
                <p>
                  {{ formatDate(character.created) }}
                </p>
              </div>
            </div>
          </div>

          <div class="border-t border-gray-200 dark:border-gray-700 p-6">
            <div class="space-y-4">
              <div class="w-full">
                <UButton
                  color="gray"
                  variant="ghost"
                  class="flex w-full items-center justify-between gap-2"
                  @click="() => isOpen = !isOpen"
                >
                  <div class="flex items-center gap-2">
                    <UIcon name="i-heroicons-tv" />
                    <span>Episode Appearances ({{ episodes.length }})</span>
                  </div>
                  <UIcon
                    :name="isOpen ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'"
                    class="transition-transform"
                  />
                </UButton>

                <Transition
                  enter-active-class="transition duration-100 ease-out"
                  enter-from-class="transform scale-95 opacity-0"
                  enter-to-class="transform scale-100 opacity-100"
                  leave-active-class="transition duration-75 ease-out"
                  leave-from-class="transform scale-100 opacity-100"
                  leave-to-class="transform scale-95 opacity-0"
                >
                  <div v-show="isOpen" class="grid gap-4 sm:grid-cols-2 pt-4">
                    <UCard
                      v-for="episode in episodes"
                      :key="episode.episode"
                      class="hover:shadow-md transition-shadow"
                    >
                      <template #header>
                        <h3 class="font-medium">
                          {{ episode.name }}
                        </h3>
                      </template>
                      <div class="space-y-2">
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                          Episode: {{ episode.episode }}
                        </p>
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                          Air Date: {{ episode.air_date }}
                        </p>
                      </div>
                    </UCard>
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
