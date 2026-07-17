// src/components/ai/AIPanel.jsx
import {
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  Box,
  alpha,
} from "@mui/material";

import { useState } from "react";

import AIPrioritizer from "./AIPrioritizer";
import AIDailyPlanner from "./AIDailyPlanner";
import AIRiskDetector from "./AIRiskDetector";
import AIProductivityCoach from "./AIProductivityCoach";

// ✅ FIXED: Destructured analysis object props from parent page layer to feed the sub-tabs seamlessly
function AIPanel({ analysis }) {
  const [tab, setTab] = useState(0);

  return (
    <Card
      elevation={0} 
      sx={{ 
        mt: 4,
        borderRadius: "24px", 
        border: "1px solid",
        borderColor: "divider", 
        bgcolor: "background.paper", 
        boxShadow: (theme) => theme.palette.mode === "dark" 
          ? "0 10px 30px rgba(0,0,0,0.3)" 
          : "0 10px 30px rgba(15, 23, 42, 0.01)"
      }}
    >
      <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>

        {/* ================= SECTION HEADER ================= */}
        <Typography
          variant="subtitle1"
          fontWeight={800} 
          sx={{ color: "text.primary", mb: 3.5, letterSpacing: "-0.01em" }}
        >
          🤖 AI Assistant Insights
        </Typography>

        {/* ================= PREMIUM THEME-ADAPTIVE TABS ================= */}
        <Tabs
          value={tab}
          onChange={(e, value) => setTab(value)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            borderBottom: "1px solid",
            borderColor: "divider",
            minHeight: 44,
            "& .MuiTabs-indicator": {
              bgcolor: "primary.main", 
              height: 3,
              borderRadius: "3px 3px 0 0",
            },
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 700,
              fontSize: "0.9rem",
              color: "text.secondary",
              minHeight: 44,
              pb: 1.5,
              transition: "all 0.2s ease",
              "&:hover": {
                color: "text.primary",
                bgcolor: (theme) => alpha(theme.palette.text.primary, 0.01),
              },
              "&.Mui-selected": {
                color: "primary.main", 
              },
            },
          }}
        >
          <Tab label="Prioritizer" />
          <Tab label="Planner" />
          <Tab label="Risk Detector" />
          <Tab label="Coach" />
        </Tabs>

        {/* ================= MOUNTED INTERNAL DATA MATRIX ================= */}
        <Box sx={{ mt: 3.5 }}>
          {/* ✅ FIXED: Safely passes structural analytical data down to child components to eliminate undefined crashes */}
          {tab === 0 && <AIPrioritizer highestPriority={analysis?.highestPriority || []} />}
          {tab === 1 && <AIDailyPlanner planner={analysis?.planner || []} />}
          {tab === 2 && <AIRiskDetector risks={analysis?.risks || []} />}
          {tab === 3 && <AIProductivityCoach coach={analysis?.coach || null} />}
        </Box>

      </CardContent>
    </Card>
  );
}

export default AIPanel;
