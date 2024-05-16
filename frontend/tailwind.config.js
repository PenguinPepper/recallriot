/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'signup': "url('assets/bg-image.svg')",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

