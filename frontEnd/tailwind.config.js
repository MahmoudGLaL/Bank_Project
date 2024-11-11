/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'gold': '0 4px 6px -1px rgba(255, 215, 0, 0.5), 0 2px 4px -1px rgba(255, 215, 0, 0.25)',
      },
      screens: {
        '2xl': {'max': '1400px' , 'min' : '1280px' },
        // => @media (max-width: 1535px) { ... }
  
        'xl': {'max': '1279px' , 'min' : '1024px'},
        // => @media (max-width: 1279px) { ... }
  
        'lg': {'max': '1023px' , 'min' : '867px'},
        // => @media (max-width: 1023px) { ... }
  
        'md': {'max': '866px'  , 'min' : '640px'},
        // => @media (max-width: 767px) { ... }
  
        'sm': {'max': '639px'},
        // => @media (max-width: 639px) { ... }
      } ,

      fontFamily: {
        tajawal: ['Tajawal', 'sans-serif'],
        cairo: ['Cairo', 'sans-serif'],
        amiri: ['Amiri', 'serif'],
        lateef: ['Lateef', 'cursive'],
        notoNaskh: ['Noto Naskh Arabic', 'serif'],
      },
      keyframes: {
        swal2show: {
          '0%': { transform: 'scale(0.7)' },
          '45%': { transform: 'scale(1.05)' },
          '80%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },

        swal2hide: {
          '0%': { transform: 'scale(1)' },
          '45%': { transform: 'scale(0.95)' },
          '80%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(0.7)' },
        },  
        fadeInOut: {
          '0%, 100%': { opacity: 0 },
          '25%, 75%': { opacity: 1 },
          '50%': { opacity: 1 },
        },
        grow: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.5)' },
        },
      },
      
      animation: {
        fadeInOut: 'fadeInOut 3s ease-in-out infinite',
        swal2show: 'swal2show 0.6s ',
        swal2hide: 'swal2hide 0.8s ease-in ',
        'spin-grow': 'spin 1s linear infinite, grow 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

