<script setup lang="ts">
const props = defineProps<{
  loading?: boolean
  items: any[]
}>()
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    <template v-if="loading">
      <div 
        v-for="n in 8" 
        :key="n"
        class="bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse h-[280px]"
      ></div>
    </template>
    
    <template v-else>
      <div
        v-for="(item, index) in items"
        :key="item.id || item.name || index"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-200 dark:border-gray-700"
      >
        <slot name="item" :item="item" :index="index"></slot>
      </div>
    </template>
  </div>
</template> 