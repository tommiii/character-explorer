<script setup lang="ts">
import type { PaginationInfo } from '~/types/pagination'
import type { CharacterListItem } from '~/types/rick-and-morty'
import BaseTable from './BaseTable.vue'

const { characters, loading, paginationInfo } = defineProps<{
  characters: CharacterListItem[]
  loading?: boolean
  paginationInfo: PaginationInfo
}>()

const emit = defineEmits<{
  pageChange: [page: number]
}>()

const columns = [
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
        <BaseTable
          :rows="characters"
          :columns="columns"
          :loading="loading"
          :pagination-info="paginationInfo"
          item-name="Characters"
          details-path="/rick-and-morty"
          @page-change="emit('pageChange', $event)"
        />
      </div>
    </div>
  </div>
</template>
