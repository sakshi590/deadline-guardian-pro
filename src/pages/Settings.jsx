// src/pages/Settings.jsx

import { useState } from "react";

import {
  Box,
  Typography,
} from "@mui/material";

import SettingsSidebar from "../components/settings/SettingsSidebar";
import AppearanceSettings from "../components/settings/AppearanceSettings";
import NotificationSettings from "../components/settings/NotificationSettings";

const Settings = () => {
  const [selected, setSelected] = useState("Appearance");

  const renderContent = () => {
    switch (selected) {
      case "Appearance":
        return <AppearanceSettings />;

      case "Notifications":
        return <NotificationSettings />;

      // ✅ FIXED: Clean fallback default option redirection to prevent any screen blanking errors
      default:
        return <AppearanceSettings />;
    }
  };

  return (
    <Box sx={{ maxWidth: "1400px", mx: "auto", p: { xs: 2, md: 4 } }}>
      
      {/* Header section segment typography layout container block */}
      <Typography
        variant="h4"
        fontWeight={800}
        sx={{ 
          letterSpacing: "-0.02em",
          color: "text.primary",
          mb: 4 
        }}
      >
        Settings
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Enforces clean, high-performance responsive layout grids
          gap: 3.5,
          alignItems: "flex-start"
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "auto" }, flexShrink: 0 }}>
          <SettingsSidebar
            selected={selected}
            setSelected={setSelected}
          />
        </Box>

        <Box
          sx={{
            flex: 1,
            width: "100%"
          }}
        >
          {renderContent()}
        </Box>

      </Box>

    </Box>
  );
};

export default Settings;
