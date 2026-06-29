// src/context/UIContext.jsx

import { createContext, useContext, useMemo, useState } from "react";

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  // Sidebar
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Mobile Drawer
  const [mobileOpen, setMobileOpen] = useState(false);

  // Global Loading
  const [loading, setLoading] = useState(false);

  // Dialogs
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  // Selected Task
  const [selectedTask, setSelectedTask] = useState(null);

  // Search
  const [searchQuery, setSearchQuery] = useState("");

  // Notification Panel
  const [notificationOpen, setNotificationOpen] = useState(false);

  // AI Assistant
  const [aiPanelOpen, setAiPanelOpen] = useState(false);

  // Calendar
  const [calendarView, setCalendarView] = useState("month");

  // Dashboard Filter
  const [dashboardFilter, setDashboardFilter] = useState("all");

  // Snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (
    message,
    severity = "success"
  ) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const closeSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const toggleMobileDrawer = () => {
    setMobileOpen((prev) => !prev);
  };

  const openTaskDialog = (task = null, mode = "create") => {
  setSelectedTask(task);
  setTaskMode(mode);
  setTaskDialogOpen(true);
};

  const closeTaskDialog = () => {
    setSelectedTask(null);
    setTaskDialogOpen(false);
  };

  const openConfirmDialog = () => {
    setConfirmDialogOpen(true);
  };

  const closeConfirmDialog = () => {
    setConfirmDialogOpen(false);
  };

  const [taskMode, setTaskMode] = useState("create"); // create | edit
  const value = useMemo(
    () => ({
      sidebarOpen,
      mobileOpen,
      loading,
      taskDialogOpen,
      confirmDialogOpen,
      selectedTask,
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
      taskMode,
setTaskMode,
    }),
    [
      sidebarOpen,
      mobileOpen,
      loading,
      taskDialogOpen,
      confirmDialogOpen,
      selectedTask,
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

export const useUI = () => useContext(UIContext);

export default UIContext;