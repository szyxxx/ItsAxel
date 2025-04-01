// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

// Get the repository name from the environment or set a default
const baseURL = process.env.NUXT_APP_BASE_URL || '/ItsAxel';

export default defineNuxtConfig({
  ssr: false,
  app: {
    baseURL,
    buildAssetsDir: 'assets',
    head: {
      title: "It's Axel",
      meta: [
        { name: 'description', content: "It's Axel" }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: `${baseURL}/favicon.ico` }
      ]
    }
  },
  modules: [
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxtjs/supabase',
  ],
  css: ['~/assets/css/tailwind.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
    optimizeDeps: {
      include: ['cookie'] // Include cookie as a dependency
    }
  },
  // Explicitly configure Supabase
  supabase: {
    url: 'https://gsbvayifmvdojiqobkcz.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzYnZheWlmbXZkb2ppcW9ia2N6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0ODQ3ODYsImV4cCI6MjA1OTA2MDc4Nn0.GoBHALk4Ka4P66oYyymnhiBXlz1OYt0gyiQSsUycvAw',
    redirect: false,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production'
    }
  },
  runtimeConfig: {
    geminiApiKey: process.env.GEMINI_API_KEY || 'AIzaSyDUMBIkRVDVecRKXcb72s0NNUaLcIJNKGQ',
    public: {
      supabaseUrl: 'https://gsbvayifmvdojiqobkcz.supabase.co'
    }
  }
})