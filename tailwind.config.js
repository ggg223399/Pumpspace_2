/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0D1117',
        surface: '#1A1F26',
      },
      animation: {
        'fade-in': 'fade-in 200ms ease-out',
        'slide-in-from-top': 'slide-in-from-top 200ms ease-out',
        'shift-down': 'shift-down 0.5s ease-out forwards',
        'progress': 'progress 3s linear',
      },
      keyframes: {
        'shift-down': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(100%)' },
        },
        'progress': {
          '0%': { width: '100%' },
          '100%': { width: '0%' },
        },
      },
    },
  },
  plugins: [],
};