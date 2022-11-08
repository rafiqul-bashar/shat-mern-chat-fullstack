/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    xs: "360px",
    ...defaultTheme.screens,
    extend: {
      colors: {
        primary: "#ee7b64",
        dark: "#616161",
      },
    },
  },
  plugins: [],
};
