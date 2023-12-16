/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        //'main': '#00A3E1',
        'main': '#00B9FF',
        'background': '#292929',
        'primary-text': '#ffffff',
        'hover-overlay': 'rgba(255, 255, 255, 0.10)',
        'container': '#393939'
      }
    },
  },
  plugins: []
};
