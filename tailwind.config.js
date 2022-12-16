/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Rampart: ["Rampart One", "cursive"],
        SourceSansPro: ["Source Sans Pro", "sans - serif"],
        Montserrat: ["Montserrat", "sans - serif"],
      },
    },
  },
  plugins: [],
};
