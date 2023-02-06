/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ee4d2d',

        gray: {
          light: '#C4C4C4',
          dark: '#292D32',
          light6B: '#6b6b6b',
          darkF3: '#f3edff'
        },
        red: {
          dark: '#820005',
          light: '#f8d7da'
        },
        tertiary: '#3A1097'
      }
    }
  },
  plugins: []
}
