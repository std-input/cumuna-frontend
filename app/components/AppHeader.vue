<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import Logo from './Logo.vue';

const route = useRoute()
const auth = useAuthStore()
const user = computed(() => auth.user)

const itemsLinks = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Busqueda',
    to: '/',
    active: route.path === "/"
  },
  {
    label: 'Planes',
    to: '/pricings',
    active: route.path.startsWith('/pricings')
  },
])

const itemsDropdown = ref<DropdownMenuItem[][]>([
  [
    {
      label: 'Perfil',
      icon: 'i-lucide-circle-user-round'
    },
    {
      label: 'Planes',
      icon: 'i-lucide-credit-card',
      to: '/pricings'
    },
    {
      label: 'Servicios',
      icon: 'i-lucide-monitor-smartphone',
    },
  ],
  [
    {
      label: 'Cerrar sesion',
      icon: 'i-lucide-log-out',
      to: '/auth/logout'
    }
  ]
])
</script>

<template>
  <UHeader>
    <template #title>
      <Logo class="h-8 w-auto" />
    </template>

    <UNavigationMenu :items="itemsLinks" />

    <template #body v-if="!user">
      <UButton
          color="neutral"
          variant="ghost"
          to="/auth"
          icon="i-lucide-log-in"
          label="Iniciar sesion"
          class="w-full"
        />
    </template>

    <template v-if="!user" #right>
      <UTooltip text="Iniciar sesion" class="hidden lg:block">
        <UButton
          color="neutral"
          variant="ghost"
          to="/auth"
          icon="i-lucide-log-in"
        />
      </UTooltip>
    </template>
    <template v-else #right>
    <UDropdownMenu :items="itemsDropdown">
        <UButton
          :avatar="{
            src: user.picture,
            loading: 'lazy'
          }"
          size="md"
          color="neutral"
          variant="outline"
        >
          {{user.given_name}}
        </UButton>
      </UDropdownMenu>
    </template>
  </UHeader>
</template>
