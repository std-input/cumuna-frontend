export default defineNuxtRouteMiddleware(async (to, from) => {
  // Solo cliente
  if (import.meta.server) return

  // Solo rutas /admin
  if (!to.path.startsWith('/admin')) return

  const auth = useAuthStore()

  // Esperar a que cargue el usuario ANTES de renderizar
  

  const permissions = usePermissions()
  const role = auth.user?.role ?? ''

  if (!permissions.hasPermission(role, 'admin_access')) {
    return navigateTo('/')
  }
})
