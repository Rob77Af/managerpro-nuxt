import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./app/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        port: {
          deep:    'var(--color-port-deep-dark, #142346)',
          crane:   'var(--color-port-crane-dark, #BE1E2D)',
          hull:    'var(--color-port-hull-dark, #306844)',
          glow:    'var(--color-port-glow-dark, #FFBE64)',
          dark:    'var(--color-port-dark-bg-dark, #1A202C)',
          'primary':          'var(--color-port-primary-light, #4C6F51)',
          'primary-lightest': 'var(--color-port-primary-lightest-light, #D6E3D8)',
          'primary-lighter':  'var(--color-port-primary-lighter-light, #91A895)',
          'primary-dark':     'var(--color-port-primary-dark-light, #28422B)',
          'contrast-light':   'var(--color-port-contrast-light, #F7F7F7)',
          light: 'var(--color-port-light, #E2E8F0)',
        }
      },
      fontFamily: { sans: ['var(--font-family-sans)', 'sans-serif'] },
      borderRadius: { xl: '0.75rem', '2xl': '1rem' }
    }
  },
  plugins: [],
} satisfies Config
