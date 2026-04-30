const palette = {
  light: {
    background: "#ffffff",
    surface: "#f8fafc",
    card: "#ffffff",
    text: "#1e293b",
    muted: "#64748b",
    border: "#e2e8f0",
    primary: "#3b82f6",
    primaryForeground: "#ffffff",
    accent: "#14b8a6",
    header: "#dbeafe",
    icon: "#64748b",
  },
  dark: {
    background: "#0f172a",
    surface: "#111827",
    card: "#1e293b",
    text: "#f8fafc",
    muted: "#94a3b8",
    border: "#334155",
    primary: "#60a5fa",
    primaryForeground: "#0f172a",
    accent: "#2dd4bf",
    header: "#172554",
    icon: "#94a3b8",
  },
};

const cssVariableNames = {
  background: "background",
  surface: "surface",
  card: "card",
  text: "text",
  muted: "muted",
  border: "border",
  primary: "primary",
  primaryForeground: "primary-foreground",
  accent: "accent",
  header: "header",
};

module.exports = {
  palette,
  cssVariableNames,
};
