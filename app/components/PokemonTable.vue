<script setup lang="ts">
import type { PaginationInfo } from '~/types/pagination'
import type { PokemonListItem } from '~/types/pokemon'
import BaseTable from './BaseTable.vue'

const { pokemon, loading, paginationInfo } = defineProps<{
  pokemon: PokemonListItem[]
  loading?: boolean
  paginationInfo: PaginationInfo
}>()

const emit = defineEmits<{
  pageChange: [page: number]
  sizeChange: [size: number]
}>()

const columns = [
  {
    key: 'id',
    label: '#',
    class: 'w-16',
  },
  {
    key: 'image',
    label: '',
    class: 'w-[100px]',
  },
  {
    key: 'name',
    label: 'Name',
    class: 'min-w-[200px]',
  },
  {
    key: 'actions',
    label: 'Actions',
    class: 'w-[100px] text-center',
  },
]

const rows = computed(() => {
  return pokemon?.map(item => ({
    ...item,
    name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
  })) || []
})
</script>

<template>
  <BaseTable
    :rows="rows"
    :columns="columns"
    :loading="loading"
    :pagination-info="paginationInfo"
    item-name="Pokémon"
    details-path="/pokemon"
    show-page-size
    :page-size-options="[10, 20, 50, 100]"
    image-class="w-20 h-20 object-contain"
    @page-change="emit('pageChange', $event)"
    @size-change="emit('sizeChange', $event)"
  />
</template>
