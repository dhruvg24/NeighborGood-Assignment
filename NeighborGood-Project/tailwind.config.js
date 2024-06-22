/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        bgDark:"#003366",
        bgDark2: "#eff2f5"
      }
    },
  },
  plugins: [],
}

