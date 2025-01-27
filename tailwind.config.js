/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "gvx-bg": "#282828",
        "gvx-red": "#cc241d",
        "gvx-green": "#98971a",
        "gvx-yellow": "#d79921",
        "gvx-blue": "#458588",
        "gvx-purple": "#b16286",
        "gvx-aqua": "#689d6a",
        "gvx-orange": "#d65d0e",
        "gvx-grey": "#a89984",
        "gvx-blue": "#83a598",
        "gvx-purple": "#d3869b",
        "gvx-fg": "#ebdbb2",

      }
    },
  },
  plugins: [],
}

