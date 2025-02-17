<script setup lang="ts">
import type { Pokemon, PokemonSpecies } from '~/types/pokemon'
import { useNuxtApp } from '#app'
import { useQuery } from '@tanstack/vue-query'

const { $apiUrls } = useNuxtApp()
const route = useRoute()
const id = computed(() => {
  const paramId = (route.params as { id: string | string[] }).id
  return typeof paramId === 'string' ? paramId : Array.isArray(paramId) ? paramId[0] : ''
})

const { data: pokemon, isLoading: pending, error: pokemonError } = useQuery<Pokemon>({
  queryKey: ['pokemon-details', id],
  queryFn: () => fetch(`${$apiUrls.pokemon}/pokemon/${id.value}`).then(res => res.json()),
})

const { data: species, error: speciesError } = useQuery<PokemonSpecies>({
  queryKey: ['pokemon-species', id],
  queryFn: () => fetch(`${$apiUrls.pokemon}/pokemon-species/${id.value}`).then(res => res.json()),
  enabled: !!pokemon.value,
})

const error = computed(() => {
  return pokemonError?.value || speciesError?.value
})

const description = computed(() => {
  return species.value?.flavor_text_entries.find((entry: { language: { name: string } }) => entry.language.name === 'en')?.flavor_text.replace(/\f/g, ' ') || ''
})

const genus = computed(() => {
  return species.value?.genera.find((entry: { language: { name: string } }) => entry.language.name === 'en')?.genus || ''
})

const typeColors = {
  normal: 'gray',
  fire: 'red',
  water: 'blue',
  electric: 'yellow',
  grass: 'green',
  ice: 'sky',
  fighting: 'orange',
  poison: 'purple',
  ground: 'amber',
  flying: 'indigo',
  psychic: 'pink',
  bug: 'lime',
  rock: 'amber',
  ghost: 'violet',
  dragon: 'rose',
  dark: 'gray',
  steel: 'gray',
  fairy: 'pink',
} as const

useHead({
  title: pokemon.value?.name
    ? `${pokemon.value.name.charAt(0).toUpperCase() + pokemon.value.name.slice(1)} - Pokémon`
    : 'Pokémon Details',
  meta: [
    {
      name: 'description',
      content: description.value || 'Pokémon details page',
    },
  ],
})

function formatNumber(num: number) {
  return `#${String(num).padStart(3, '0')}`
}
</script>

<template>
  <div class="container mx-auto p-4">
    <template v-if="error">
      <div class="max-w-3xl mx-auto text-center space-y-4">
        <h1 class="text-2xl font-bold text-red-600">
          Error loading Pokémon
        </h1>
        <NuxtLink to="/pokemon">
          <UButton icon="i-heroicons-arrow-left">
            Back to list
          </UButton>
        </NuxtLink>
      </div>
    </template>

    <template v-if="pending">
      <div class="flex justify-center items-center min-h-[400px]">
        <UIcon name="i-heroicons-arrow-path" class="animate-spin h-8 w-8" />
      </div>
    </template>

    <template v-else-if="pokemon">
      <div class="max-w-4xl mx-auto space-y-6">
        <div>
          <NuxtLink to="/pokemon">
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
                {{ formatNumber(pokemon.id) }}
              </span>
            </div>
            <div class="flex flex-col md:flex-row gap-8 items-center">
              <div class="relative">
                <img
                  :src="pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default"
                  :alt="pokemon.name"
                  class="w-64 h-64 object-contain"
                >
                <div class="absolute bottom-0 left-0 right-0 flex justify-center gap-2">
                  <img
                    v-if="pokemon.sprites.front_default"
                    :src="pokemon.sprites.front_default"
                    :alt="`${pokemon.name} front sprite`"
                    class="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg p-1"
                  >
                  <img
                    v-if="pokemon.sprites.back_default"
                    :src="pokemon.sprites.back_default"
                    :alt="`${pokemon.name} back sprite`"
                    class="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg p-1"
                  >
                  <img
                    v-if="pokemon.sprites.front_shiny"
                    :src="pokemon.sprites.front_shiny"
                    :alt="`${pokemon.name} shiny sprite`"
                    class="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg p-1"
                  >
                </div>
              </div>
              <div class="space-y-4 text-center md:text-left flex-1">
                <div>
                  <h1 class="text-3xl font-bold capitalize">
                    {{ pokemon.name }}
                  </h1>
                  <p v-if="genus" class="text-gray-600 dark:text-gray-400">
                    {{ genus }}
                  </p>
                </div>
                <p v-if="description" class="text-gray-700 dark:text-gray-300">
                  {{ description }}
                </p>
                <div class="flex flex-wrap gap-2 justify-center md:justify-start">
                  <UBadge
                    v-for="type in pokemon.types"
                    :key="type.type.name"
                    :color="typeColors[type.type.name as keyof typeof typeColors]"
                    class="capitalize"
                  >
                    {{ type.type.name }}
                  </UBadge>
                </div>
              </div>
            </div>
          </div>
          <div class="p-6 space-y-8">
            <div>
              <h2 class="text-xl font-semibold mb-4">
                Base Stats
              </h2>
              <div class="grid gap-4">
                <div
                  v-for="stat in pokemon.stats"
                  :key="stat.stat.name"
                  class="flex items-center gap-4"
                >
                  <span class="w-32 font-medium capitalize">{{ stat.stat.name.replace('-', ' ') }}</span>
                  <div class="flex-1">
                    <UProgress
                      :value="stat.base_stat"
                      :max="255"
                      :color="stat.base_stat > 100 ? 'green' : stat.base_stat > 50 ? 'yellow' : 'red'"
                    />
                  </div>
                  <span class="w-12 text-right font-mono">
                    {{ stat.base_stat }}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h2 class="text-xl font-semibold mb-4">
                Physical Characteristics
              </h2>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-center">
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    Height
                  </div>
                  <div class="font-medium">
                    {{ pokemon.height / 10 }} m
                  </div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-center">
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    Weight
                  </div>
                  <div class="font-medium">
                    {{ pokemon.weight / 10 }} kg
                  </div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-center">
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    Base Experience
                  </div>
                  <div class="font-medium">
                    {{ pokemon.base_experience }}
                  </div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-center">
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    Abilities
                  </div>
                  <div class="font-medium capitalize">
                    {{ pokemon.abilities.map(a => a.ability.name).join(', ') }}
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
