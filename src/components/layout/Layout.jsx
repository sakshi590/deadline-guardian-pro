// src/components/layout/Layout.jsx
import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

// Global Dialogs
import TaskDialog from "../task/TaskDialog";
import { useUI } from "../../context/UIContext";

const DRAWER_WIDTH = 270;

const Layout = () => {
  const { sidebarOpen } = useUI();

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        // ✅ UPDATED: Adapts cleanly to off-white in Light mode and dark slate in Dark mode
        bgcolor: "background.default", 
        // ✅ UPDATED: Adapts cleanly to charcoal slate in Light mode and pure white in Dark mode
        color: "text.primary", 
      }}
    >
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Main Collapsible Sidebar Navigation Panel */}
      <Sidebar />

      {/* Main Core View Area Chassis */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: {
            md: `calc(100% - ${sidebarOpen ? DRAWER_WIDTH : 80}px)`,
          },
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)", 
          display: "flex",
          flexDirection: "column",
          minWidth: 0, 
        }}
      >
        {/* Safe Spacer Offset for Floating Navbar Layout */}
        <Toolbar />

        {/* Dynamic Inner Page Content Mounting Node Container */}
        <Box
          sx={{
            flex: 1,
            p: {
              xs: 2.5,
              sm: 3.5,
              md: 5, 
            },
          }}
        >
          <Outlet />
        </Box>

        {/* Universal Footer Component Section */}
        <Footer />
      </Box>

      {/* Global Application Dialogue Subclasses */}
      <TaskDialog />
    </Box>
  );
};

export default Layout;
