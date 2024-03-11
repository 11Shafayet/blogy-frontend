/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8c45ff',
        secondary: '#fff',
      },
      fontFamily: {
        primary: ['IBM Plex Sans Condensed'],
        secondary: ['Alegreya'],
      },
    },
  },
  plugins: [],
}