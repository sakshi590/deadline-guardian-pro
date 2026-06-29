// src/pages/AIAssistant.jsx

import { Box, Grid } from "@mui/material";

import { useTasks } from "../context/TaskContext";

import { askGemini } from "../services/gemini";

import { buildTaskAnalysisPrompt } from "../utils/aiPrompt";

import AIHeader from "../components/ai/AIHeader";
import AIChat from "../components/ai/AIChat";
import AIActionCard from "../components/ai/AIActionCard";
import AIRecommendationCard from "../components/ai/AIRecommendationCard";

import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";

const actions = [
  {
    id: "analyze",
    title: "Analyze Tasks",
    description: "Prioritize all tasks using AI",
    icon: <PsychologyRoundedIcon fontSize="large" />,
    color: "#4F46E5",
  },
  {
    id: "planner",
    title: "Daily Planner",
    description: "Generate today's schedule",
    icon: <CalendarMonthRoundedIcon fontSize="large" />,
    color: "#22C55E",
  },
  {
    id: "risk",
    title: "Risk Detector",
    description: "Predict overdue tasks",
    icon: <WarningAmberRoundedIcon fontSize="large" />,
    color: "#EF4444",
  },
  {
    id: "coach",
    title: "Productivity Coach",
    description: "Analyze work habits",
    icon: <TrendingUpRoundedIcon fontSize="large" />,
    color: "#F59E0B",
  },
];

const suggestions = [
  "Finish high priority tasks before noon.",
  "You have tasks due soon.",
  "Complete high priority work first.",
];

const AIAssistant = () => {
  const { tasks } = useTasks();

  const handleAIAction = async (actionId) => {
    try {
      if (actionId === "analyze") {
        const prompt = buildTaskAnalysisPrompt(tasks);

        const result = await askGemini(prompt);

        alert(result);
      }
    } catch (error) {
      console.error(error);
      alert("AI request failed.");
    }
  };

  return (
    <Box>

      <AIHeader />

      <Grid container spacing={3} mt={1}>

        <Grid item xs={12} lg={8}>
          <AIChat />
        </Grid>

        <Grid item xs={12} lg={4}>

          <Grid container spacing={2}>

            {actions.map((action) => (
              <Grid
                item
                xs={12}
                key={action.id}
              >
                <AIActionCard
                  action={action}
                  onClick={handleAIAction}
                />
              </Grid>
            ))}

            <Grid item xs={12}>
              <AIRecommendationCard
                suggestions={suggestions}
              />
            </Grid>

          </Grid>

        </Grid>

      </Grid>

    </Box>
  );
};

export default AIAssistant;