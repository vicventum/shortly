/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1.5rem'
        // padding: {
        //   DEFAULT: '1.5rem',
        //   // ? Agregando padding personalizado para pantallas muy grandes
        //   '2xl': '6rem'
        // }
      }
    }
  },
  plugins: []
}
