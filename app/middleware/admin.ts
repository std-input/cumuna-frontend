// /middleware/admin.ts

// La ruta requiere ser admin
export default defineNuxtRouteMiddleware((to, from) => {
    if (process.server) return
    const auth = useAuthStore()
    auth.init()
  
    if (auth.user?.role !== "admin") {
      return navigateTo(from)
    }
  })
  