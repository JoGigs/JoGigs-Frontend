module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#2cb67d",
        "primary-dark": "#249c6b",
        "jogigs-bg": "#f0f4f2",
        accent: "#f9bc60",
        "background-light": "#ffffff",
        "background-dark": "#161b1d",
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "sans-serif"],
        body: ["Outfit", "sans-serif"],
        handwritten: ["Caveat", "cursive"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        full: "9999px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
