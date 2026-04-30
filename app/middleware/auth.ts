// /middleware/auth.ts

// La ruta requiere login
export default defineNuxtRouteMiddleware(async (to) => {
    if (import.meta.server) return
    const auth = useAuthStore()
    if (!auth.user?.id) {
      console.log(auth.user)
      return navigateTo('/auth')
    }
  })
  