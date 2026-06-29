// src/pages/Dashboard.jsx

import { Box, Grid, Typography } from "@mui/material";

import DashboardCards from "../components/dashboard/DashboardCards";
import ProgressSection from "../components/dashboard/ProgressSection";
import CountdownCard from "../components/dashboard/CountdownCard";
import UpcomingTasks from "../components/dashboard/UpcomingTasks";
import ActivityTimeline from "../components/dashboard/ActivityTimeline";

const Dashboard = () => {
  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight={700}
        gutterBottom
      >
        Dashboard
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Welcome back! Here's an overview of your productivity and upcoming
        deadlines.
      </Typography>

      <Grid container spacing={3}>
        {/* Top Statistics */}
        <Grid item xs={12}>
          <DashboardCards />
        </Grid>

        {/* Progress */}
        <Grid item xs={12} md={8}>
          <ProgressSection />
        </Grid>

        {/* Countdown */}
        <Grid item xs={12} md={4}>
          <CountdownCard />
        </Grid>

        {/* Upcoming Tasks */}
        <Grid item xs={12} md={7}>
          <UpcomingTasks />
        </Grid>

        {/* Activity */}
        <Grid item xs={12} md={5}>
          <ActivityTimeline />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;