// src/components/settings/NotificationSettings.jsx
import {
  Card,
  CardContent,
  Typography,
  FormControlLabel,
  Switch,
  Stack,
  Divider,
  Box,
  alpha,
} from "@mui/material";

import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import toast from "react-hot-toast";

// ✅ FIXED: Connected directly to your central user profile authentication engine
import { useAuth } from "../../context/AuthContext";

const NotificationSettings = () => {
  const { user, updateProfile } = useAuth();

  // ✅ USER ISOLATION RECOVERY: Safely fallback to true/false templates if user record is hydrating
  const settings = user?.settings || {
    notifications: true,
    emailNotifications: true,
    browserNotifications: false,
    reminderNotifications: true,
  };

  // ✅ FIXED: Hardened cloud sync handler. Instantly commits switches changes directly to Firebase
  const handleToggleChange = async (settingKey, currentValue) => {
    if (!user) return;

    try {
      // Toggle value locally in the payload dictionary context maps
      const nextValue = !currentValue;
      
      toast.loading("Saving your notification settings...", { id: "notif-sync" });

      await updateProfile({
        settings: {
          ...user?.settings,
          [settingKey]: nextValue,
        },
      });

      toast.success("Preferences updated securely! 💾", { id: "notif-sync" });
    } catch (error) {
      console.error("Firestore settings update crash:", error);
      toast.error("Failed to commit configurations to your profile.", { id: "notif-sync" });
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "24px", // Standardised to match your precise 24px curve family blocks
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        boxShadow: (theme) => theme.palette.mode === "dark" 
          ? "0 10px 30px rgba(0,0,0,0.3)" 
          : "0 10px 30px rgba(15, 23, 42, 0.01)"
      }}
    >
      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mb: 1.5,
          }}
        >
          <NotificationsActiveIcon color="primary" sx={{ fontSize: 24 }} />

          <Typography
            variant="h5"
            fontWeight={800}
            sx={{ color: "text.primary", letterSpacing: "-0.01em" }}
          >
            Notification Settings
          </Typography>
        </Box>

        <Typography
          variant="body2"
          sx={{ color: "text.secondary", mb: 4, fontWeight: 500, pl: 5 }}
        >
          Control how Deadline Guardian notifies you about tasks, reminders and updates.
        </Typography>

        <Divider sx={{ mb: 3, borderColor: "divider" }} />

        {/* Form Controls Stack Canvas */}
        <Stack spacing={2} divider={<Divider sx={{ borderColor: "divider" }} />}>
          <FormControlLabel
            control={
              <Switch
                checked={!!settings.notifications}
                onChange={() => handleToggleChange("notifications", !!settings.notifications)}
                color="primary"
              />
            }
            label="Enable Master Alerts"
            sx={{ "& .MuiFormControlLabel-label": { fontWeight: 600, fontSize: "0.9rem", color: "text.primary" } }}
          />

          <FormControlLabel
            control={
              <Switch
                checked={!!settings.emailNotifications}
                onChange={() => handleToggleChange("emailNotifications", !!settings.emailNotifications)}
                color="primary"
              />
            }
            label="Critical Deadlines Email Warnings"
            sx={{ "& .MuiFormControlLabel-label": { fontWeight: 600, fontSize: "0.9rem", color: "text.primary" } }}
          />

          <FormControlLabel
            control={
              <Switch
                checked={!!settings.browserNotifications}
                onChange={() => handleToggleChange("browserNotifications", !!settings.browserNotifications)}
                color="primary"
              />
            }
            label="Live Browser Push Notifications"
            sx={{ "& .MuiFormControlLabel-label": { fontWeight: 600, fontSize: "0.9rem", color: "text.primary" } }}
          />

          <FormControlLabel
            control={
              <Switch
                checked={!!settings.reminderNotifications}
                onChange={() => handleToggleChange("reminderNotifications", !!settings.reminderNotifications)}
                color="primary"
              />
            }
            label="Automated Morning Task Reminders"
            sx={{ "& .MuiFormControlLabel-label": { fontWeight: 600, fontSize: "0.9rem", color: "text.primary" } }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
