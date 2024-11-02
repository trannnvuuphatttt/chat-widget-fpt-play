/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
}

module.exports = {
  theme: {
    extend: {
      letterSpacing: {
        'custom': '2%',
      },
      fontFamily: {
        'sf-pro-display': ['"SF Pro Display"', 'sans-serif'],
      }
    }
  },
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  variants: {},
  plugins: [],
}