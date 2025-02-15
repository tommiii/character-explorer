<script setup lang="ts">
import type { PaginationInfo } from '~/types/pagination'

interface Props {
  items: any[]
  loading?: boolean
  paginationInfo: PaginationInfo
  itemName: string
  showPageSize?: boolean
  pageSizeOptions?: number[]
  detailsPath: string
  imageClass?: string
  showStatus?: boolean
  showOrigin?: boolean
  imageContainerClass?: string
}

defineProps<Props>()

const emit = defineEmits<{
  pageChange: [page: number]
  sizeChange: [size: number]
}>()
</script>

<template>
  <div class="space-y-4">
    <div v-if="loading" class="flex items-center justify-center p-4">
      <UIcon name="i-heroicons-arrow-path" class="animate-spin h-6 w-6" />
    </div>

    <div v-else-if="!items.length" class="flex flex-col items-center justify-center p-4 text-gray-500">
      <UIcon name="i-heroicons-inbox" class="h-8 w-8 mb-2" />
      <p>No data available</p>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="item in items"
        :key="item.id"
        class="bg-white dark:bg-stone-800 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-200 dark:border-gray-700"
      >
        <div class="overflow-hidden" :class="[imageContainerClass || 'bg-gray-50 dark:bg-gray-900']">
          <img
            :src="item.image"
            :alt="item.name"
            class="w-full h-48 transform group-hover:scale-105 transition-transform duration-300" :class="[imageClass]"
          >
        </div>
        <div class="p-4 space-y-2">
          <div class="flex justify-between items-center">
            <h3 class="font-medium text-lg capitalize">
              {{ item.name }}
            </h3>
            <span v-if="item.id" class="text-lg font-semibold text-primary-500 dark:text-primary-400">
              #{{ item.id.toString().padStart(3, '0') }}
            </span>
          </div>

          <template v-if="showStatus && item.status">
            <div class="flex flex-wrap gap-2">
              <UBadge
                :color="item.status === 'Alive' ? 'green' : item.status === 'Dead' ? 'red' : 'gray'"
                class="capitalize"
              >
                {{ item.status }}
              </UBadge>
              <UBadge color="blue" class="capitalize">
                {{ item.species }}
              </UBadge>
              <UBadge color="purple" class="capitalize">
                {{ item.gender }}
              </UBadge>
            </div>
            <div v-if="showOrigin" class="text-sm text-gray-600 dark:text-gray-400">
              From: {{ item.origin?.name }}
            </div>
          </template>

          <div class="pt-2 text-center">
            <NuxtLink :to="`${detailsPath}/${item.id}`">
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

    <BasePagination
      :pagination-info="paginationInfo"
      :item-name="itemName"
      :show-page-size="showPageSize"
      :page-size-options="pageSizeOptions"
      @page-change="emit('pageChange', $event)"
      @size-change="emit('sizeChange', $event)"
    />
  </div>
</template>
