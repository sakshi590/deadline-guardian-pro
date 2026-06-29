import React from "react";
import ReactDOM from "react-dom/client";
import { AIProvider } from "./context/AIContext";
import App from "./App";

import CssBaseline from "@mui/material/CssBaseline";

import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";
import { UIProvider } from "./context/UIContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <CssBaseline />

      <AuthProvider>
        <AIProvider>
        <TaskProvider>
          <UIProvider>
            <App />
          </UIProvider>
        </TaskProvider>
        </AIProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);