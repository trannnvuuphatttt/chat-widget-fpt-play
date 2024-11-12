/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
};

module.exports = {
  theme: {
    extend: {
      letterSpacing: {
        custom: '2%',
      },
      fontFamily: {
        'sf-pro-display': ['"SF Pro Display"', 'sans-serif'],
      },
      colors: {
        customDark: '#121212',
        customWhite: '#F7F7F7',
        customBackground: '#EFEFEF',
        customRed: '#FF090D',
      },
    },
    screens: {
      sm: '640px', // mobile
      md: '768px', // tablet
      lg: '1024px', // laptop
      xl: '1280px', // desktop
    },
  },
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  variants: {},
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.no-scrollbar': {
          /* Hide scrollbar for WebKit browsers */
          '-webkit-overflow-scrolling': 'touch',
          'scrollbar-width': 'none', // Hide scrollbar for Firefox
          '&::-webkit-scrollbar': {
            display: 'none', // Hide scrollbar for Chrome, Safari, and Edge
          },
        },
      });
    },
  ],
};
