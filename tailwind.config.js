const { cssVariableNames, palette } = require("./constants/palette");

const nativeWindColors = Object.fromEntries(
  Object.values(cssVariableNames).map((name) => [name, `var(--color-${name})`])
);

function buildColorVariables(scheme) {
  return Object.fromEntries(
    Object.entries(cssVariableNames).map(([token, name]) => [
      `--color-${name}`,
      palette[scheme][token],
    ])
  );
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./App.tsx",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./app/*.{ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: nativeWindColors,
    },
  },
  plugins: [
    ({ addBase }) => {
      addBase({
        ":root": buildColorVariables("light"),
        ".dark": buildColorVariables("dark"),
      });
    },
  ],
};
