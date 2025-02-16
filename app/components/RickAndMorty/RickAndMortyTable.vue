<script setup lang="ts">
import type { CharacterListItem } from '~/types/rick-and-morty'
import { onMounted, onUnmounted, ref } from 'vue'

const { characters, loading } = defineProps<{
  characters: CharacterListItem[]
  loading?: boolean
}>()

const RICK_AND_MORTY_TABLE_COLUMNS = [
  {
    key: 'id',
    label: '#',
    class: 'w-16 hidden sm:table-cell',
  },
  {
    key: 'image',
    label: '',
    class: 'w-[80px]',
  },
  {
    key: 'name',
    label: 'Character',
    class: 'w-[180px]',
  },
  {
    key: 'status',
    label: 'Status',
    class: 'w-[100px] hidden sm:table-cell',
  },
  {
    key: 'species',
    label: 'Species',
    class: 'w-[120px] hidden md:table-cell',
  },
  {
    key: 'gender',
    label: 'Gender',
    class: 'w-[100px] hidden lg:table-cell',
  },
  {
    key: 'origin',
    label: 'Origin',
    class: 'min-w-[160px] hidden md:table-cell',
  },
  {
    key: 'actions',
    label: 'Actions',
    class: 'w-[100px] text-center',
  },
]

const isMobile = ref(false)

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

function checkMobile() {
  isMobile.value = window.innerWidth < 640
}
</script>

<template>
  <div class="space-y-4">
    <div class="w-full">
      <!-- Mobile Card View -->
      <div v-if="isMobile" class="space-y-4">
        <div
          v-for="character in characters"
          :key="character.id"
          class="bg-white dark:bg-stone-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700"
        >
          <div class="flex gap-4">
            <img
              :src="character.image"
              :alt="character.name"
              class="w-20 h-20 rounded-lg object-cover"
            >
            <div class="flex-1 min-w-0">
              <h3 class="font-medium text-lg mb-1 truncate">
                {{ character.name }}
              </h3>
              <div class="space-y-1">
                <p class="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <UBadge
                    :color="character.status === 'Alive' ? 'green' : character.status === 'Dead' ? 'red' : 'gray'"
                    size="sm"
                  >
                    {{ character.status }}
                  </UBadge>
                  <span class="text-gray-400">|</span>
                  {{ character.species }}
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400 truncate">
                  From: {{ character.origin.name }}
                </p>
              </div>
              <div class="mt-3">
                <NuxtLink :to="`/rick-and-morty/${character.id}`">
                  <UButton
                    size="sm"
                    color="primary"
                    variant="soft"
                    block
                  >
                    View Details
                  </UButton>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Desktop Table View -->
      <div v-else class="max-w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
        <UTable
          :rows="characters"
          :columns="RICK_AND_MORTY_TABLE_COLUMNS"
          :loading="loading"
          hover
          class="w-full"
        >
          <template #loading>
            <div class="flex items-center justify-center p-4">
              <UIcon name="i-heroicons-arrow-path" class="animate-spin h-6 w-6" />
            </div>
          </template>

          <template #empty-state>
            <div class="flex flex-col items-center justify-center p-4 text-gray-500">
              <UIcon name="i-heroicons-inbox" class="h-8 w-8 mb-2" />
              <p>No data available</p>
            </div>
          </template>

          <template #header-cell="{ column }">
            <div class="flex items-center gap-2" :class="[column.class]">
              {{ column.label }}
            </div>
          </template>

          <template #image-data="{ row }">
            <img
              :src="row.image"
              :alt="row.name"
              class="w-16 h-16 rounded-full object-cover"
            >
          </template>

          <template #origin-data="{ row }">
            {{ row.origin.name }}
          </template>

          <template #actions-data="{ row }">
            <NuxtLink :to="`/rick-and-morty/${row.id}`">
              <UButton
                size="sm"
                color="primary"
                variant="soft"
              >
                Details
              </UButton>
            </NuxtLink>
          </template>
        </UTable>
      </div>
    </div>
  </div>
</template>
