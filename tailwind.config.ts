import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#070707",
        panel: "#111111",
        brand: "#e50914",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "sans-serif"],
        display: ["var(--font-manrope)", "Arial", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 32px rgba(229, 9, 20, 0.24)",
      },
    },
  },
  plugins: [],
} satisfies Config;

