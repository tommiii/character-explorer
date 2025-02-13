<script setup lang="ts">
const props = defineProps<{
  pokemon: any[]
  loading?: boolean
}>()

const getPokemonImage = (url: string) => {
  const id = url.split('/').filter(Boolean).pop()
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}
</script>

<template>
  <DataGridBaseGrid
    :items="pokemon"
    :loading="loading"
  >
    <template #item="{ item: poke, index }">
      <div class="p-4">
        <div class="relative pt-[100%]">
          <img
            :src="getPokemonImage(poke.url)"
            :alt="poke.name"
            class="absolute inset-0 w-full h-full object-contain p-4"
          >
        </div>
        <div class="space-y-2 text-center">
          <h3 class="font-medium text-lg capitalize">{{ poke.name }}</h3>
          <UBadge
            color="gray"
            size="sm"
            class="font-mono"
          >
            #{{ String(index + 1).padStart(3, '0') }}
          </UBadge>
          <div class="pt-2">
            <UButton
              size="sm"
              color="primary"
              variant="soft"
            >
              Details
            </UButton>
          </div>
        </div>
      </div>
    </template>
  </DataGridBaseGrid>
</template> 