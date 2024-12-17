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
        'border-glow': 'border-glow 2s ease-in-out infinite',
        'cyber-pulse': 'cyber-pulse 2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'cyber-scan': 'cyber-scan 2s linear infinite',
        'move-to-top': 'move-to-top 0.5s ease-out forwards',
        'shift-down': 'shift-down 0.5s ease-out forwards',
        'progress': 'progress 3s linear',
      },
      keyframes: {
        'border-glow': {
          '0%, 100%': {
            borderColor: 'rgba(6, 182, 212, 0.2)',
            boxShadow: '0 0 10px rgba(6, 182, 212, 0.1)',
          },
          '50%': {
            borderColor: 'rgba(6, 182, 212, 0.4)',
            boxShadow: '0 0 20px rgba(6, 182, 212, 0.2)',
          },
        },
        'cyber-pulse': {
          '0%, 100%': { opacity: '0.1' },
          '50%': { opacity: '0.3' },
        },
        'cyber-scan': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'move-to-top': {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '20%': { transform: 'translateY(-20%)', opacity: '0.9' },
          '100%': { transform: 'translateY(-100%)', opacity: '1' },
        },
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