/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
import { fontFamily } from 'tailwindcss/defaultTheme'
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      // ? Adding new colors in Daisy UI
      white: 'oklch(var(--white) / <alpha-value>)',
      black: 'oklch(var(--black) / <alpha-value>)',
    },
    fontFamily: {
      sans: ['"Poppins"', ...fontFamily.sans],
    },
    fontSize: {
      // xs: '0.75rem', // 12px
      // sm: '0.875rem', // 14px
      // base: '1.0625rem', // 17px
      // lg: ['1.1875rem', '1.21'], // 19px
      // xl: '1.3125rem', // 21px
      // '2xl': '1.5rem', // 24px
      // '3xl': '1.75rem', // 28px
      // '4xl': ['2.5rem', '1.1'], // 40px
      // '5xl': ['4.5rem', '1.05'], // 72px
      heading: 'var(--text-heading)',
      title: 'var(--text-title)',
      subtitle: 'var(--text-subtitle)',
      base: 'var(--text-base)',
      caption: 'var(--text-caption)',
    },
    fontWeight: {
      normal: 500,
      bold: 700,
    },
    extend: {
      colors: {
        // ! Fix to neutra collision names `neutral` in Tailwind and Deisy UI
        'neutral-50': {},
        'neutral-100': {},
        'neutral-200': {},
        'neutral-300': {},
        'neutral-400': {},
        'neutral-500': {},
        'neutral-600': {},
        'neutral-700': {},
        'neutral-800': {},
        'neutral-900': {},
        'neutral-950': {},
      },
      container: {
        center: true,
        padding: '1.5rem',
        // padding: {
        //   DEFAULT: '1.5rem',
        //   // ? Agregando padding personalizado para pantallas muy grandes
        //   '2xl': '6rem'
        // }
      },
    },
  },
  plugins: [daisyui],
  // daisyUI config (optional - here are the default values)
  daisyui: {
    // themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    themes: [
      {
        light: {
          // '--white': '0deg 100% 99%',
          // '--black': '0deg 0% 2%',
          '--white': '0.98 0 0',
          '--black': '0.02 0 0',
          primary: 'hsl(180, 66%, 49%)',
          'primary-content': 'hsl(0, 100%, 98%)',
          'primary-focus': 'hsl(52, 100%, 65%)',
          secondary: 'hsl(257, 27%, 26%)',
          'secondary-content': 'hsl(0, 100%, 98%)',
          accent: 'hsl(335, 61%, 42%)',
          // 'accent-content': '#001216',
          neutral: 'hsl(260, 8%, 14%)',
          // 'neutral-content': '#cdcfce',
          'base-100': 'hsl(0, 100%, 99%)',
          'base-200': 'hsl(257, 7%, 63%)',
          'base-300': 'hsl(255, 11%, 22%)',
          // 'base-content': '#cecfd0',
          info: 'hsl(197, 68%, 34%)',
          // 'info-content': '#d1e3fe',
          success: 'hsl(120, 66%, 49%)',
          // 'success-content': '#000800',
          warning: 'hsl(52, 100%, 65%)',
          // 'warning-content': '#0c0700',
          error: 'hsl(0, 87%, 67%)',
          // 'error-content': '#160509',
        },
      },
      'dim',
    ],
    // darkTheme: 'dim', // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ':root', // The element that receives theme color CSS variables
  },
}
