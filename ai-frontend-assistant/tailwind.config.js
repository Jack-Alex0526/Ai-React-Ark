/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#F8E8B1",
        secondary: "#FFF8E1",
        accent: "#F59E0B",
        dark: "#2A2A2A",
      },
    },
  },
  plugins: [],
}