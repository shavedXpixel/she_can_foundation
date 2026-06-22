/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        shecanRed: '#ff0000', // Matches the bright red in the screenshot
        shecanDark: '#111111',
      }
    },
  },
  plugins: [],
}
