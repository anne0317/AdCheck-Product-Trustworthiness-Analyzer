/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#0d1321",
      },
      boxShadow: {
        glow: "0 0 40px rgba(56, 217, 169, 0.18)",
        panel: "0 24px 80px rgba(5, 10, 25, 0.32)",
      },
      backgroundImage: {
        "trust-grid":
          "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
