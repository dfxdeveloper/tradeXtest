/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "3rem",
        xl: "2rem",
        "2xl": "4rem",
      },
    },
    extend: {
      backgroundImage: {
        'nifty-gradient': 'linear-gradient(180deg, #667EEA -5.45%, #764BA2 100%)',
        'custom-gradient': 'linear-gradient(90deg, #3D4E81 0%, #5753C9 48%, #6E7FF3 100%)'
      },
      fontFamily: {
        euclid: ["Euclid"],
        gilroy: ["Gilroy", "Poppins", "Euclid", "sans-serif"],
      },
      colors: {
        customBlack: "#0E051B",
        purpleText: "#B039FF",
      },
      animation: {
        "fade-in": "fadeIn 1s ease-in-out",
        "slide-up": "slideUp 1s ease-out",
        drawLineRight: "drawLineRight 0.5s ease-out forwards",
        drawLineLeft: "drawLineLeft 0.5s ease-out forwards",
        drawLineDown: "drawLineDown 0.5s ease-out forwards",
        scroll: "scroll 18s linear infinite",
        "marquee-right": "marquee-right 10s linear infinite",
        "marquee-left": "marquee-left 10s linear infinite",
      },
      keyframes: {
        drawLineRight: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        drawLineLeft: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        drawLineDown: {
          "0%": { transform: "scaleY(0)" },
          "100%": { transform: "scaleY(1)" },
        },
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(50px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "marquee-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "marquee-left": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".hide-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
