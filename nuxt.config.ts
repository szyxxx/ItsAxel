// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

// Get the repository name from the environment or set a default
const baseURL = process.env.NUXT_APP_BASE_URL || '/ItsAxel';

export default defineNuxtConfig({
  ssr: false, // Switch to client-side rendering to avoid the cookie issue
  compatibilityDate: '2024-11-01', // Using an older compatibility date
  devtools: { enabled: true },

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
  supabase: {
    redirect: false,
    cookieOptions: {
      maxAge: 60 * 60 * 8,
      sameSite: 'lax',
      secure: false
    }
  },
  app: {
    baseURL, // Set the correct base URL for GitHub Pages
    buildAssetsDir: '/assets/', // Don't use underscore for assets directory
    head: {
      title: 'My Personal Diary',
      meta: [
        { name: 'description', content: "It's Axel" }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: `${baseURL}/favicon.ico` }
      ]
    }
  },
  runtimeConfig: {
    geminiApiKey: process.env.GEMINI_API_KEY || 'AIzaSyDUMBIkRVDVecRKXcb72s0NNUaLcIJNKGQ',
    public: {
    supabaseUrl: process.env.SUPABASE_URL || 'https://gsbvayifmvdojiqobkcz.supabase.co'
    }
  }
})