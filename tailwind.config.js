/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  relative: true,
  theme: {
    extend: {
      borderRadius: {
        't-4xl': '3rem',
      },
    },
  },
  plugins: [],
}
