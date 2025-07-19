import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Times New Roman"', 'serif'],
      },
      colors: {
        primary: '#006c67', 
        accent: '#f4a261',
        light: '#f1f5f9',
        dark: '#1f2937',
      },
      backgroundImage: {
        'hobbiton-animated':
          'linear-gradient(-45deg, #006c67, #004c45, #007d74, #004f4d)',
      },
      animation: {
        'slide-in': 'slideIn 0.3s ease-out',
        'gradient-x': 'gradientX 12s ease infinite',
      },
      keyframes: {
        slideIn: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        gradientX: {
          '0%, 100%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}

export default config
