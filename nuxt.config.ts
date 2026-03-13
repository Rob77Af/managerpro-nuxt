// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      geminiApiKey: process.env.GEMINI_API_KEY || '',
    }
  },
  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      title: 'ManagerPro',
      meta: [{ name: 'description', content: 'Plataforma de Comercio Exterior com simulacao de custos aduaneiros e IA.' }],
    }
  },
  tailwindcss: { configPath: '~/tailwind.config.ts' },
})
