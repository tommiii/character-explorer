<script setup lang="ts">
import type { PaginationInfo } from '~/types/pagination'

interface Column {
  key: string
  label: string
  class?: string
}

interface Props {
  rows: any[]
  columns: Column[]
  loading?: boolean
  paginationInfo: PaginationInfo
  itemName: string
  showPageSize?: boolean
  pageSizeOptions?: number[]
  detailsPath: string
  imageClass?: string
}

defineProps<Props>()

const emit = defineEmits<{
  pageChange: [page: number]
  sizeChange: [size: number]
}>()

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
          v-for="row in rows"
          :key="row.id"
          class="bg-white dark:bg-stone-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700"
        >
          <div class="flex gap-4">
            <img
              v-if="row.image"
              :src="row.image"
              :alt="row.name"
              class="w-20 h-20 rounded-lg object-cover"
            >
            <div class="flex-1 min-w-0">
              <h3 class="font-medium text-lg mb-1 truncate">
                {{ row.name }}
              </h3>
              <div class="space-y-1">
                <template v-if="row.status">
                  <p class="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    <UBadge
                      :color="row.status === 'Alive' ? 'green' : row.status === 'Dead' ? 'red' : 'gray'"
                      size="sm"
                    >
                      {{ row.status }}
                    </UBadge>
                    <span class="text-gray-400">|</span>
                    {{ row.species }}
                  </p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 truncate">
                    From: {{ row.origin?.name }}
                  </p>
                </template>
              </div>
              <div class="mt-3">
                <NuxtLink :to="`${detailsPath}/${row.id}`">
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
          :rows="rows"
          :columns="columns"
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
              :class="imageClass"
            >
          </template>

          <template #status-data="{ row }">
            <UBadge
              v-if="row.status"
              :color="row.status === 'Alive' ? 'green' : row.status === 'Dead' ? 'red' : 'gray'"
              size="sm"
            >
              {{ row.status }}
            </UBadge>
          </template>

          <template #origin-data="{ row }">
            {{ row.origin?.name }}
          </template>

          <template #actions-data="{ row }">
            <NuxtLink :to="`${detailsPath}/${row.id}`">
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

      <BasePagination
        :pagination-info="paginationInfo"
        :item-name="itemName"
        :show-page-size="showPageSize"
        :page-size-options="pageSizeOptions"
        @page-change="emit('pageChange', $event)"
        @size-change="emit('sizeChange', $event)"
      />
    </div>
  </div>
</template>
