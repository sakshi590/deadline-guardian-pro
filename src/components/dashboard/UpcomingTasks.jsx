// src/components/dashboard/UpcomingTasks.jsx
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  Chip,
  alpha, 
} from "@mui/material";

import { useTasks } from "../../context/TaskContext";

const UpcomingTasks = () => {
  const { tasks = [] } = useTasks() || {}; // Guard against initial empty database loads safely

  const today = new Date().toISOString().split("T")[0];

  const upcoming = tasks
    .filter((t) => t.dueDate && t.status !== "Completed")
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5);

  const isToday = (date) => date === today;

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "24px", 
        border: "1px solid",
        borderColor: "divider", 
        bgcolor: "background.paper", 
        height: "100%",
        boxShadow: (theme) => theme.palette.mode === "dark" ? "0 10px 30px rgba(0,0,0,0.3)" : "0 10px 30px rgba(0, 0, 0, 0.01)",
      }}
    >
      <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
        <Typography variant="subtitle1" fontWeight={800} sx={{ color: "text.primary", mb: 3.5, letterSpacing: "-0.01em" }}>
          Upcoming Tasks
        </Typography>

        {upcoming.length === 0 ? (
          <Typography sx={{ color: "text.secondary", fontWeight: 500, fontSize: "0.925rem" }}>
            No upcoming tasks 🎉
          </Typography>
        ) : (
          <Stack spacing={2}>
            {upcoming.map((task) => (
              <Box
                key={task.id}
                sx={{
                  p: 2,
                  borderRadius: "16px",
                  bgcolor: "background.default", 
                  border: "1px solid",
                  borderColor: "divider",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-1px)",
                    borderColor: (theme) => alpha(theme.palette.text.primary, 0.2),
                    boxShadow: (theme) => theme.palette.mode === "dark" ? "0 4px 12px rgba(0,0,0,0.4)" : "0 4px 12px rgba(15, 23, 42, 0.02)",
                  },
                }}
              >
                {/* Title + Priority Row */}
                {/* ✅ FIXED: Transferred the flex properties to the theme-safe sx style wrapper block */}
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="subtitle2" fontWeight={700} sx={{ color: "text.primary", lineHeight: 1.4 }}>
                    {task.title}
                  </Typography>

                  <Chip
                    label={task.priority}
                    size="small"
                    sx={{
                      borderRadius: "20px",
                      fontWeight: 700,
                      fontSize: "0.7rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.02em",
                      px: 0.5,
                      bgcolor: (theme) =>
                        task.priority === "High"
                          ? alpha(theme.palette.error.main, 0.08)
                          : task.priority === "Medium"
                          ? alpha(theme.palette.warning.main, 0.08)
                          : alpha(theme.palette.success.main, 0.08),
                      color:
                        task.priority === "High"
                          ? "error.main"
                          : task.priority === "Medium"
                          ? "warning.main"
                          : "success.main",
                      border: "1px solid",
                      borderColor: (theme) =>
                        task.priority === "High"
                          ? alpha(theme.palette.error.main, 0.2)
                          : task.priority === "Medium"
                          ? alpha(theme.palette.warning.main, 0.2)
                          : alpha(theme.palette.success.main, 0.2),
                      "& .MuiChip-label": { px: 1 }
                    }}
                  />
                </Stack>

                {/* ================= ADAPTIVE DATE FIELD ================= */}
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    fontWeight: 600,
                    mt: 1.5,
                    color: isToday(task.dueDate) ? "error.main" : "text.secondary", 
                  }}
                >
                  {isToday(task.dueDate) ? "⚠️ Due Today" : `Due: ${task.dueDate}`}
                </Typography>
              </Box>
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingTasks;
