// src/pages/Dashboard.jsx
import {
  Box,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import DashboardCards from "../components/dashboard/DashboardCards";
import ProgressSection from "../components/dashboard/ProgressSection";
import CountdownCard from "../components/dashboard/CountdownCard";
import UpcomingTasks from "../components/dashboard/UpcomingTasks";
import ActivityTimeline from "../components/dashboard/ActivityTimeline";

const Dashboard = () => {
  return (
    <Box
      sx={{
        maxWidth: "1600px",
        mx: "auto",
        px: {
          xs: 1,
          md: 2,
        },
      }}
    >
      {/* =========================================================
          1. DASHBOARD HEADER VIEW SECTOR
      ========================================================= */}
      <Box
        sx={{
          mb: 4,
          pl: 0.5,
        }}
      >
        <Typography
          variant="h4"
          fontWeight={800}
          sx={{
            color: "text.primary", 
            letterSpacing: "-0.025em",
            mb: 0.5,
            fontSize: {
              xs: "1.75rem",
              md: "2.25rem",
            },
          }}
        >
          Dashboard
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "text.secondary", 
            fontWeight: 500,
            fontSize: "0.95rem"
          }}
        >
          Welcome back! Here's an overview of your productivity and upcoming deadlines.
        </Typography>
      </Box>

      {/* =========================================================
          2. TOP STATISTICS ROWS BLOCK (FULL WIDTH CANVAS)
      ========================================================= */}
      <Box sx={{ mb: 4.5 }}>
        <DashboardCards />
      </Box>

      {/* =========================================================
          3. EXECUTIVE 3-COLUMN SIDE-BY-SIDE MATRIX
      ========================================================= */}
      {/* ✅ FIXED: Transferred the flex alignments to the theme-safe sx style wrapper block */}
      <Grid
        container
        spacing={3.5} 
        sx={{ alignItems: "stretch" }}
      >
        {/* COLUMN A: UPCOMING TASKS FEED REGION */}
        {/* ✅ FIXED: Removed the invalid boolean 'item' attribute prop to prevent console logging pollution */}
        <Grid
          xs={12}
          md={6}
          lg={4}
          sx={{
            display: "flex",
            flexDirection: "column"
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              "& > :first-of-type": { height: "100%" } 
            }}
          >
            <UpcomingTasks />
          </Box>
        </Grid>

        {/* COLUMN B: RECENT SYSTEM ACTIVITY TIMELINE REGION */}
        {/* ✅ FIXED: Removed the invalid boolean 'item' attribute prop to prevent console logging pollution */}
        <Grid
          xs={12}
          md={6}
          lg={4}
          sx={{
            display: "flex",
            flexDirection: "column"
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              "& > :first-of-type": { height: "100%" } 
            }}
          >
            <ActivityTimeline />
          </Box>
        </Grid>

        {/* COLUMN C: INTEGRATED PRODUCTIVITY SIDEBAR REGION */}
        {/* ✅ FIXED: Removed the invalid boolean 'item' attribute prop to prevent console logging pollution */}
        <Grid
          xs={12}
          md={12}
          lg={4}
          sx={{
            display: "flex",
            flexDirection: "column"
          }}
        >
          <Stack 
            spacing={3.5} 
            sx={{ 
              height: "100%",
              justifyContent: "space-between" 
            }}
          >
            {/* Urgent Deadline Countdown Card Banner */}
            <Box sx={{ flex: "0 0 auto" }}>
              <CountdownCard />
            </Box>

            {/* Circular Progress Gauge Wheel Module */}
            <Box sx={{ flex: "1 1 auto", display: "flex", flexDirection: "column", "& > :first-of-type": { height: "100%" } }}>
              <ProgressSection />
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
