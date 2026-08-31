import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#06110f",
        panel: "#0b1b18",
        cyan: "#66e2ee",
        mint: "#3ee6a8"
      },
      boxShadow: {
        glow: "0 0 40px rgba(102, 226, 238, 0.09)"
      }
    }
  },
  plugins: []
};

export default config;

