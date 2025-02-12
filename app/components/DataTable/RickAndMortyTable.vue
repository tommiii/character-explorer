<script setup lang="ts">
const columns = [
  {
    key: 'name',
    label: 'Character',
    sortable: true,
    class: 'w-[180px]',
  },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
    class: 'w-[100px]',
  },
  {
    key: 'species',
    label: 'Species',
    sortable: true,
    class: 'w-[120px]',
  },
  {
    key: 'gender',
    label: 'Gender',
    sortable: true,
    class: 'w-[100px]',
  },
  {
    key: 'origin',
    label: 'Origin',
    sortable: true,
    class: 'min-w-[160px]',
  },
  {
    key: 'actions',
    label: 'Actions',
    sortable: false,
    class: 'w-[100px] text-right',
  },
]

const props = defineProps<{
  characters: any[]
  loading?: boolean
}>()

const rows = computed(() => {
  return props.characters?.map(character => ({
    ...character,
    origin: character.origin.name,
  })) || []
})

console.log({rows: rows.value})
</script>

<template>
  <div class="space-y-4">
    <DataTableBaseTable
      :columns="columns"
      :rows="rows"
      :loading="loading"
    />   
  </div>
</template> 