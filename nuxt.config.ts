// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
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

  app: {
    head: {
      meta: [
        {
          name: 'viewport',
          content:
            'width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, user-scalable=no',
        },
      ],
      title: 'FPT Play AI Support',
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=SF+Pro+Display:wght@400;700&display=swap',
        },
      ],
    },
  },

  modules: [
    'nuxt-snackbar',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
  ],
  ssr: false,
});
