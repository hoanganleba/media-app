/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'macos': {
          DEFAULT: '#F6F6F6',
          primary: '#007AFF',
          dark: '#1C1D1F',
          text: '#434343',
          textDark: '#DFDEDF',
          sidebar: '#E1E1E0',
          sidebarDark: '#282828'
        }
      }
    },
  },
  plugins: [],
}
