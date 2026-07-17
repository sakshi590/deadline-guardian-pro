// src/components/settings/AppearanceSettings.jsx
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  Chip,
} from "@mui/material";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";

import { useUI } from "../../context/UIContext";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const AppearanceSettings = () => {
  const { darkMode, toggleTheme } = useUI();
  const { user, updateProfile } = useAuth();

  // ✅ THE SYSTEM FIX: Track the exact selection ("light", "dark", or "system") independently from the active theme mode
  const [selectedThemeOption, setSelectedThemeOption] = useState(() => {
    return user?.settings?.theme || "system";
  });

  // Keep local radio buttons in sync if the database payload updates or user switches
  useEffect(() => {
    if (user?.settings?.theme) {
      setSelectedThemeOption(user.settings.theme);
    }
  }, [user]);

  const handleThemeChange = async (event) => {
    const selectedMode = event.target.value; // "light", "dark", or "system"
    setSelectedThemeOption(selectedMode);

    // 1. Determine target look based on native OS preferences if "system" is chosen
    let wantsDarkMode = darkMode;
    if (selectedMode === "system") {
      wantsDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    } else {
      wantsDarkMode = selectedMode === "dark";
    }

    // 2. Flip global design skin on screen if current application mode does not match the target
    if (wantsDarkMode !== darkMode) {
      toggleTheme();
    }

    // 3. ✅ CRITICAL MULTI-USER ISOLATION GUARD: Save the exact option choice to Firestore quietly in the background
    if (user) {
      try {
        await updateProfile({
          settings: {
            ...user?.settings,
            theme: selectedMode 
          }
        });
      } catch (err) {
        console.error("Database user profile theme update failure:", err);
      }
    }
  };

  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 4,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <CardContent sx={{ p: 3.5, "&:last-child": { pb: 3.5 } }}>

        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ color: "text.primary", mb: 1 }}
        >
          Appearance
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: "text.secondary", mb: 3, fontWeight: 500 }}
        >
          Customize the appearance of Deadline Guardian Pro.
        </Typography>

        <Divider sx={{ mb: 3, borderColor: "divider" }} />

        <Typography
          variant="subtitle1"
          fontWeight={600}
          sx={{ color: "text.primary", mb: 2 }}
        >
          Theme
        </Typography>

        <RadioGroup
          value={selectedThemeOption} // ✅ Tracks selection cleanly across all 3 options
          onChange={handleThemeChange}
        >
          <Stack spacing={2} sx={{ flexDirection: "column" }}>

            <FormControlLabel
              value="light"
              control={<Radio color="primary" />}
              label={
                <Stack spacing={1.5} sx={{ flexDirection: "row", alignItems: "center" }}>
                  <LightModeIcon sx={{ color: "warning.main", fontSize: 20 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Light</Typography>
                </Stack>
              }
            />

            <FormControlLabel
              value="dark"
              control={<Radio color="primary" />}
              label={
                <Stack spacing={1.5} sx={{ flexDirection: "row", alignItems: "center" }}>
                  <DarkModeIcon sx={{ color: "primary.main", fontSize: 20 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Dark</Typography>
                </Stack>
              }
            />

            <FormControlLabel
              value="system"
              control={<Radio color="primary" />}
              label={
                <Stack spacing={1.5} sx={{ flexDirection: "row", alignItems: "center" }}>
                  <DesktopWindowsIcon sx={{ color: "success.main", fontSize: 20 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>System</Typography>
                </Stack>
              }
            />

          </Stack>
        </RadioGroup>

        <Divider sx={{ my: 3, borderColor: "divider" }} />

        <Stack
          spacing={2}
          sx={{ flexDirection: "row", alignItems: "center" }}
        >
          <Typography variant="body2" sx={{ fontWeight: 700, color: "text.primary" }}>
            Current Theme Option
          </Typography>

          <Chip
            color="primary"
            variant="outlined"
            label={selectedThemeOption.toUpperCase()}
            sx={{ fontWeight: 700, borderRadius: "8px", fontSize: "0.75rem", letterSpacing: "0.02em" }}
          />
        </Stack>

      </CardContent>
    </Card>
  );
};

export default AppearanceSettings;
