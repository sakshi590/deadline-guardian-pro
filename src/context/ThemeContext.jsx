// src/context/ThemeContext.jsx

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";

import { getTheme } from "../theme/theme";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

  const [mode, setMode] = useState(() => {
    return localStorage.getItem("themeMode") || "light";
  });

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const setLightTheme = () => setMode("light");

  const setDarkTheme = () => setMode("dark");

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeContext.Provider
      value={{
        mode,
        toggleTheme,
        setLightTheme,
        setDarkTheme,
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
  return useContext(ThemeContext);
};

export default ThemeContext;