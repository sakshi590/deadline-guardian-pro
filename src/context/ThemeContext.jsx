// src/context/ThemeContext.jsx

import {
  createContext,
  useContext,
  useMemo,
} from "react";

import {
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";

import { getTheme } from "../theme/theme";
import { useSettings } from "./SettingsContext";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { settings } = useSettings();

  const prefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const mode =
    settings.theme === "system"
      ? prefersDark
        ? "dark"
        : "light"
      : settings.theme;

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeContext.Provider
      value={{
        mode,
        isDark: mode === "dark",
      }}
    >
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useThemeContext must be used inside ThemeProvider."
    );
  }

  return context;
};

export default ThemeContext;