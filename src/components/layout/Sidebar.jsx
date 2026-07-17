// src/components/layout/Sidebar.jsx
import { NavLink } from "react-router-dom";
import {
  Box,
  Drawer,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Tooltip,
  alpha,
} from "@mui/material";

import {
  Dashboard,
  Assignment,
  CalendarMonth,
  Analytics,
  SmartToy,
  Person,
  Settings,
} from "@mui/icons-material";

import { useUI } from "../../context/UIContext";

const drawerWidth = 270;
const collapsedWidth = 80;

const menuItems = [
  { title: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
  { title: "Tasks", icon: <Assignment />, path: "/tasks" },
  { title: "Calendar", icon: <CalendarMonth />, path: "/calendar" },
  { title: "Analytics", icon: <Analytics />, path: "/analytics" },
  { title: "AI Assistant", icon: <SmartToy />, path: "/ai" },
  { title: "Profile", icon: <Person />, path: "/profile" },
  { title: "Settings", icon: <Settings />, path: "/settings" },
];

const Sidebar = () => {
  const { sidebarOpen, mobileOpen, toggleMobileDrawer } = useUI();

  const drawerContent = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", bgcolor: "background.paper" }}>
      {/* ================= HEADER BRAND BLOCK ================= */}
      <Toolbar
        sx={{
          justifyContent: sidebarOpen ? "flex-start" : "center",
          px: sidebarOpen ? "24px !important" : "8px !important",
          py: 3,
        }}
      >
        <Avatar
          sx={{
            background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
            color: "primary.contrastText",
            fontWeight: 800,
            fontSize: "1.1rem",
            width: 44,
            height: 44,
            mr: sidebarOpen ? 1.5 : 0,
            boxShadow: (theme) => `0 4px 12px ${alpha(theme.palette.primary.main, 0.25)}`
          }}
        >
          DG
        </Avatar>

        {sidebarOpen && (
          <Box>
            <Typography variant="subtitle1" fontWeight={800} sx={{ color: "text.primary", lineHeight: 1.2, letterSpacing: "-0.01em" }}>
              Deadline
            </Typography>
            <Typography variant="caption" sx={{ color: "primary.main", fontWeight: 700, letterSpacing: "0.02em", textTransform: "uppercase", fontSize: "0.65rem" }}>
              Guardian Pro
            </Typography>
          </Box>
        )}
      </Toolbar>

      <Divider sx={{ borderColor: "divider", mx: 2 }} />

      {/* ================= NAVIGATION LINKS LIST ================= */}
      <List sx={{ mt: 2, px: 1.5 }}>
        {menuItems.map((item) => (
          <Tooltip key={item.title} title={sidebarOpen ? "" : item.title} placement="right" arrow>
            <ListItemButton
              component={NavLink}
              to={item.path}
              sx={{
                mb: 0.75,
                minHeight: 48,
                borderRadius: "14px",
                justifyContent: sidebarOpen ? "initial" : "center",
                px: sidebarOpen ? 2 : 1.5,
                color: "text.secondary", // ✅ UPDATED: Native high-contrast text color token
                transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",

                "& .MuiListItemIcon-root": {
                  color: "text.secondary",
                  transition: "color 0.2s ease",
                },
                "& .MuiListItemText-primary": {
                  fontWeight: 600,
                  fontSize: "0.925rem",
                  letterSpacing: "-0.01em",
                },

                // Active Link States Adaptive Gradient Frame Mapping
                "&.active": {
                  background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
                  color: "primary.contrastText", // ✅ UPDATED: Adapts cleanly to dark/light variants
                  boxShadow: (theme) => `0 8px 20px ${alpha(theme.palette.primary.main, 0.2)}`,

                  "& .MuiListItemIcon-root": {
                    color: "primary.contrastText",
                  },
                  "&:hover": {
                    background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                  },
                },

                "&:hover:not(.active)": {
                  bgcolor: "action.hover",
                  color: "text.primary",
                  "& .MuiListItemIcon-root": {
                    color: "primary.main",
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: sidebarOpen ? 2 : "auto",
                  justifyContent: "center",
                  "& .MuiSvgIcon-root": { fontSize: 22 }
                }}
              >
                {item.icon}
              </ListItemIcon>

              {sidebarOpen && (
                <ListItemText primary={item.title} disableTypography />
              )}
            </ListItemButton>
          </Tooltip>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Divider sx={{ borderColor: "divider", mx: 2 }} />

      {/* ================= SIDEBAR FOOTER BRANDING ================= */}
      <Box sx={{ p: 2.5, textAlign: "center" }}>
        {sidebarOpen ? (
          <Box sx={{ bgcolor: (theme) => alpha(theme.palette.text.primary, 0.02), p: 1.5, borderRadius: "12px", border: "1px solid", borderColor: "divider" }}>
            <Typography variant="caption" fontWeight={800} sx={{ color: "text.primary", display: "block" }}>
              Deadline Guardian Pro
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.7rem", fontWeight: 500, display: "block", mt: 0.25 }}>
              AI Powered Productivity
            </Typography>
          </Box>
        ) : (
          <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, letterSpacing: "0.05em" }}>
            V1.0
          </Typography>
        )}
      </Box>
    </Box>
  );

  const drawerPaperStyles = {
    bgcolor: "background.paper", // ✅ UPDATED: Shifts background surfaces seamlessly
    borderRight: "1px solid",
    borderColor: "divider",
    boxShadow: (theme) => theme.palette.mode === "dark" ? "4px 0 24px rgba(0,0,0,0.3)" : "4px 0 24px rgba(15, 23, 42, 0.01)",
    backgroundImage: "none",
  };

  return (
    <>
      {/* Mobile Temporary Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={toggleMobileDrawer}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            ...drawerPaperStyles,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Persistent Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          width: sidebarOpen ? drawerWidth : collapsedWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: sidebarOpen ? drawerWidth : collapsedWidth,
            transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
            overflowX: "hidden",
            ...drawerPaperStyles,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
