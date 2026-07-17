// src/components/dashboard/CountdownCard.jsx
import { useMemo } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
  LinearProgress,
  alpha,
} from "@mui/material";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import { useTasks } from "../../context/TaskContext";

const CountdownCard = () => {
  const { tasks = [] } = useTasks() || {}; // Guard against initial empty database loads safely

  const nextTask = useMemo(() => {
    const pending = [...tasks]
      .filter((task) => !task.completed && task.dueDate)
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    return pending[0];
  }, [tasks]);

  const fallbackStyles = {
    borderRadius: "24px",
    height: "100%",
    border: "1px solid",
    borderColor: "divider",
    bgcolor: "background.paper",
    boxShadow: (theme) => theme.palette.mode === "dark" ? "0 10px 30px rgba(0,0,0,0.3)" : "0 10px 30px rgba(0, 0, 0, 0.01)",
  };

  if (!nextTask) {
    return (
      <Card sx={fallbackStyles}>
        <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
          <Typography variant="subtitle1" fontWeight={800} sx={{ color: "text.primary", mb: 3, letterSpacing: "-0.01em" }}>
            Upcoming Deadline
          </Typography>

          {/* ✅ FIXED: Transformed custom align="center" token to standard theme-safe sx layout rule */}
          <Typography sx={{ color: "text.secondary", fontWeight: 600, textAlign: "center", mt: 6, fontSize: "0.95rem" }}>
            🎉 No upcoming deadlines
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const now = new Date();
  const due = new Date(nextTask.dueDate);
  const diff = due - now;
  const overdue = diff < 0;

  const days = Math.abs(Math.floor(diff / (1000 * 60 * 60 * 24)));
  const hours = Math.abs(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));

  const progress = overdue ? 100 : Math.max(5, 100 - days * 10);

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "24px", 
        height: "100%",
        background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`, 
        color: "primary.contrastText",
        boxShadow: (theme) => `0 12px 32px ${alpha(theme.palette.primary.main, 0.22)}`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* ✅ FIXED: Handled text stack layouts cleanly via material component properties */}
      <CardContent sx={{ p: 3, "&:last-child": { pb: 3 }, display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
        <Box>
          {/* ================= HEADER SECTOR ================= */}
          <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="subtitle1" fontWeight={800} sx={{ color: "primary.contrastText", letterSpacing: "-0.01em" }}>
              Next Deadline
            </Typography>
            <AccessTimeIcon sx={{ color: "primary.contrastText", fontSize: 22, opacity: 0.9 }} />
          </Stack>

          {/* ================= CONTENT AREA ================= */}
          <Box sx={{ mt: 3.5 }}>
            <Typography variant="h5" fontWeight={800} sx={{ color: "primary.contrastText", letterSpacing: "-0.01em", mb: 0.5, lineHeight: 1.3 }}>
              {nextTask.title}
            </Typography>
            
            <Typography variant="body2" sx={{ opacity: 0.85, fontWeight: 600, textTransform: "capitalize", color: "primary.contrastText" }}>
              {nextTask.category || "Study"}
            </Typography>
          </Box>
        </Box>

        <Box>
          {/* ================= PROGRESS REGION ================= */}
          <Box sx={{ mt: 4 }}>
            <Typography 
              variant="caption" 
              sx={{ 
                display: "block", 
                color: (theme) => overdue ? theme.palette.error.light : alpha(theme.palette.primary.contrastText, 0.85), 
                fontWeight: 700, 
                letterSpacing: "0.02em", 
                textTransform: "uppercase" 
              }}
            >
              {overdue ? "Task is overdue" : `${days} Days ${hours} Hours Left`}
            </Typography>

            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                mt: 1.5,
                height: 6, 
                borderRadius: "10px",
                bgcolor: "rgba(255, 255, 255, 0.2)",
                "& .MuiLinearProgress-bar": {
                  bgcolor: "primary.contrastText",
                  borderRadius: "10px",
                }
              }}
            />
          </Box>

          {/* ================= ACTION CHIPS MATRIX ================= */}
          {/* ✅ FIXED: Transferred the flex parameters to the theme-safe sx style wrapper block */}
          <Stack direction="row" spacing={1} sx={{ mt: 3.5, flexWrap: "wrap", gap: 1 }}>
            
            <Chip
              icon={<EventIcon sx={{ fontSize: "16px !important", color: "primary.contrastText !important" }} />}
              label={new Date(nextTask.dueDate).toLocaleDateString()}
              sx={{
                borderRadius: "24px",
                fontWeight: 700,
                fontSize: "0.75rem",
                bgcolor: "rgba(255, 255, 255, 0.15)",
                color: "primary.contrastText", 
                border: "1px solid rgba(255, 255, 255, 0.2)",
                "& .MuiChip-label": { px: 1.2 }
              }}
            />

            <Chip
              icon={overdue ? <WarningAmberIcon sx={{ fontSize: "16px !important", color: "error.contrastText !important" }} /> : undefined}
              label={overdue ? "Overdue" : nextTask.priority}
              sx={{
                borderRadius: "24px",
                fontWeight: 700,
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.02em",
                bgcolor: () => overdue ? "error.main" : "rgba(255, 255, 255, 0.15)",
                color: () => overdue ? "error.contrastText" : "primary.contrastText",
                border: () => overdue ? "1px solid transparent" : "1px solid rgba(255, 255, 255, 0.2)",
                "& .MuiChip-label": { px: 1.2 }
              }}
            />

          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CountdownCard;
