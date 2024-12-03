/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bttn: "#409eff",
        dark: "#749DC8",
        txt: "#064089",
      },
    },
  },
  plugins: [require("daisyui")],
};
