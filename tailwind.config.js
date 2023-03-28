/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage : {
        test : "url('/public/test2.jpeg')",
      },
      colors : {
        blue : {
          dark : "#0A192F",
          light : "1E324E"
        },
        gray : {
          light : "C4C4C4"
        }
      },
      keyframes: {
        text: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        }, headShake: {
          '0%': { transform: 'translateX(0)' },
          '6.5%': { transform: 'translateX(-6px) rotateY(-9deg)' },
          '18.5%': { transform: 'translateX(5px) rotateY(7deg)' },
          '31.5%': { transform: 'translateX(-3px) rotateY(-5deg)' },
          '43.5%': { transform: 'translateX(2px) rotateY(3deg)' },
          '50%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        text: 'text 5s ease infinite',
        headShake: 'headShake 2s infinite',
      },
      fontFamily: {
        body: ['Didact', 'sans-serif']
      },
    },
  },
  plugins: [],
}