import defaultConfig from 'tailwindcss/defaultConfig'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./resources/views/**/*.edge'],
  theme: {
    extend: {
      colors: {
        'gray-50': '#f8fafc',
        'gray-100': '#f1f5f9',
        'gray-200': '#e2e8f0',
        'gray-300': '#cbd5e1',
        'gray-400': '#94a3b8',
        'gray-500': '#64748b',
        'gray-600': '#475569',
        'gray-700': '#334155',
        'gray-800': '#1e293b',
        'gray-900': '#0f172a',

        'cyan-300': '#c7e6f8',
        'cyan-500': '#93d2f6',

        'violet-300': '#dec6ff',
        'violet-500': '#bd93f6',

        'red-300': '#f8c7c7',
        'red-500': '#f69393',

        'yellow-100': '#faf6ea',
        'yellow-200': '#fbf3df',
        'yellow-300': '#f8eac7',
        'yellow-400': '#f6e1ac',
        'yellow-500': '#f6da93',
        'yellow-600': '#402f02',
      },

      fontSize: {
        h1: '3.5rem',
        h2: '2.75rem',
        h3: '2.25rem',
        h4: '1.75rem',
        h5: '1.5rem',
        h6: '1rem',
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
      },

      fontFamily: {
        sans: ['Atkinson-Hyperlegible', ...defaultConfig.theme.fontFamily.sans],
      },

      spacing: {
        0: '0px',
        px: '1px',
        0.5: '2px',
        1: '4px',
        1.5: '6px',
        2: '8px',
        2.5: '10px',
        3: '12px',
        3.5: '14px',
        4: '16px',
        5: '20px',
        6: '24px',
        7: '28px',
        8: '32px',
        9: '36px',
        10: '40px',
        11: '44px',
        12: '48px',
        14: '56px',
        16: '64px',
        20: '80px',
      },
    },
  },
  plugins: [],
}
