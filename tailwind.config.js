/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {},
  },
  safelist: [
    {
      pattern: /grid-cols-\d+/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
  ],
  plugins: [],
}
