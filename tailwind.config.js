/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Background colors for FAQs
    'bg-blue-50', 'bg-blue-100', 'bg-blue-200', 'bg-blue-300',
    'bg-yellow-50', 'bg-yellow-100', 'bg-yellow-200', 'bg-yellow-300',
    'bg-purple-50', 'bg-purple-100', 'bg-purple-200', 'bg-purple-300',
    'bg-pink-50', 'bg-pink-100', 'bg-pink-200', 'bg-pink-300',
    'bg-green-50', 'bg-green-100', 'bg-green-200', 'bg-green-300',
    'bg-orange-50', 'bg-orange-100', 'bg-orange-200', 'bg-orange-300',
    // Text colors for FAQs
    'text-blue-500', 'text-blue-700',
    'text-yellow-500', 'text-yellow-700',
    'text-purple-500', 'text-purple-700',
    'text-pink-500', 'text-pink-700',
    'text-green-500', 'text-green-700',
    'text-orange-500', 'text-orange-700',
    // Border colors for FAQs
    'border-blue-100', 'border-blue-300',
    'border-yellow-100', 'border-yellow-300',
    'border-purple-100', 'border-purple-300',
    'border-pink-100', 'border-pink-300',
    'border-green-100', 'border-green-300',
    'border-orange-100', 'border-orange-300',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Clash Display', 'sans-serif'],
      },
      colors: {
        // primary: trust-inspiring cyan
        primary: {
          50:  '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        // secondary: creative purple
        secondary: {
          50:  '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        // accent: growth-oriented green
        accent: {
          50:  '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        // neutral grays for text & backgrounds
        neutral: {
          50:  '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 1s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-up': 'scaleUp 0.3s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleUp: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.2)' },
        },
      },
    },
  },
  plugins: [],
}
