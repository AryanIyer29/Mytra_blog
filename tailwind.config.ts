import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
  primary: "#2B124C",     // Purple background
  secondary: "#3B1D6A",   // Card purple
  accent: "#FF8A00",      // Orange buttons
  textPrimary: "#F9FAFB",
  textMuted: "#D1CFE2",
  border: "#4B2C82",
},

    },
  },
  plugins: [],
};

export default config;
