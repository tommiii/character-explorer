<script setup lang="ts">
import { useRouter } from 'vue-router'

const props = defineProps<{
  pokemon: any[]
  loading?: boolean
}>()

const router = useRouter()

const getPokemonImage = (url: string) => {
  const id = url.split('/').filter(Boolean).pop()
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}



const handleDetails = async (poke: any) => {
  const id = poke.url.split('/').filter(Boolean).pop()
  await router.push(`/pokemon/${id}`)
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
              @click="handleDetails(poke)"
            >
              Details
            </UButton>
          </div>
        </div>
      </div>
    </template>
  </DataGridBaseGrid>
</template> 