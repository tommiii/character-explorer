import process from 'node:process'
import { appDescription } from './app/constants/index'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/image',
  ],

  runtimeConfig: {
    public: {
      pokemonApiUrl: process.env.NUXT_PUBLIC_POKEMON_API_URL || '',
      rickAndMortyApiUrl: process.env.NUXT_PUBLIC_RICK_AND_MORTY_API_URL || '',
    },
  },

  experimental: {
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: false,
      routes: ['/'],
    },
  },

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: 'white' },
        { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#222222' },
      ],
    },
  },

  devtools: {
    enabled: true,
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2024-08-14',
})
