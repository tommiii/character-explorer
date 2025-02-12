<template>
  <div class="py-8">
    <UContainer>
      <header class="border-b mb-8 py-2">
        <h1 class="text-2xl font-bold text-stone-800 dark:text-stone-200">
          Rick and Morty Characters
        </h1>
      </header>
      <div class="w-full">
        <ExampleApiResponse :response="data" />
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const { data } = useRickAndMortyData('character')

definePageMeta({
  title: 'Rick and Morty Characters'
})
</script> 