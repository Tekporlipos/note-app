/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  variants: {
    extend: {
      textColor: ["responsive", "hover", "focus", "active", "group-hover"],
      textDecoration: ["responsive", "hover", "focus", "active", "group-hover"],
    },
  },
  theme: {
    extend: {},
    container: {
      center: true,
    },
  },
  plugins: [],
}

