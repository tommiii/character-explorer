<script setup lang="ts">
interface Column {
  key: string
  label: string
  sortable?: boolean
  class?: string
}

const props = defineProps<{
  columns: Column[]
  rows: any[]
  loading?: boolean
}>()

const sortBy = ref('')
const sortDirection = ref('asc')

const handleSort = (column: Column) => {
  if (!column.sortable) return
  
  if (sortBy.value === column.key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = column.key
    sortDirection.value = 'asc'
  }
}

const sortedRows = computed(() => {
  if (!sortBy.value) return props.rows
  
  return [...props.rows].sort((a, b) => {
    const aValue = a[sortBy.value]
    const bValue = b[sortBy.value]
    
    if (sortDirection.value === 'asc') {
      return aValue < bValue ? -1 : 1
    }
    return aValue > bValue ? -1 : 1
  })
})


</script>

<template>
  <div class="w-full">
    <div class="max-w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
      <UTable
        :rows="sortedRows"
        :columns="columns"
        :loading="loading"
        hover
        @select="handleSort"
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
          <div :class="['flex items-center gap-2', column.class]">
            {{ column.label }}
            <UIcon
              v-if="column.sortable"
              :name="sortBy === column.key 
                ? sortDirection === 'asc' 
                  ? 'i-heroicons-arrow-up' 
                  : 'i-heroicons-arrow-down'
                : 'i-heroicons-arrows-up-down'"
              class="h-4 w-4"
            />
          </div>
        </template>

        <template #cell="{ column, row }">
          <div :class="column.class">
            <slot :name="`cell-${column.key}`" :row="row" :column="column">
              {{ row[column.key] }}
            </slot>
          </div>
        </template>
      </UTable>
    </div>
  </div>
</template> 