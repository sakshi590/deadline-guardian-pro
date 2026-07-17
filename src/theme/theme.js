// src/theme/theme.js
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { lightThemeOptions } from "./lightTheme";
import { darkThemeOptions } from "./darkTheme";

/**
 * Returns a Material UI theme based on the selected mode.
 * @param {"light" | "dark"} mode
 */
export const getTheme = (mode = "light") => {
  const options = mode === "dark" ? darkThemeOptions : lightThemeOptions;
  const isDark = mode === "dark";

  let theme = createTheme({
    ...options,
    shape: {
      borderRadius: 14,
    },
    typography: {
      fontFamily: [
        "Inter",
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
      ].join(","),

      h1: { fontWeight: 700, fontSize: "2.5rem" },
      h2: { fontWeight: 700, fontSize: "2rem" },
      h3: { fontWeight: 600, fontSize: "1.75rem" },
      h4: { fontWeight: 600, fontSize: "1.5rem" },
      h5: { fontWeight: 600, fontSize: "1.25rem" },
      h6: { fontWeight: 600, fontSize: "1rem" },
      subtitle1: { fontWeight: 500 },
      subtitle2: { fontWeight: 500 },
      body1: { fontSize: "0.95rem" },
      body2: { fontSize: "0.875rem" },
      button: { fontWeight: 600, textTransform: "none" },
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            margin: 0,
            padding: 0,
            transition: "all .3s ease",
          },
          "*": {
            boxSizing: "border-box",
          },
          "*::-webkit-scrollbar": {
            width: 8,
            height: 8,
          },
          // FIXED: Scrollbars now adapt dynamically based on dark/light mode
          "*::-webkit-scrollbar-thumb": {
            background: isDark ? "#475569" : "#CBD5E1",
            borderRadius: 10,
            "&:hover": {
              background: isDark ? "#64748B" : "#94A3B8",
            },
          },
          "*::-webkit-scrollbar-track": {
            background: isDark ? "#0F172A" : "#F8FAFC",
          },
        },
      },

      // FIXED: Merged external orphaned block rules cleanly inside components mapping
      MuiTypography: {
        styleOverrides: {
          root: {
            color: "inherit",
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
            backgroundImage: "none", // Prevent dark mode overlay layer anomalies
          },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 18,
            transition: "0.3s",
            backgroundImage: "none",
            color: "inherit",
          },
        },
      },

      MuiListItemText: {
        styleOverrides: {
          primary: {
            color: "inherit",
          },
          secondary: {
            color: "inherit",
          },
        },
      },

      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            borderRadius: 12,
            padding: "10px 18px",
            fontWeight: 600,
          },
        },
      },

      MuiTextField: {
        defaultProps: {
          variant: "outlined",
          fullWidth: true,
        },
      },

      MuiAppBar: {
        styleOverrides: {
          root: {
            backdropFilter: "blur(12px)",
          },
        },
      },
    },
  });

  theme = responsiveFontSizes(theme);
  return theme;
};
