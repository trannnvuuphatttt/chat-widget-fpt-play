// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';
import { resolve } from 'path';
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: [
    '~/assets/css/main.css',
    'animate.css/animate.min.css',
    '~/assets/css/font-awesome.css',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  alias: {
    '@': resolve(__dirname, '/'),
  },

  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      title: 'FPT Play AI Support',
    },
  },

  modules: [
    'nuxt-snackbar',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
  ],
});
