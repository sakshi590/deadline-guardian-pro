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
        bgcolor: "background.default",
      }}
    >
      {/* Top Navigation */}
      <Navbar />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: {
            md: `calc(100% - ${
              sidebarOpen ? DRAWER_WIDTH : 80
            }px)`,
          },
          transition: "all 0.3s ease",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Space for Navbar */}
        <Toolbar />

        {/* Page Content */}
        <Box
          sx={{
            flex: 1,
            p: {
              xs: 2,
              sm: 3,
              md: 4,
            },
          }}
        >
          <Outlet />
        </Box>

        {/* Footer */}
        <Footer />
      </Box>

      {/* Global Dialogs */}
      <TaskDialog />
    </Box>
  );
};

export default Layout;