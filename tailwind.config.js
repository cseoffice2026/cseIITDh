// Tailwind v4 reads colors from @theme in index.css.
// This file is only needed if you add `@config "../tailwind.config.js";` to index.css.
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7B3FBE",
        secondary: "#B58AE8",
        background: "#F4F2F8",
        surface: "#EDE5F8",
        muted: "#6B7080",
        heading: "#0F0F14",
        footer: "#0D0B1A",
      },
    },
  },
  plugins: [],
};