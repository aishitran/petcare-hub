/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdf8f6',
          100: '#f7eeea',
          200: '#eddcd4',
          300: '#dfc4b7',
          400: '#cca391',
          500: '#b47e68',
          600: '#9d644e',
          700: '#7f4e3c',
          800: '#643f32',
          900: '#4e332a',
        },
        coral: {
          50: '#fff5f5',
          100: '#fed7d7',
          500: '#e53e3e',
          600: '#c53030',
        },
        sage: {
          50: '#f4f7f4',
          100: '#e3ece3',
          200: '#cadbc9',
          500: '#5a8260',
          600: '#45664a',
          700: '#344d38',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
