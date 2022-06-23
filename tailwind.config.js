/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./grocery.html", "./game.html"],
  theme: {
    extend: {},
  },
  plugins: [
    // ...
    require('@tailwindcss/forms'),
  ],
}
