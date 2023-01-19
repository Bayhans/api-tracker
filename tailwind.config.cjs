const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  mode: 'jit',
  
  theme: {
    extend: {
      fontFamily: {
        display: ["Heebo", ...defaultTheme.fontFamily.serif],
      },
      colors:{
        'very-dark-gray': 'hsl(0, 0%, 17%)',
        'dark-gray': 'hsl(0, 0%, 59%)',
      },
      transition: {
        "transform": "all 0.2s ease",
        "opacity": "all 0.2s ease"
      },
    },
  },
  plugins: [],
};
