import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useUI } from "../../context/UIContext";

function Layout() {
  const { sidebarOpen } = useUI();
  const drawerWidth = sidebarOpen ? 240 : 70;

  return (
    <Box sx={{ display: "flex" }}>
      {/* Global Navigation Structure */}
      <Navbar />
      <Sidebar />

      {/* Dynamic Route Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          transition: "margin-left 0.3s ease, width 0.3s ease",
        }}
      >
        <Toolbar /> {/* Spaces content directly below the fixed height Navbar */}
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
