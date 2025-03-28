import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./public/index.html",
    "./src/**/*.{html,js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'custom-maxwidth-520',
    'custom-flex-direction-520-max',
    'custom-grid-col2-400-min',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },

      screens: {
        'custom-maxwidth-520': {'max': '520px'},
        'custom-minwidth-400': '400px',
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
}
