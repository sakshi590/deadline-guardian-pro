import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { lightThemeOptions } from "./lightTheme";
import { darkThemeOptions } from "./darkTheme";

/**
 * Returns a Material UI theme based on the selected mode.
 * @param {"light" | "dark"} mode
 */
export const getTheme = (mode = "light") => {
  const options = mode === "dark" ? darkThemeOptions : lightThemeOptions;

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

      h1: {
        fontWeight: 700,
        fontSize: "2.5rem",
      },

      h2: {
        fontWeight: 700,
        fontSize: "2rem",
      },

      h3: {
        fontWeight: 600,
        fontSize: "1.75rem",
      },

      h4: {
        fontWeight: 600,
        fontSize: "1.5rem",
      },

      h5: {
        fontWeight: 600,
        fontSize: "1.25rem",
      },

      h6: {
        fontWeight: 600,
        fontSize: "1rem",
      },

      subtitle1: {
        fontWeight: 500,
      },

      subtitle2: {
        fontWeight: 500,
      },

      body1: {
        fontSize: "0.95rem",
      },

      body2: {
        fontSize: "0.875rem",
      },

      button: {
        fontWeight: 600,
        textTransform: "none",
      },
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

          "*::-webkit-scrollbar-thumb": {
            background: "#8B5CF6",
            borderRadius: 10,
          },

          "*::-webkit-scrollbar-track": {
            background: "#F3F4F6",
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 18,
            transition: "0.3s",
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