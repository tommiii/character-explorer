interface ApiUrls {
  pokemon: string
  rickAndMorty: string
}

declare module '#app' {
  interface NuxtApp {
    $apiUrls: ApiUrls
  }
}

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
