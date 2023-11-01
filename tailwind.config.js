/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    extend: {},
    screens: {
      sm: "0px",
      md: "500px",
      lg: "760px",
      xl: "1200px",
    },
  },
  plugins: [],
};
