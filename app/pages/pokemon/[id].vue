<script setup lang="ts">
const route = useRoute()
const id = route.params.id as string

const { data: pokemon, pending } = await usePokemonData(`/pokemon/${id}`)

useHead({
  title: pokemon.value?.name ? `${pokemon.value.name.charAt(0).toUpperCase() + pokemon.value.name.slice(1)} - Pokemon` : 'Pokemon Details'
})
</script>

<template>
  <div class="container mx-auto p-4">
    <template v-if="pending">
      <div class="flex justify-center items-center min-h-[400px]">
        <UIcon name="i-heroicons-arrow-path" class="animate-spin h-8 w-8" />
      </div>
    </template>
    
    <template v-else-if="pokemon">
      <div class="max-w-3xl mx-auto space-y-6">
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

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 space-y-6">
          <div class="flex flex-col md:flex-row gap-8 items-center">
            <img
              :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`"
              :alt="pokemon.name"
              class="w-64 h-64 object-contain"
            >
            <div class="space-y-4 text-center md:text-left">
              <h1 class="text-3xl font-bold capitalize">{{ pokemon.name }}</h1>
              <div class="flex flex-wrap gap-2 justify-center md:justify-start">
                <UBadge
                  v-for="type in pokemon.types"
                  :key="type.type.name"
                  color="primary"
                >
                  {{ type.type.name }}
                </UBadge>
              </div>
            </div>
          </div>

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
                  color="primary"
                />
              </div>
              <span class="w-12 text-right">{{ stat.base_stat }}</span>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-center">
              <div class="text-sm text-gray-600 dark:text-gray-400">Height</div>
              <div class="font-medium">{{ pokemon.height / 10 }} m</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-center">
              <div class="text-sm text-gray-600 dark:text-gray-400">Weight</div>
              <div class="font-medium">{{ pokemon.weight / 10 }} kg</div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template> 