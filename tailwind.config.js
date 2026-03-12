/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: '#F7F6F3',
        'sand-alt': '#EFEDE7',
        ink: '#1C1C1C',
        muted: '#6B6B6B',
        gold: '#C7A96B',
        rule: '#E4E4E4',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
