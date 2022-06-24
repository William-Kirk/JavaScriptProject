/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./grocery.html", "./game.html", "./weather.html"],
  theme: {
    extend: {},
  },
  plugins: [
    // ...
    require('@tailwindcss/forms',),
  ],
}
