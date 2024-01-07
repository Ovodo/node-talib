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
        "body-color": "var(--body-color)",
        "header-color": "var(--header-color)",
        indicatot: "var(--indicatot)",
        maroon: "#8A232A",
      },
      fontFamily: {
        body: "var(--body-font-family)",
        header: "var(--header-font-family)",
        "main-header": "var(--main-header-font-family)",
        "sub-head": "var(--sub-head-font-family)",
        "tiny-text": "var(--tiny-text-font-family)",
      },
    },
  },
  plugins: [],
};
export default config;
