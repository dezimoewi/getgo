/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",  // This is crucial – tells Tailwind where to scan for classes
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}