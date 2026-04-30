<script setup lang="ts">
import type { DropdownMenuItem, NavigationMenuItem } from '@nuxt/ui'
import Logo from './Logo.vue';

const route = useRoute()
const auth = useAuthStore()
const user = computed<User | null>(() => auth.user)

const permissions = usePermissions()

const itemsLinks = computed<NavigationMenuItem[]>(() => {
  const role = user.value?.role ?? ""
  const links: NavigationMenuItem[] = []

  if (permissions.hasPermission(role, "modify_locations")) {
    links.push({
      label: "Localidades",
      to: "/admin/locations",
      active: route.path.startsWith("/admin/locations"),
    })
  }

  if (permissions.hasPermission(role, "modify_categories")) {
    links.push({
      label: "Categorias",
      to: "/admin/categories",
      active: route.path.startsWith("/admin/categories"),
    })
  }

  if (permissions.hasPermission(role, "add_plan")) {
    links.push({
      label: "Planes",
      to: "/admin/planRequests",
      active: route.path.startsWith("/admin/planRequests"),
    })
  }

  return links
})

const itemsDropdown = ref<DropdownMenuItem[][]>([
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
    <template #right>
      <UDropdownMenu :items="itemsDropdown">
        <UButton :avatar="{
          src: user?.picture,
          loading: 'lazy'
        }" size="md" color="neutral" variant="outline">
          {{ user?.given_name ?? 'Usuario' }}
        </UButton>
      </UDropdownMenu>
    </template>
  </UHeader>
</template>
