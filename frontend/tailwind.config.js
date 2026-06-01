/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "SF Pro Display",
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro",
          "SF Pro Text",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        primary: "#2D2639",
        accent: "#FF6B6B",
        gray: {
          105: "#f5f6f8",
          150: "#e7e9ee",
          250: "#d2d7e1",
          350: "#b7c0cf",
          405: "#8f98a8",
          450: "#7c8597",
          550: "#5f6878",
          650: "#4c5565",
          750: "#303846",
        },
        slate: {
          250: "#d9dee8",
          350: "#9aa4b5",
        },
        sky: {
          450: "#38bdf8",
        },
      },
      fontSize: {
        "3.5xl": ["2rem", { lineHeight: "2.25rem" }],
      },
      spacing: {
        4.5: "1.125rem",
      },
      ringWidth: {
        3: "3px",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(15, 23, 42, 0.06)",
      },
      backdropBlur: {
        xs: "2px",
      },
      scale: {
        98: ".98",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.25s ease-out",
      },
    },
  },
  plugins: [],
};
