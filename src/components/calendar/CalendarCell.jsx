// src/components/calendar/CalendarCell.jsx
import {
  Badge,
  Box,
  Paper,
  Typography,
  alpha, // ✅ FIXED: Imported alpha helper for crisp theme-aware boundary glows
} from "@mui/material";

import { useTasks } from "../../context/TaskContext";
import useCalendar from "./hooks/useCalendar";

function CalendarCell({ date }) {
  const { tasks } = useTasks();

  const {
    today,
    selectedDate,
    setSelectedDate,
  } = useCalendar();

  if (!date) {
    return (
      <Paper
        elevation={0}
        sx={{
          height: 90,
          bgcolor: "transparent",
          border: "none"
        }}
      />
    );
  }

  const dayTasks = tasks.filter((task) => {
    if (!task.dueDate) return false;
    return (
      new Date(task.dueDate).toDateString() === date.toDateString()
    );
  });

  const isToday = date.toDateString() === today.toDateString();
  const isSelected = date.toDateString() === selectedDate.toDateString();

  return (
    <Paper
      elevation={0} // Changed to flat SaaS card style family to match the dashboard architecture
      onClick={() => setSelectedDate(date)}
      sx={{
        cursor: "pointer",
        height: 100, // Expanded height slightly so badges and text lines never clip or overlap
        p: 1.5,
        borderRadius: "14px", // Standardised to match your premium rounded card layout family
        transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",

        // ✅ FIXED: High-contrast state routing ensures maximum visibility across dark/light mode flips
        bgcolor: isToday
          ? "primary.main" // Swapped from primary.light to full vivid brand purple
          : isSelected
          ? (theme) => alpha(theme.palette.primary.main, 0.04) // Soft low-alpha selected tint
          : "background.paper",

        border: "1px solid",
        borderColor: isSelected
          ? "primary.main"
          : isToday
          ? "transparent"
          : "divider", // Fluid layout border trace line

        boxShadow: (theme) => isSelected
          ? `0 8px 24px ${alpha(theme.palette.primary.main, 0.15)}`
          : "none",

        "&:hover": {
          transform: "translateY(-2px)", // Upgraded into a premium dashboard micro-lift
          borderColor: isSelected ? "primary.main" : (theme) => alpha(theme.palette.text.primary, 0.2),
          boxShadow: (theme) => isSelected 
            ? `0 12px 28px ${alpha(theme.palette.primary.main, 0.2)}` 
            : theme.palette.mode === "dark" ? "0 4px 20px rgba(0,0,0,0.3)" : "0 4px 16px rgba(15,23,42,0.02)",
        },
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {/* ✅ FIXED TYPOGRAPHY CONTRAST */}
        <Typography
          variant="body2"
          fontWeight={800}
          sx={{ 
            color: isToday ? "primary.contrastText" : "text.primary", // Forces clean white on purple today block
            fontSize: "0.95rem"
          }}
        >
          {date.getDate()}
        </Typography>

        {dayTasks.length > 0 && (
          <Box sx={{ pr: 0.5 }}>
            <Badge
              badgeContent={dayTasks.length}
              sx={{
                "& .MuiBadge-badge": {
                  bgcolor: isToday ? "primary.contrastText" : "primary.main",
                  color: isToday ? "primary.main" : "primary.contrastText",
                  fontWeight: 800,
                  fontSize: "0.65rem",
                  height: "18px",
                  minWidth: "18px"
                }
              }}
            />
          </Box>
        )}
      </Stack>

      {/* ================= EVENT INDICATOR DOTS MATRIX ================= */}
      <Box
        sx={{
          display: "flex",
          gap: 0.75,
          flexWrap: "wrap",
          mt: "auto",
          pt: 1
        }}
      >
        {dayTasks.slice(0, 4).map((task) => (
          <Box
            key={task.id}
            sx={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              // ✅ FIXED CHIPS: Uses error.light / success.light for high contrast vivid dots in dark layouts
              bgcolor: (theme) => {
                const isDark = theme.palette.mode === "dark";
                if (isToday) return "primary.contrastText"; // White dots over today's card block field
                switch (task.priority) {
                  case "High":
                    return isDark ? "error.light" : "error.main";
                  case "Medium":
                    return isDark ? "warning.light" : "warning.main";
                  case "Low":
                    return isDark ? "success.light" : "success.main";
                  default:
                    return isDark ? "primary.light" : "primary.main";
                }
              },
              border: (theme) => isToday ? "none" : `1px solid ${theme.palette.background.paper}`,
              boxShadow: isToday ? "none" : "0 1px 3px rgba(0,0,0,0.15)"
            }}
          />
        ))}
      </Box>
    </Paper>
  );
}

// Simple fallback context mapping stack to protect against compilation breaks
function Stack({ children, justifyContent, alignItems, direction }) {
  return (
    <div style={{ display: "flex", flexDirection: direction || "row", justifyContent: justifyContent || "flex-start", alignItems: alignItems || "stretch", width: "100%" }}>
      {children}
    </div>
  );
}

export default CalendarCell;
