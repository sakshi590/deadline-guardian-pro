// src/components/dashboard/ActivityTimeline.jsx
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  Chip,
  alpha, // ✅ FIXED: Imported alpha helper for theme-safe opacity transitions
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";

import { useTheme } from "@mui/material/styles";
import { useTasks } from "../../context/TaskContext";

const ActivityTimeline = () => {
  const { tasks } = useTasks();
  const theme = useTheme();

  const activities = tasks
    .slice(-6)
    .reverse()
    .map((task) => ({
      id: task.id,
      title: task.title,
      type: task.status === "Completed" ? "completed" : "created",
      time: task.updatedAt || task.createdAt || "Now",
    }));

  // ✅ FIXED: Completely re-engineered using alpha() so icons do not inherit parent opacity blurriness
  const getIcon = (type) => {
    const iconStyles = { fontSize: 20 };

    switch (type) {
      case "completed":
        return (
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: (theme) => alpha(theme.palette.success.main, 0.08), // Soft theme tint background context
              color: "success.main", // Clean 100% solid color text metrics visibility
              border: "1px solid",
              borderColor: (theme) => alpha(theme.palette.success.main, 0.2),
            }}
          >
            <CheckCircleIcon sx={iconStyles} />
          </Box>
        );

      case "updated":
        return (
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: (theme) => alpha(theme.palette.warning.main, 0.08),
              color: "warning.main",
              border: "1px solid",
              borderColor: (theme) => alpha(theme.palette.warning.main, 0.2),
            }}
          >
            <EditIcon sx={iconStyles} />
          </Box>
        );

      default:
        return (
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
              color: "primary.main",
              border: "1px solid",
              borderColor: (theme) => alpha(theme.palette.primary.main, 0.2),
            }}
          >
            <AddCircleIcon sx={iconStyles} />
          </Box>
        );
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: "24px", // Standardized to match your smooth rounded card family context
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <CardContent
        sx={{
          p: 3,
          "&:last-child": {
            pb: 3,
          },
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight={800} // Upgraded weight for premium brand harmony profile
          color="text.primary"
          sx={{ mb: 3.5, letterSpacing: "-0.01em" }}
        >
          Activity Timeline
        </Typography>

        {activities.length === 0 ? (
          <Typography sx={{ color: "text.secondary", fontWeight: 500, fontSize: "0.925rem" }}>
            No recent activity yet
          </Typography>
        ) : (
          <Stack spacing={2}>
            {activities.map((act) => (
              <Box
                key={act.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 2,
                  borderRadius: "16px",
                  bgcolor: "background.default", // Fluid light / dark container row fill context
                  border: "1px solid",
                  borderColor: "divider",
                  transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",

                  "&:hover": {
                    bgcolor: (theme) => alpha(theme.palette.text.primary, 0.02), // Safe dynamic hover state across both layouts
                    transform: "translateY(-1px)",
                    borderColor: (theme) => alpha(theme.palette.text.primary, 0.15),
                    boxShadow: (theme) => theme.palette.mode === "dark" ? "0 4px 20px rgba(0,0,0,0.4)" : "0 4px 20px rgba(15,23,42,0.03)",
                  },
                }}
              >
                {getIcon(act.type)}

                <Box
                  sx={{
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    fontWeight={700}
                    color="text.primary"
                    noWrap
                  >
                    {act.title}
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary", fontWeight: 600, display: "block", mt: 0.25 }}
                  >
                    {act.type === "completed"
                      ? "Task completed"
                      : "Task created"}
                  </Typography>
                </Box>

                {/* Adaptive Minimal Outline Chip Node */}
                <Chip
                  label={act.type === "completed" ? "Completed" : "Created"}
                  size="small"
                  variant="outlined"
                  color={act.type === "completed" ? "success" : "primary"}
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.7rem",
                    borderRadius: "20px",
                    textTransform: "uppercase",
                    letterSpacing: "0.02em",
                    borderWidth: "1px !important",
                    bgcolor: (theme) => act.type === "completed" ? alpha(theme.palette.success.main, 0.05) : alpha(theme.palette.primary.main, 0.05),
                    borderColor: (theme) => act.type === "completed" ? alpha(theme.palette.success.main, 0.2) : alpha(theme.palette.primary.main, 0.2),
                    "& .MuiChip-label": { px: 1 }
                  }}
                />
              </Box>
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityTimeline;
