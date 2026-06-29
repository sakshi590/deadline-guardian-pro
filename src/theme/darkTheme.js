// src/theme/darkTheme.js

export const darkThemeOptions = {
  palette: {
    mode: "dark",

    primary: {
      main: "#818CF8",
      light: "#A5B4FC",
      dark: "#6366F1",
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#A78BFA",
      light: "#C4B5FD",
      dark: "#8B5CF6",
      contrastText: "#FFFFFF",
    },

    success: {
      main: "#22C55E",
    },

    warning: {
      main: "#F59E0B",
    },

    error: {
      main: "#EF4444",
    },

    info: {
      main: "#38BDF8",
    },

    background: {
      default: "#0F172A",
      paper: "#1E293B",
    },

    text: {
      primary: "#F8FAFC",
      secondary: "#CBD5E1",
    },

    divider: "#334155",
  },

  shape: {
    borderRadius: 16,
  },

  shadows: [
    "none",
    "0 1px 3px rgba(0,0,0,0.40)",
    "0 2px 6px rgba(0,0,0,0.45)",
    "0 4px 12px rgba(0,0,0,0.50)",
    "0 6px 18px rgba(0,0,0,0.55)",
    "0 8px 24px rgba(0,0,0,0.60)",
    "0 12px 32px rgba(0,0,0,0.65)",
    ...Array(18).fill("0 12px 32px rgba(0,0,0,0.65)")
  ],

  custom: {
    gradientPrimary:
      "linear-gradient(135deg,#6366F1,#8B5CF6)",

    gradientSuccess:
      "linear-gradient(135deg,#22C55E,#15803D)",

    gradientWarning:
      "linear-gradient(135deg,#F59E0B,#EA580C)",

    gradientDanger:
      "linear-gradient(135deg,#EF4444,#B91C1C)",

    sidebarBackground: "#111827",

    navbarBackground: "rgba(17,24,39,0.85)",

    cardBackground: "#1E293B",

    glass: "rgba(30,41,59,0.75)",

    glassBorder:
      "1px solid rgba(255,255,255,0.08)",
  },
};