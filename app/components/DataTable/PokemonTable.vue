<script setup lang="ts">
const props = defineProps<{
  pokemon: any[]
  loading?: boolean
}>()

const columns = [
  {
    key: 'id',
    label: '#',
    sortable: true,
    class: 'w-16',
  },
  {
    key: 'name',
    label: 'Name',
    sortable: true,
    class: 'min-w-[200px]',
  },
  {
    key: 'actions',
    label: 'Actions',
    sortable: false,
    class: 'w-[100px] text-center',
  },
]

const rows = computed(() => {
  return props.pokemon?.map((pokemon, index) => ({
    id: index + 1,
    name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
    url: pokemon.url,
  })) || []
})
</script>

<template>
  <div class="space-y-4">
    <DataTableBaseTable
      :columns="columns"
      :rows="rows"
      :loading="loading"
    >
      <template #actions-data="{ row }">
        <NuxtLink :to="`/pokemon/${row.id}`">
          <UButton
            size="sm"
            color="primary"
            variant="soft"
          >
            Details
          </UButton>
        </NuxtLink>
      </template>
    </DataTableBaseTable>
  </div>
</template>
