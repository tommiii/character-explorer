<template>
  <div class="py-12">
    <UContainer>
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-stone-800 dark:text-stone-200 mb-4">
          Welcome to Character Explorer
        </h1>
        <p class="text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
          Discover and explore your favorite characters from different universes. Whether you're a Pokémon trainer or a Rick and Morty fan, we've got you covered!
        </p>
      </div>

      <div class="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
        <NuxtLink
          to="/rick-and-morty"
          class="group block p-6 bg-white dark:bg-stone-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300"
        >
          <div class="aspect-video mb-6 overflow-hidden rounded-lg bg-stone-100 dark:bg-stone-700">
            <img
              src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
              alt="Rick Sanchez"
              class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            >
          </div>
          <h2 class="text-2xl font-bold mb-3 text-stone-800 dark:text-stone-200 group-hover:text-primary-500 transition-colors">
            Rick and Morty Characters
          </h2>
          <p class="text-stone-600 dark:text-stone-400 mb-4">
            Explore the multiverse with Rick and Morty! Discover detailed information about your favorite characters from the show, including their status, species, origin, and last known location.
          </p>
          <div class="flex items-center text-primary-500 font-medium">
            Explore Characters
            <UIcon name="i-heroicons-arrow-right" class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </NuxtLink>

        <NuxtLink
          to="/pokemon"
          class="group block p-6 bg-white dark:bg-stone-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300"
        >
          <div class="aspect-video mb-6 overflow-hidden rounded-lg bg-stone-100 dark:bg-stone-700">
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
              alt="Pikachu"
              class="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
            >
          </div>
          <h2 class="text-2xl font-bold mb-3 text-stone-800 dark:text-stone-200 group-hover:text-primary-500 transition-colors">
            Pokémon List
          </h2>
          <p class="text-stone-600 dark:text-stone-400 mb-4">
            Become the ultimate Pokémon master! Browse through the extensive collection of Pokémon, learn about their characteristics, abilities, and stats. Perfect for trainers of all levels!
          </p>
          <div class="flex items-center text-primary-500 font-medium">
            View Pokémon
            <UIcon name="i-heroicons-arrow-right" class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </NuxtLink>
      </div>
    </UContainer>
  </div>
</template>
