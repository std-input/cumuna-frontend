export default defineNuxtPlugin(async () => {
  const auth = useAuthStore()

  // Inicializa el estado de auth ANTES de que Nuxt pinte cualquier página
  await auth.init()
})
