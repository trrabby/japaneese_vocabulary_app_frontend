/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#2C3E50", // Dark blue-gray
        third: "#9B59B6", // Vibrant red
        primary: "#F1C40F", // Golden yellow
        fourth: "#1ABC9C", // Turquoise
      },
    },
  },
  plugins: [require("daisyui")],
};
