/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  content: ["./Views/**"],
  theme: {
    extend: {
      colors : {
        prime : "#063091",
        accent : {
          1: "#16EEF0",
          2: "#0088B0",
          3: "#8B4EFF"
        },
        light : {
          1:"#F3F5F7",
          2: "#E8EAEE"
        },
        dark : {
          1: "#36353A",
          2: "#909399",
          3: "#C8E6FE"
        },
        alert : {
          "error" : "#6C5920",
          "warning": "#842029",
          "confirm1": "#0843A9",
          "confirm2": "#17171D",
        },
        ...colors
      },
      screens: {
        'xs': '540px',
        'om': '870px',
        ...defaultTheme.screens
      }
    },
  },
  plugins: [],
}

