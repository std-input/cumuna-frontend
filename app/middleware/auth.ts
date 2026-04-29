// /middleware/auth.ts

// La ruta requiere login
export default defineNuxtRouteMiddleware((to) => {
    if (process.server) return
    const auth = useAuthStore()
    auth.init()

    console.log(auth.user)
    if (!auth.user?.id) {
      console.log(auth.user)
      return navigateTo('/auth')
    }
  })
  