/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,ts}', './safelist.txt'],
  theme: {
    extend: {}
  },
  plugins: [],

  corePlugins: {
    preflight: false
  }
}
