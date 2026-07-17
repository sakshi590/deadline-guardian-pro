// src/context/UIContext.jsx
import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { useAuth } from "./AuthContext"; 

const UIContext = createContext(null);

export const UIProvider = ({ children }) => {
  const { user } = useAuth(); 

  // Initialize background state theme based on disk storage cache flags or native OS defaults
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("deadline_guardian_theme");
    if (saved === "dark") return true;
    if (saved === "light") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Sidebar controls
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Mobile Drawer controls
  const [mobileOpen, setMobileOpen] = useState(false);

  // Global Loading framework triggers
  const [loading, setLoading] = useState(false);

  // Dialog configurations
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  // Focus data selection indexes
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskMode, setTaskMode] = useState("create");

  // Auxiliary context attributes
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const [calendarView, setCalendarView] = useState("month");
  const [dashboardFilter, setDashboardFilter] = useState("all");

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // ✅ FIXED SYSTEM & ACCOUNT SYNCHRONIZATION ENGINE
  // Listens to user account changes or selection toggles. Enforces 
  // precise layout rules for light, dark, and system preference overrides.
  useEffect(() => {
    if (user?.settings?.theme) {
      const currentSelection = user.settings.theme;
      let targetDarkState = darkMode;

      if (currentSelection === "system") {
        // Native media listener queries your current OS preferences instantly
        targetDarkState = window.matchMedia("(prefers-color-scheme: dark)").matches;
      } else {
        targetDarkState = currentSelection === "dark";
      }

      // Snap internal state indicator flags into position cleanly
      if (targetDarkState !== darkMode) {
        setDarkMode(targetDarkState);
        localStorage.setItem("deadline_guardian_theme", targetDarkState ? "dark" : "light");
      }
    }
  }, [user, darkMode]);

  /* ========================================
     Theme Engine Direct Toggle
  ======================================== */
  const toggleTheme = () => {
    setDarkMode((prev) => {
      const nextState = !prev;
      localStorage.setItem("deadline_guardian_theme", nextState ? "dark" : "light");
      return nextState;
    });
  };

  /* ========================================
     Snackbar Actions
  ======================================== */
  const showSnackbar = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const closeSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  /* ========================================
     Sidebar Controls
  ======================================== */
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const toggleMobileDrawer = () => {
    setMobileOpen((prev) => !prev);
  };

  /* ========================================
     Task Dialog Controllers
  ======================================== */
  const openTaskDialog = (task = null, mode = "create") => {
    setSelectedTask(task);
    setTaskMode(mode);
    setTaskDialogOpen(true);
  };

  const closeTaskDialog = () => {
    setTaskDialogOpen(false);
    setSelectedTask(null);
    setTaskMode("create");
  };

  /* ========================================
     Confirmation Dialog Controllers
  ======================================== */
  const openConfirmDialog = () => {
    setConfirmDialogOpen(true);
  };

  const closeConfirmDialog = () => {
    setConfirmDialogOpen(false);
  };

  const value = useMemo(
    () => ({
      darkMode,
      toggleTheme,
      sidebarOpen,
      mobileOpen,
      loading,
      taskDialogOpen,
      confirmDialogOpen,
      selectedTask,
      taskMode,
      searchQuery,
      notificationOpen,
      aiPanelOpen,
      calendarView,
      dashboardFilter,
      snackbar,
      setSidebarOpen,
      setMobileOpen,
      setLoading,
      setSearchQuery,
      setNotificationOpen,
      setAiPanelOpen,
      setCalendarView,
      setDashboardFilter,
      toggleSidebar,
      toggleMobileDrawer,
      openTaskDialog,
      closeTaskDialog,
      openConfirmDialog,
      closeConfirmDialog,
      showSnackbar,
      closeSnackbar,
      setTaskMode,
      setSelectedTask,
    }),
    [
      darkMode,
      sidebarOpen,
      mobileOpen,
      loading,
      taskDialogOpen,
      confirmDialogOpen,
      selectedTask,
      taskMode,
      searchQuery,
      notificationOpen,
      aiPanelOpen,
      calendarView,
      dashboardFilter,
      snackbar,
    ]
  );

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used inside UIProvider");
  }
  return context;
};

export default UIContext;
