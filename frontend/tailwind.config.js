/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sage: '#8FA89B',
        pearl: '#FAFAF9',
        charcoal: '#1C1C1E',
        indigo: '#4F46E5',
        amber: '#F59E0B',
        teal: {
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488'
        },
        emerald: {
          50: '#ECFDF5',
          400: '#34D399',
          500: '#10B981',
          600: '#059669'
        }
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'sans-serif'],
        heading: ['var(--font-space)', 'sans-serif'],
      }
    },
  },
  plugins: [],
}