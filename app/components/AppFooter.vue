<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items: NavigationMenuItem[] = [
  {
    label: 'Terminos y condiciones',
    to: '/terms',
    target: '_blank'
  },
]
</script>

<template>
  <UFooter>
    <template #left>
      <p class="text-muted text-sm">Copyright © {{ new Date().getFullYear() }}</p>
    </template>

    <UNavigationMenu :items="items" variant="link" />

    <template #right>
      <UButton
        icon="i-simple-icons-instagram"
        color="neutral"
        variant="ghost"
        to="https://instagram.com/cumuna.app"
        target="_blank"
        aria-label="Instagram"
      />
    </template>
  </UFooter>
</template>
