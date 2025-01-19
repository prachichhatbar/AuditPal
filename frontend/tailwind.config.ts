import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      primary: {
        text: '#1F2937',  // Dark text color
        blue: '#6366F1',  // For buttons and accents
      },
      chart: {
        blue: '#818CF8',   // For risk score bars
        green: '#34D399',  // For transaction bars
      },
      background: {
        light: '#FFFFFF',
        card: '#F9FAFB',
      }
    },
  },
  plugins: [],
} satisfies Config;

