/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      400: "400px",
      767: "767px",
      1200: "1200px",
      900: "767px",
      700: "700px",
    }
  },
  plugins: [],
}

