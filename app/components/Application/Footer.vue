<template>
  <footer class="bg-zinc-100 border-t border-t-zinc-200 dark:bg-zinc-700 dark:border-t-zinc-600 py-6">
    <UContainer>
      <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div class="text-sm text-stone-600 dark:text-stone-400">
          © 2024 Character Explorer. All rights reserved.
        </div>
        <div class="flex items-center gap-4">
          <span class="text-sm text-stone-600 dark:text-stone-400">
            Powered by
          </span>
          <div class="flex items-center gap-2">
            <img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="PokeAPI" class="h-6 opacity-75 dark:invert">
            <span class="text-stone-600 dark:text-stone-400">|</span>
            <img src="https://rickandmortyapi.com/api/character/avatar/1.jpeg" alt="Rick and Morty API" class="h-6 w-6 rounded-full">
          </div>
        </div>
      </div>
    </UContainer>
  </footer>
</template>
