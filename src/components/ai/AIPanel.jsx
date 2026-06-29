import {
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  Box,
} from "@mui/material";

import { useState } from "react";

import AIPrioritizer from "./AIPrioritizer";
import AIDailyPlanner from "./AIDailyPlanner";
import AIRiskDetector from "./AIRiskDetector";
import AIProductivityCoach from "./AIProductivityCoach";

function AIPanel() {
  const [tab, setTab] = useState(0);

  return (
    <Card
      elevation={3}
      sx={{ mt: 4 }}
    >
      <CardContent>

        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ mb: 3 }}
        >
          🤖 AI Assistant
        </Typography>

        <Tabs
          value={tab}
          onChange={(e, value) => setTab(value)}
          variant="scrollable"
        >
          <Tab label="Prioritizer" />
          <Tab label="Planner" />
          <Tab label="Risk Detector" />
          <Tab label="Coach" />
        </Tabs>

        <Box sx={{ mt: 3 }}>

          {tab === 0 && <AIPrioritizer />}

          {tab === 1 && <AIDailyPlanner />}

          {tab === 2 && <AIRiskDetector />}

          {tab === 3 && <AIProductivityCoach />}

        </Box>

      </CardContent>
    </Card>
  );
}

export default AIPanel;