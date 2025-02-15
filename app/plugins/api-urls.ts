export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  return {
    provide: {
      apiUrls: {
        pokemon: config.public.pokemonApiUrl,
        rickAndMorty: config.public.rickAndMortyApiUrl,
      },
    },
  }
})
