// src/pages/AIAssistant.jsx

import { useState } from "react"; // Added to manage global loading triggers
import { Box, Grid } from "@mui/material";

import { useTasks } from "../context/TaskContext";
import { useAI } from "../context/AIContext";

import { askGemini } from "../services/gemini";

import {
  buildTaskAnalysisPrompt,
} from "../utils/aiPrompt";

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
  "Complete high priority tasks first.",
  "Review tomorrow's deadlines before finishing today.",
  "Keep your completion rate above 80%.",
];

const AIAssistant = () => {
  const { tasks } = useTasks();
  const [isAiLoading, setIsAiLoading] = useState(false); // Track active background tasks

  const {
    addUserMessage,
    addAIMessage,
  } = useAI();

  const handleAIAction = async (actionId) => {
    if (isAiLoading) return; // Prevent double-triggering while a query is in-flight

    try {
      let prompt = "";
      let userMessage = "";

      switch (actionId) {
        case "analyze":
          userMessage = "Analyze my tasks";
          prompt = buildTaskAnalysisPrompt(tasks);
          break;

        case "planner":
          userMessage = "Generate my daily planner";
          prompt = `
You are Deadline Guardian AI.

Create a practical timetable for today.

Tasks:

${JSON.stringify(tasks, null, 2)}

Include:

Morning

Afternoon

Evening

Priority order

Estimated hours.
`;
          break;

        case "risk":
          userMessage = "Check deadline risks";
          prompt = `
You are Deadline Guardian AI.

Analyze these tasks.

${JSON.stringify(tasks, null, 2)}

Identify:

Tasks at risk

Tasks likely to become overdue

Suggestions to avoid delays.
`;
          break;

        case "coach":
          userMessage = "Analyze my productivity";
          prompt = `
You are Deadline Guardian AI.

Analyze these tasks.

${JSON.stringify(tasks, null, 2)}

Provide:

Productivity score

Strengths

Weaknesses

Recommendations

Motivation.
`;
          break;

        default:
          return;
      }

      setIsAiLoading(true); // Engages visual pending indicators across subcomponents
      addUserMessage(userMessage);

      const reply = await askGemini(prompt);
      addAIMessage(reply);

    } catch (error) {
      console.error(error);
      addAIMessage(
        "❌ Unable to generate AI response. Please try again."
      );
    } finally {
      setIsAiLoading(false); // Resource teardown ensures UI unlocks on errors/successes
    }
  };

  return (
    <Box>
      <AIHeader />

      <Grid
        container
        spacing={3}
        mt={1}
      >
        <Grid
          item
          xs={12}
          lg={8}
        >
          {/* Receives state to display an animated typing indicator or typing bubble */}
          <AIChat isLoading={isAiLoading} />
        </Grid>

        <Grid
          item
          xs={12}
          lg={4}
        >
          <Grid
            container
            spacing={2}
          >
            {actions.map((action) => (
              <Grid
                item
                xs={12}
                key={action.id}
              >
                {/* Receives state to render loading spinners or grey out action items */}
                <AIActionCard
                  action={action}
                  onClick={handleAIAction}
                  disabled={isAiLoading}
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
