<template>
  <div class="py-8">
    <UContainer>
      <div class="flex justify-between items-center border-b mb-8 py-2">
        <h1 class="text-2xl font-bold text-stone-800 dark:text-stone-200">
          Rick and Morty Characters
        </h1>
        <UButtonGroup size="sm">
          <UButton
            :color="view === VIEW_TYPES.TABLE ? 'primary' : 'gray'"
            :variant="view === VIEW_TYPES.TABLE ? 'solid' : 'ghost'"
            @click="view = VIEW_TYPES.TABLE"
            icon="i-heroicons-table-cells"
          />
          <UButton
            :color="view === VIEW_TYPES.GRID ? 'primary' : 'gray'"
            :variant="view === VIEW_TYPES.GRID ? 'solid' : 'ghost'"
            @click="view = VIEW_TYPES.GRID"
            icon="i-heroicons-squares-2x2"
          />
        </UButtonGroup>
      </div>
      <div class="w-full">
        <Transition
          mode="out-in"
          enter-active-class="duration-200 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="duration-200 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <DataTableRickAndMortyTable
            v-if="view === VIEW_TYPES.TABLE"
            :characters="data?.results"
            :loading="!data"
          />
          <DataGridRickAndMortyGrid
            v-else
            :characters="data?.results"
            :loading="!data"
          />
        </Transition>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { VIEW_TYPES, type ViewType } from '~/constants/views'

const { data } = useRickAndMortyData('character')
const view = ref<ViewType>(VIEW_TYPES.TABLE)

definePageMeta({
  title: 'Rick and Morty Characters'
})
</script> 