<script setup lang="ts">
interface Filters {
  name?: string
  status?: 'alive' | 'dead' | 'unknown' | ''
  species?: string
  type?: string
  gender?: 'female' | 'male' | 'genderless' | 'unknown' | ''
}

const emit = defineEmits<{
  filter: [filters: Filters]
}>()

const filters = ref<Filters>({
  name: '',
  status: '',
  species: '',
  type: '',
  gender: '',
})

const statusOptions = [
  { label: 'All', value: '' },
  { label: 'Alive', value: 'alive' },
  { label: 'Dead', value: 'dead' },
  { label: 'Unknown', value: 'unknown' },
]

const genderOptions = [
  { label: 'All', value: '' },
  { label: 'Female', value: 'female' },
  { label: 'Male', value: 'male' },
  { label: 'Genderless', value: 'genderless' },
  { label: 'Unknown', value: 'unknown' },
]

const debouncedEmit = useDebounceFn(() => {
  emit('filter', filters.value)
}, 300)

watch(filters, () => {
  debouncedEmit()
}, { deep: true })
</script>

<template>
  <div class="bg-white dark:bg-stone-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
    <h2 class="text-lg font-semibold mb-4 text-stone-800 dark:text-stone-200">
      Filter Characters
    </h2>
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      <div>
        <UFormGroup label="Name">
          <UInput
            v-model="filters.name"
            placeholder="Search by name..."
            icon="i-heroicons-magnifying-glass"
            size="sm"
          />
        </UFormGroup>
      </div>
      <div>
        <UFormGroup label="Status">
          <USelect
            v-model="filters.status"
            :options="statusOptions"
            placeholder="Select status"
            size="sm"
          />
        </UFormGroup>
      </div>
      <div>
        <UFormGroup label="Species">
          <UInput
            v-model="filters.species"
            placeholder="e.g. Human, Alien..."
            size="sm"
          />
        </UFormGroup>
      </div>
      <div>
        <UFormGroup label="Type">
          <UInput
            v-model="filters.type"
            placeholder="e.g. Parasite..."
            size="sm"
          />
        </UFormGroup>
      </div>
      <div>
        <UFormGroup label="Gender">
          <USelect
            v-model="filters.gender"
            :options="genderOptions"
            placeholder="Select gender"
            size="sm"
          />
        </UFormGroup>
      </div>
    </div>
  </div>
</template>
