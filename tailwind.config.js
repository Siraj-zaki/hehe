module.exports = {
  content: [
    "./src/screens/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/custom-forms'),
    require('tailwind-scrollbar'),
    require('tailwindcss'),
    require('autoprefixer')
  ],
}