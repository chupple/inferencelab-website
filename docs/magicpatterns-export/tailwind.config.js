/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        background: '#050505',
        surface: '#0a0a0a',
        surfaceHover: '#141414',
        border: '#1f1f1f',
        primary: '#10b981', // emerald-500
        primaryHover: '#059669', // emerald-600
        secondary: '#06b6d4', // cyan-500
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #10b98133 0deg, #06b6d433 180deg, #10b98133 360deg)',
      }
    },
  },
  plugins: [],
}