const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  mode: 'jit',
  
  theme: {
    extend: {
      fontFamily: {
        display: ["Heebo", ...defaultTheme.fontFamily.serif],
        // sec-display: ["Times New Roman", ...defaultTheme.fontFamily.times],
      },
      gridAutoRows: {
        '2fr': 'minmax(0, 2fr)',
      },
      transition: {
        "transform": "all 0.2s ease",
        "opacity": "all 0.2s ease"
      },
    },
  },
  plugins: [],
};
