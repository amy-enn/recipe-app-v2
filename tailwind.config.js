/** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

export default {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        vanilla: '#f3e5ab',
        peach: '#59a58c',
        rose: '#f4c2c2',
        butter: '#ffd97d',
        caramel: '#d1a054',
        cocoa: '#8d4e3a'

      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
