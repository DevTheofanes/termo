import { defineConfig } from 'twind'

export default defineConfig({
  theme: {
    extend: {
      colors: {
        almost: '#f59e0b',
        success: '#10b981',
        key: '#374151',
        strong: '#4b5563',
      },
      animation: {
        fade: 'fade-in 0.3s ease-in-out',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
})
