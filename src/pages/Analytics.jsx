// src/pages/Analytics.jsx

import { Box, Typography, Grid } from "@mui/material";

import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import TaskRoundedIcon from "@mui/icons-material/TaskRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";

import { useTasks } from "../context/TaskContext";

import {
  getCompletionRate,
  getCategoryStats,
  getPriorityStats,
  getWeeklyTrend,
} from "../utils/analytics";

import StatCard from "../components/analytics/StatCard";
import ProductivityChart from "../components/analytics/ProductivityChart";
import CategoryChart from "../components/analytics/CategoryChart";
import PriorityChart from "../components/analytics/PriorityChart";
import AIInsights from "../components/analytics/AIInsights";
import UpcomingDeadlines from "../components/analytics/UpcomingDeadlines";

const Analytics = () => {
  const { tasks } = useTasks();

  const completionRate = getCompletionRate(tasks);
  const categoryData = getCategoryStats(tasks);
  const priorityData = getPriorityStats(tasks);
  const weeklyData = getWeeklyTrend(tasks);

  const completed = tasks.filter(
    (task) => task.completed
  ).length;

  const pending = tasks.filter(
    (task) => !task.completed
  ).length;

  const upcomingTasks = [...tasks]
    .filter((task) => !task.completed)
    .sort(
      (a, b) =>
        new Date(a.dueDate) -
        new Date(b.dueDate)
    )
    .slice(0, 5);

  const insights = [
    `You have ${pending} pending tasks.`,
    `${completionRate}% of your tasks are completed.`,
    "Focus on High Priority tasks first.",
    `You currently have ${tasks.length} total tasks.`,
  ];

  return (
    <Box
      sx={{
        width: "100%",
        pb: 5,
      }}
    >
      {/* Header */}

      <Typography
        variant="h4"
        fontWeight={800}
        mb={1}
      >
        Analytics Dashboard 📊
      </Typography>

      <Typography
        color="text.secondary"
        mb={4}
      >
        Monitor your productivity and task performance.
      </Typography>

      {/* KPI Cards */}

      <Grid
        container
        spacing={3}
        mb={4}
      >
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Total Tasks"
            value={tasks.length}
            subtitle="All Tasks"
            icon={
              <TaskRoundedIcon fontSize="large" />
            }
            color="#4F46E5"
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Completed"
            value={completed}
            subtitle="Finished Tasks"
            icon={
              <AssignmentTurnedInRoundedIcon fontSize="large" />
            }
            color="#22C55E"
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Pending"
            value={pending}
            subtitle="Remaining Tasks"
            icon={
              <PendingActionsRoundedIcon fontSize="large" />
            }
            color="#F59E0B"
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Completion"
            value={`${completionRate}%`}
            subtitle="Overall Progress"
            icon={
              <TrendingUpRoundedIcon fontSize="large" />
            }
            color="#EF4444"
          />
        </Grid>
      </Grid>

      {/* Weekly Productivity */}

      <Box mb={4}>
        <ProductivityChart
          data={weeklyData}
        />
      </Box>

      {/* Category + Priority */}

      <Grid
        container
        spacing={3}
        mb={4}
      >
        <Grid item xs={12} lg={6}>
          <CategoryChart
            data={categoryData}
          />
        </Grid>

        <Grid item xs={12} lg={6}>
          <PriorityChart
            data={priorityData}
          />
        </Grid>
      </Grid>

      {/* AI + Upcoming */}

      <Grid
        container
        spacing={3}
      >
        <Grid item xs={12} md={6}>
          <AIInsights
            insights={insights}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <UpcomingDeadlines
            tasks={upcomingTasks}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;