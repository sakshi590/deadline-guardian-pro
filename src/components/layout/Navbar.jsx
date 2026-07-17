// src/components/layout/Navbar.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  Stack,
  alpha,
} from "@mui/material";

import {
  Menu as MenuIcon,
  NotificationsNone,
  Person,
  Logout,
  Settings,
} from "@mui/icons-material";

import { useUI } from "../../context/UIContext";
import { useAuth } from "../../context/AuthContext";
import { useTasks } from "../../context/TaskContext"; 
import NotificationPopover from "./NotificationPopover"; 

const Navbar = () => {
  const navigate = useNavigate();

  const { toggleSidebar, toggleMobileDrawer, setNotificationOpen } = useUI();
  const { user, logout } = useAuth();
  const { tasks: contextTasks = [] } = useTasks() || {}; 

  const [anchorEl, setAnchorEl] = useState(null);
  const [notifAnchorEl, setNotifAnchorEl] = useState(null); 
  const [localTasks, setLocalTasks] = useState([]);

  const open = Boolean(anchorEl);

  // Sync state cleanly when context tasks update
  useEffect(() => {
    if (contextTasks && contextTasks.length > 0) {
      setLocalTasks(contextTasks);
    }
  }, [contextTasks]);

  // Handle stream event cleanly without context override interference
  useEffect(() => {
    const handleSync = (event) => {
      if (event.detail && Array.isArray(event.detail)) {
        setLocalTasks(event.detail);
      }
    };
    window.addEventListener("deadline_guardian_sync_tasks", handleSync);
    return () => window.removeEventListener("deadline_guardian_sync_tasks", handleSync);
  }, []);

  const urgentCount = localTasks.filter((task) => {
    if (!task || !task.title) return false;
    
    const currentStatus = String(task.status || "").trim().toLowerCase();
    if (currentStatus === "completed" || currentStatus === "done") {
      return false;
    }

    if (task.title.toLowerCase().includes("dsa")) {
      return true;
    }

    const rawDateStr = task.dueDate || task.date || "";
    if (!rawDateStr) return false;

    const taskDate = dayjs(rawDateStr).startOf("day");
    const today = dayjs().startOf("day");
    const daysDifference = taskDate.diff(today, "day");
    
    return daysDifference >= -1 && daysDifference <= 2;
  }).length;

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotifOpen = (event) => {
    setNotifAnchorEl(event.currentTarget);
    setNotificationOpen(true);
  };

  const handleNotifClose = () => {
    setNotifAnchorEl(null);
    setNotificationOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: "blur(16px)",
          bgcolor: (theme) => alpha(theme.palette.background.paper, 0.85),
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Toolbar>
          <IconButton edge="start" onClick={toggleMobileDrawer} sx={{ mr: 1, color: "text.primary", display: { xs: "flex", md: "none" } }}><MenuIcon /></IconButton>
          <IconButton edge="start" onClick={toggleSidebar} sx={{ mr: 2, color: "text.primary", display: { xs: "none", md: "flex" } }}><MenuIcon /></IconButton>
          <Typography variant="h6" sx={{ fontWeight: 800, color: "primary.main", letterSpacing: "-0.02em" }}>Deadline Guardian Pro</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Stack spacing={1} sx={{ alignItems: "center", flexDirection: "row" }}>
            <Tooltip title="Appearance Settings">
              <IconButton onClick={() => navigate("/settings")} sx={{ color: "text.secondary", "&:hover": { bgcolor: "action.hover" } }}><Settings /></IconButton>
            </Tooltip>
            <Tooltip title="Notifications">
              <IconButton onClick={handleNotifOpen} sx={{ color: "text.secondary", "&:hover": { bgcolor: "action.hover" } }}><Badge badgeContent={urgentCount} color="error"><NotificationsNone /></Badge></IconButton>
            </Tooltip>
            <IconButton onClick={handleMenuOpen} sx={{ p: 0.5 }}>
              <Avatar src={user?.avatar || ""} sx={{ width: 38, height: 38, background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`, fontWeight: 700, fontSize: "0.95rem", color: "primary.contrastText" }}>{!user?.avatar && (user?.name ? user.name.charAt(0).toUpperCase() : "U")}</Avatar>
            </IconButton>
          </Stack>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose} PaperProps={{ sx: { mt: 1.5, minWidth: 200, borderRadius: 3, bgcolor: "background.paper", border: "1px solid", borderColor: "divider", backgroundImage: "none", boxShadow: (theme) => theme.palette.mode === "dark" ? "0 8px 24px rgba(0,0,0,0.4)" : "0 8px 24px rgba(15, 23, 42, 0.04)" } }}>
            <MenuItem onClick={() => { navigate("/profile"); handleClose(); }}><Person sx={{ mr: 1, fontSize: 20, color: "text.secondary" }} />Profile</MenuItem>
            <MenuItem onClick={() => { navigate("/settings"); handleClose(); }}><Settings sx={{ mr: 1, fontSize: 20, color: "text.secondary" }} />Settings</MenuItem>
            <Divider sx={{ borderColor: "divider" }} />
            <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}><Logout sx={{ mr: 1, fontSize: 20 }} />Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <NotificationPopover anchorEl={notifAnchorEl} onClose={handleNotifClose} />
    </>
  );
};

export default Navbar;
