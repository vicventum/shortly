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
      'base-400': 'oklch(var(--base-400) / <alpha-value>)',
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
      // heading: 'var(--text-4xl)',
      '4xl': [
        'var(--text-4xl-size)',
        {
          lineHeight: 'var(--text-4xl-line-height)',
          letterSpacing: 'var(--text-4xl-letter-spacing)',
        },
      ],
      '3xl': 'var(--text-3xl)',
      '2xl': 'var(--text-2xl)',
      xl: [
        'var(--text-xl-size)',
        {
          lineHeight: 'var(--text-xl-line-height)',
        },
      ],
      lg: 'var(--text-lg)',
      base: [
        'var(--text-base-size)',
        {
          lineHeight: 'var(--text-base-line-height)',
        },
      ],
      sm: 'var(--text-sm)',
    },
    fontWeight: {
      normal: 500,
      semibold: 600,
      bold: 700,
    },
    backgroundImage: {
      'hero-image': "url('@/assets/img/illustration-working.svg')",
      'shorten-pattern-mobile': "url('@/assets/img/bg-shorten-mobile.svg')",
      'shorten-pattern-desktop': "url('@/assets/img/bg-shorten-desktop.svg')",
      'boost-pattern-mobile': "url('@/assets/img/bg-boost-mobile.svg')",
      'boost-pattern-desktop': "url('@/assets/img/bg-boost-desktop.svg')",
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
      width: {
        26: '6.5rem',
      },
      size: {
        22: '5.5rem',
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
      screens: {
        xl: '1180px',
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
          '--white': '0.99 0 0',
          '--black': '0.02 0 0',
          primary: 'hsl(180, 66%, 49%)',
          'primary-content': 'hsl(0, 100%, 98%)',
          secondary: 'hsl(257, 27%, 26%)',
          'secondary-content': 'hsl(0, 100%, 98%)',
          accent: 'hsl(335, 61%, 42%)',
          // 'accent-content': '#001216',
          neutral: 'hsl(260, 8%, 14%)',
          'neutral-content': 'hsl(0, 100%, 99%)',
          'base-100': 'hsl(0, 100%, 99%)',
          'base-200': 'hsl(225, 33.33%, 95.29%)',
          'base-300': 'hsl(257, 7%, 63%)',
          '--base-400': '0.33 0.02 296.65', // 'hsl(255, 11%, 22%)'
          // 'base-content': 'hsl(257, 7%, 63%)',
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
      {
        dark: {
          primary: 'hsl(180, 66%, 49%)',
          'primary-content': 'hsl(0, 0%, 15%)', // Ajuste para mejor contraste en fondo oscuro
          secondary: 'hsl(257, 27%, 26%)',
          'secondary-content': 'hsl(0, 0%, 15%)', // Ajuste para mejor contraste en fondo oscuro
          accent: 'hsl(335, 61%, 42%)',
          neutral: 'hsl(0, 0%, 95%)', // Ajuste para fondo oscuro
          'neutral-content': 'hsl(0, 0%, 15%)', // Ajuste para mejor contraste en fondo oscuro
          'base-100': 'hsl(0, 0%, 15%)', // Fondo principal oscuro
          'base-200': 'hsl(0, 0%, 20%)', // Fondo secundario oscuro
          'base-300': 'hsl(0, 0%, 25%)', // Fondo terciario oscuro
          '--base-400': '0.33 0.02 296.65', // Mantiene el valor original para coherencia
          info: 'hsl(197, 68%, 34%)',
          success: 'hsl(120, 66%, 49%)',
          warning: 'hsl(52, 100%, 65%)',
          error: 'hsl(0, 87%, 67%)',
        },
      },
      {
        cyberpunk: {
          primary: '#f9009a',
          'primary-content': '#eee',
          secondary: '#00e1bf',
          'secondary-content': '#00120d',
          accent: '#0000ff',
          'accent-content': '#c6dbff',
          neutral: 'hsl(257, 21%, 8%)',
          'neutral-content': '#c3c5c4',
          'base-100': '#252131',
          'base-200': '#1f1b29',
          'base-300': 'hsl(257, 7%, 63%)',
          '--base-400': '0.9 0.02 296.65', // 'hsl(255, 11%, 90%)'
          'base-content': '#ceced2',
          info: '#00e5ff',
          'info-content': '#001216',
          success: '#008200',
          'success-content': '#d3e6d1',
          warning: '#da9400',
          'warning-content': '#110800',
          error: '#ff8d8f',
          'error-content': '#160707',
        },
      },
      {
        cobalt: {
          primary: 'hsl(180, 66%, 49%)',
          'primary-content': '#001013',
          secondary: '#8c78b0',
          'secondary-content': '#160200',
          accent: '#839000',
          'accent-content': '#060700',
          neutral: 'hsl(212, 42%, 10%)',
          'neutral-content': '#c9cecd',
          'base-100': '#1a2a3c',
          'base-200': '#152333',
          'base-300': 'hsl(257, 7%, 63%)',
          '--base-400': '0.9 0.02 296.65', // 'hsl(255, 11%, 90%)'
          'base-content': '#ccd0d5',
          info: '#00f2ff',
          'info-content': '#001416',
          success: '#00ae38',
          'success-content': '#000b01',
          warning: '#b34100',
          'warning-content': '#f4d9d0',
          error: '#ff7a91',
          'error-content': '#160507',
        },
      },
      'dim',
    ],
    darkTheme: 'cyberpunk', // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ':root', // The element that receives theme color CSS variables
  },
}
