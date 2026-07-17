// src/pages/Analytics.jsx
import { useMemo } from "react";
import { Box, Typography, Grid } from "@mui/material";

// Verified icon packages to prevent Vite internal compilation crashes
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded"; 
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";

import { useTasks } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext"; 

import {
  getCompletionRate,
  getCategoryStats,
  getPriorityStats,
  getWeeklyTrend,
} from "../utils/analytics";

import KPISection from "../components/analytics/KPISection";
import ProductivityChart from "../components/analytics/ProductivityChart";
import CategoryChart from "../components/analytics/CategoryChart";
import PriorityChart from "../components/analytics/PriorityChart";
import AIInsights from "../components/analytics/AIInsights";
import UpcomingDeadlines from "../components/analytics/UpcomingDeadlines";

const Analytics = () => {
  const { user } = useAuth();
  const { tasks = [] } = useTasks() || {};

  // ✅ STRICT ISOLATION GUARD: Filters data array down right before parsing charts
  const cleanUserTasks = useMemo(() => {
    if (!user || !user.uid) return [];
    return tasks.filter((t) => t && (!t.userId || t.userId === user.uid));
  }, [tasks, user]);

  const completionRate = getCompletionRate(cleanUserTasks) || 0;
  const categoryData = getCategoryStats(cleanUserTasks) || [];
  const priorityData = getPriorityStats(cleanUserTasks) || [];
  const weeklyData = getWeeklyTrend(cleanUserTasks) || [];

  const completed = cleanUserTasks.filter((task) => task.completed).length || 0;
  const pending = cleanUserTasks.filter((task) => !task.completed).length || 0;

  const upcomingTasks = [...cleanUserTasks]
    .filter((task) => !task.completed)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5);

  const insights = [
    `You have ${pending} pending tasks.`,
    `${completionRate}% of your tasks are completed.`,
    "Focus on High Priority tasks first.",
    `You currently have ${cleanUserTasks.length} total tasks.`,
  ];

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1600px", 
        mx: "auto",
        pb: 5,
        px: { xs: 2, sm: 3, md: 4 } 
      }}
    >
      {/* ================= Header Area ================= */}
      <Box sx={{ mb: 4, pl: 0.5 }}>
        <Typography
          variant="h4"
          fontWeight={800}
          sx={{ 
            color: "text.primary", 
            letterSpacing: "-0.025em",
            mb: 0.5,
            fontSize: { xs: "1.75rem", md: "2.25rem" }
          }}
        >
          Analytics Dashboard 📊
        </Typography>

        <Typography
          variant="body1"
          sx={{ color: "text.secondary", fontWeight: 500, fontSize: "0.95rem" }}
        >
          Monitor your productivity and task performance.
        </Typography>
      </Box>

      {/* ================= KPI Number Cards Grid ================= */}
      <Box sx={{ mb: 4.5 }}>
        <KPISection 
          tasks={cleanUserTasks.length}
          completed={completed}
          pending={pending}
          completionRate={completionRate}
        />
      </Box>

      {/* ================= Weekly Productivity Graph ================= */}
      <Box sx={{ mb: 4.5 }}>
        <ProductivityChart data={weeklyData} />
      </Box>

      {/* ================= Main Side-by-Side Analytics Columns Grid ================= */}
      {/* ✅ FIXED: Transferred layout flex alignment rules straight into modern sx block parameter arrays */}
      <Grid container spacing={4} sx={{ alignItems: "stretch" }}>
        
        {/* LEFT COLUMN METRICS FEEDS BAR */}
        {/* ✅ FIXED: Stripped out raw invalid item flag parameters */}
        <Grid xs={12} md={6} sx={{ display: "flex", flexDirection: "column" }}>
          <Stack spacing={4} sx={{ height: "100%", width: "100%" }}>
            <Box sx={{ flex: "1 1 auto", width: "100%", display: "flex", flexDirection: "column", "& > div": { height: "100%", width: "100%" } }}>
              <CategoryChart data={categoryData} />
            </Box>
            <Box sx={{ flex: "1 1 auto", width: "100%", display: "flex", flexDirection: "column", "& > div": { height: "100%", width: "100%" } }}>
              <AIInsights insights={insights} />
            </Box>
          </Stack>
        </Grid>

        {/* RIGHT COLUMN METRICS FEEDS BAR */}
        {/* ✅ FIXED: Stripped out raw invalid item flag parameters */}
        <Grid xs={12} md={6} sx={{ display: "flex", flexDirection: "column" }}>
          <Stack spacing={4} sx={{ height: "100%", width: "100%" }}>
            <Box sx={{ flex: "1 1 auto", width: "100%", display: "flex", flexDirection: "column", "& > div": { height: "100%", width: "100%" } }}>
              <PriorityChart data={priorityData} />
            </Box>
            <Box sx={{ flex: "1 1 auto", width: "100%", display: "flex", flexDirection: "column", "& > div": { height: "100%", width: "100%" } }}>
              <UpcomingDeadlines tasks={upcomingTasks} />
            </Box>
          </Stack>
        </Grid>

      </Grid>
    </Box>
  );
};

// Reusable micro vertical stacking container to guarantee compile safety
function Stack({ children, spacing, sx = {}, ...props }) {
  return (
    <Box 
      sx={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: spacing ? `${spacing * 8}px` : "16px",
        width: "100%",
        ...sx 
      }} 
      {...props}
    >
      {children}
    </Box>
  );
}

export default Analytics;
