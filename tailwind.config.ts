import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f7f8fa",
          100: "#edf0f4",
          200: "#dbe2ec",
          300: "#bcc8d8",
          400: "#95a8bf",
          500: "#7489a5",
          600: "#5f718a",
          700: "#4e5c71",
          800: "#434d5e",
          900: "#232831"
        },
        accent: {
          50: "#eef8ff",
          100: "#d8eeff",
          200: "#b9e2ff",
          300: "#88cfff",
          400: "#50b4ff",
          500: "#1e8fff",
          600: "#0d71db",
          700: "#0f5aac",
          800: "#124c8d",
          900: "#153f73"
        }
      },
      boxShadow: {
        card: "0 8px 30px rgba(12, 20, 33, 0.08)",
        "card-dark": "0 12px 40px rgba(0, 0, 0, 0.35)"
      },
      borderRadius: {
        xl2: "1.25rem"
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        shimmer: "shimmer 2.5s linear infinite"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" }
        }
      }
    }
  },
  plugins: [typography]
};

export default config;
