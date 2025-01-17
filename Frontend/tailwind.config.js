/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend:{
      colors:{
        secondaryColor:'#5046e4',
        primaryColor:'#FFFFFF',
        primaryBg:'#e0e7ff',
      },
      fontFamily: {
        jersey: ['"Jersey 15"', 'sans-serif'],
        custom: ['Roboto', 'sans-serif'],
      },
    },
    
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('tailwind-scrollbar'),
  ]
}

