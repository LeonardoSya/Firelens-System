/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  relative: true,
  theme: {
    darkMode: 'selector',
    extend: {
      borderRadius: {
        't-4xl': '3rem',
      },
      fontFamily: {
        tiny: ['Tiny5', 'sans-serif'],
        acme: ['Acme', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
