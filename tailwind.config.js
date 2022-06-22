/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./grocery.html"],
  theme: {
    extend: {},
  },
  plugins: [
    // ...
    require('@tailwindcss/forms'),
  ],
}
