// src/App.jsx
import { useMemo } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// ✅ FIXED: Imported Material UI's native theme provider and canvas reset engines
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import AppRoutes from "./routes/AppRoutes";
import { auth } from "./firebase/firebase";

// Import context provider modules
import { AuthProvider } from "./context/AuthContext"; 
import { TaskProvider } from "./context/TaskContext";
import { useUI, UIProvider } from "./context/UIContext"; // Included the useUI extractor hook link

// =========================================================
// ✅ FIXED: ACTIVE THEME ENCAPSULATOR SLOT
// This sub-component safely reads your live dark mode state and 
// instructs Material UI to instantly change background canvas colors.
// =========================================================
const AppContent = () => {
  const { darkMode } = useUI();

  // Dynamically regenerates palette colors on context changes
  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: darkMode ? "dark" : "light",
        primary: {
          main: "#6366F1", // Your signature royal violet layout token channel
          light: "#818CF8",
          dark: "#4F46E5",
          contrastText: "#FFFFFF",
        },
        background: {
          default: darkMode ? "#0F172A" : "#F8FAFC",
          paper: darkMode ? "#1E293B" : "#FFFFFF",
        },
        text: {
          primary: darkMode ? "#F8FAFC" : "#0F172A",
          secondary: darkMode ? "#94A3B8" : "#64748B",
        },
        divider: darkMode ? "rgba(255, 255, 255, 0.08)" : "rgba(15, 23, 42, 0.06)",
      },
      shape: {
        borderRadius: 12,
      },
      typography: {
        fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
      },
      components: {
        MuiCard: {
          styleOverrides: {
            root: {
              backgroundImage: "none", // Prevents grey overlays from muddying dark background tints
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundImage: "none",
            },
          },
        },
      },
    });
  }, [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      {/* Resets browser element structural defaults and applies background.default fills natively */}
      <CssBaseline />
      
      {/* The Core Application Router Stack */}
      <AppRoutes />
    </ThemeProvider>
  );
};

function App() {
  console.log("Firebase Auth Channel Initialised:", auth);

  return (
    <BrowserRouter>
      {/* Global high-performance toast banner interface layer */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            borderRadius: "16px",
            background: "#333",
            color: "#fff",
            fontWeight: 600,
          },
        }}
      />

      <AuthProvider>
        <UIProvider>
          <TaskProvider>
            
            {/* ✅ FIXED: Render the layout inside the content encapsulator box so it has access to the theme state */}
            <AppContent />

          </TaskProvider>
        </UIProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
