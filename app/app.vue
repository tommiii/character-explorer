<script setup lang="ts">
import { appName } from '~/constants'

useHead({
  title: appName,
  titleTemplate: `%s - ${appName}`,
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
#__nuxt {
  min-height: 100dvh;
  margin: 0;
  padding: 0;
}

html,
body {
  min-height: 100dvh;
}
</style>
