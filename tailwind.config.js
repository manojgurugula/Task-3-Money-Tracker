/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': '#0070f3',
      },
      fontFamily: {
        'Kavoon': ['Kavoon', 'cursive'],
      },
    },
  },
  variants: {},
  plugins: [],
}
