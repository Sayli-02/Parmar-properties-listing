import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Exact palette from user's specification:
        mineral: "#EDEEE9",    // Page background
        surface: "#F7F7F4",    // Cards & panels
        line: "#CFD1CA",       // Borders & dividers
        slateText: "#5B605F",  // Body text
        ink: "#15181A",        // Headings, primary text, dark bands
        brick: "#A2432B",      // The only accent
        brickHover: "#8C3822", // Accent hover
      },
      fontFamily: {
        serif: ["var(--font-heading)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        heading: ["var(--font-heading)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
