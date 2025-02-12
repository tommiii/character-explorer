<template>
  <div class="py-8">
    <UContainer>
      <header class="border-b mb-8 py-2 text-xl">
        <h1 class="text-2xl font-bold text-stone-800 dark:text-stone-200">
          Welcome to the Character Explorer
        </h1>
      </header>
      <div class="grid gap-8 md:grid-cols-2">
        <NuxtLink to="/rick-and-morty" class="block p-6 bg-white dark:bg-stone-800 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h2 class="text-xl font-bold mb-4 text-stone-800 dark:text-stone-200">Rick and Morty Characters</h2>
          <p class="text-stone-600 dark:text-stone-400">Explore characters from the Rick and Morty universe</p>
        </NuxtLink>
        <NuxtLink to="/pokemon" class="block p-6 bg-white dark:bg-stone-800 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h2 class="text-xl font-bold mb-4 text-stone-800 dark:text-stone-200">Pokémon List</h2>
          <p class="text-stone-600 dark:text-stone-400">Discover various Pokémon and their details</p>
        </NuxtLink>
      </div>
    </UContainer>
  </div>
</template>
