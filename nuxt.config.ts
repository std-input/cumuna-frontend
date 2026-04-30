// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  //css: ['~/assets/main.css']
  css: ['/home/adonys/Documentos/cumuna/app/assets/main.css'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    "@pinia/nuxt"
  ],
  runtimeConfig: {
    public: {
      BACKEND_URL: process.env.BACKEND_URL
    }
  },
  routeRules: {
    // Set layout for specific route
    '/admin/*': { appLayout: 'admin' },
  },
})
