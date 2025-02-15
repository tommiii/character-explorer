<template>
  <header class="bg-zinc-100 border-b border-b-zinc-200 dark:bg-zinc-700 dark:border-b-zinc-600 py-6">
    <UContainer class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <h1 class="text-xl font-bold text-stone-800 dark:text-stone-200">
          Character Explorer
        </h1>
        <nav class="ml-8">
          <ul class="flex gap-4">
            <li>
              <ApplicationHeaderLink to="/" label="Home" />
            </li>
            <li>
              <ApplicationHeaderLink to="/pokemon" label="Pokémon" />
            </li>
            <li>
              <ApplicationHeaderLink to="/rick-and-morty" label="Rick & Morty" />
            </li>
          </ul>
        </nav>
      </div>
      <UColorMode />
    </UContainer>
  </header>
</template>
