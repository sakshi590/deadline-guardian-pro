// src/theme/lightTheme.js

export const lightThemeOptions = {
  palette: {
    mode: "light",

    primary: {
      main: "#6366F1", // Indigo
      light: "#818CF8",
      dark: "#4338CA",
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#8B5CF6", // Violet
      light: "#A78BFA",
      dark: "#7C3AED",
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
      main: "#0EA5E9",
    },

    background: {
      default: "#F5F7FB",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#1E293B",
      secondary: "#64748B",
    },

    divider: "#E2E8F0",
  },

  shape: {
    borderRadius: 16,
  },

  shadows: [
    "none",
    "0 1px 3px rgba(0,0,0,0.08)",
    "0 2px 6px rgba(0,0,0,0.08)",
    "0 4px 12px rgba(0,0,0,0.08)",
    "0 6px 18px rgba(0,0,0,0.10)",
    "0 8px 24px rgba(0,0,0,0.12)",
    "0 12px 32px rgba(0,0,0,0.14)",
    ...Array(18).fill("0 12px 32px rgba(0,0,0,0.14)")
  ],

  custom: {
    gradientPrimary:
      "linear-gradient(135deg,#6366F1 0%,#8B5CF6 100%)",

    gradientSuccess:
      "linear-gradient(135deg,#22C55E,#16A34A)",

    gradientWarning:
      "linear-gradient(135deg,#F59E0B,#F97316)",

    gradientDanger:
      "linear-gradient(135deg,#EF4444,#DC2626)",

    sidebarBackground: "#FFFFFF",

    navbarBackground: "rgba(255,255,255,0.8)",

    cardBackground: "#FFFFFF",

    glass:
      "rgba(255,255,255,0.75)",

    glassBorder:
      "1px solid rgba(255,255,255,0.25)",
  },
};