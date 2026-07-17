// src/components/analytics/UpcomingDeadlines.jsx
import {
  Paper,
  Typography,
  Stack,
  Avatar,
  Chip,
  Divider,
  Box,
  alpha, 
} from "@mui/material";

import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";

const UpcomingDeadlines = ({ tasks = [] }) => {
  return (
    <Paper
      elevation={0} 
      sx={{
        p: 3.5,
        borderRadius: "24px", 
        border: "1px solid",
        borderColor: "divider", 
        background: (theme) => theme.palette.mode === "dark"
          ? `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.default, 0.4)} 100%)`
          : `linear-gradient(180deg, #FFFFFF 0%, ${theme.palette.background.default} 100%)`,
        height: "100%",
        boxShadow: (theme) => theme.palette.mode === "dark" ? "0 10px 30px rgba(0,0,0,0.3)" : "0 10px 30px rgba(15,23,42,0.01)"
      }}
    >
      {/* ================= HEADER SECTOR ================= */}
      {/* ✅ FIXED: Transferred the stack flex variables into a standard theme-safe sx style wrapper block */}
      <Stack
        direction="row"
        spacing={2}
        sx={{
          alignItems: "center",
          mb: 3
        }}
      >
        <Avatar
          sx={{
            background: (theme) => `linear-gradient(135deg, ${theme.palette.error.light} 0%, ${theme.palette.error.main} 100%)`,
            color: "error.contrastText",
            width: 44,
            height: 44,
            borderRadius: "12px",
            boxShadow: (theme) => `0 4px 14px ${alpha(theme.palette.error.main, 0.25)}`
          }}
        >
          <CalendarMonthRoundedIcon sx={{ fontSize: 20 }} />
        </Avatar>

        <Typography
          variant="subtitle1"
          fontWeight={800} 
          sx={{ color: "text.primary", letterSpacing: "-0.01em" }} 
        >
          Upcoming Deadlines
        </Typography>
      </Stack>

      <Divider sx={{ mb: 3.5, borderColor: "divider" }} />

      {/* ================= DEADLINES LIST FEEDS ================= */}
      <Stack spacing={2}>
        {tasks.length === 0 && (
          <Typography sx={{ color: "text.secondary", fontWeight: 500, fontSize: "0.925rem", py: 4, textAlign: "center" }}>
            No upcoming deadlines 🎉
          </Typography>
        )}

        {tasks.map((task) => {
          const chipColorKey = {
            High: "error",
            Medium: "warning",
            Low: "success",
          }[task.priority] || "primary";

          return (
            <Paper
              key={task.id}
              elevation={0}
              sx={{
                p: 2,
                borderRadius: "14px",
                bgcolor: "background.default", 
                border: "1px solid",
                borderColor: "divider",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  borderColor: (theme) => alpha(theme.palette.text.primary, 0.15),
                  boxShadow: (theme) => theme.palette.mode === "dark" 
                    ? "0 4px 12px rgba(0,0,0,0.4)" 
                    : "0 4px 12px rgba(15, 23, 42, 0.02)",
                },
              }}
            >
              {/* ✅ FIXED: Transferred the stack flex variables into a standard theme-safe sx style wrapper block */}
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                {/* ✅ FIXED: Managed this child stack block explicitly via safe layout options */}
                <Stack spacing={0.5} sx={{ minWidth: 0 }}>
                  <Typography variant="subtitle2" fontWeight={700} sx={{ color: "text.primary", lineHeight: 1.4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {task.title}
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary", fontWeight: 600, display: "block" }} 
                  >
                    Due: {task.dueDate}
                  </Typography>
                </Stack>

                <Chip
                  label={task.priority}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderRadius: "24px",
                    fontWeight: 700,
                    fontSize: "0.7rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.02em",
                    px: 0.5,
                    bgcolor: (theme) => alpha(theme.palette[chipColorKey].main, 0.08),
                    color: `${chipColorKey}.main`,
                    border: "1px solid",
                    borderColor: (theme) => alpha(theme.palette[chipColorKey].main, 0.2),
                    "& .MuiChip-label": { px: 1 }
                  }}
                />
              </Stack>
            </Paper>
          );
        })}
      </Stack>
    </Paper>
  );
};

export default UpcomingDeadlines;
