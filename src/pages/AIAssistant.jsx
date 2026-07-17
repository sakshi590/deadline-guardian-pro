// src/pages/AIAssistant.jsx (Part 1 of 2)
import { useState, useEffect, useMemo, useRef } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

import { useTasks } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext"; 
import { useAI } from "../context/AIContext";
import { useVoiceAssistant } from "../hooks/useVoiceAssistant";
import { askGemini } from "../services/gemini";

import {
  buildTaskAnalysisPrompt,
  buildPlannerPrompt,
  buildRiskPrompt,
  buildCoachPrompt,
} from "../utils/aiPrompt";

import { parseAIResponse } from "../utils/parseAIResponse";

import AIHeader from "../components/ai/AIHeader";
import AIChat from "../components/ai/AIChat";
import AIActionCard from "../components/ai/AIActionCard";
import AIRecommendationCard from "../components/ai/AIRecommendationCard";

import AIScoreCard from "../components/ai/AIScoreCard";
import AIDailyPlanner from "../components/ai/AIDailyPlanner";
import AIRiskDetector from "../components/ai/AIRiskDetector";
import AIProductivityCoach from "../components/ai/AIProductivityCoach";

import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";

const actions = [
  {
    id: "analyze",
    title: "Analyze Tasks",
    description: "Prioritize all tasks using AI",
    icon: <PsychologyRoundedIcon sx={{ fontSize: 24 }} />,
    colorKey: "primary.main", 
  },
  {
    id: "planner",
    title: "Daily Planner",
    description: "Generate today's schedule",
    icon: <CalendarMonthRoundedIcon sx={{ fontSize: 24 }} />,
    colorKey: "success.main", 
  },
  {
    id: "risk",
    title: "Risk Detector",
    description: "Predict overdue tasks",
    icon: <WarningAmberRoundedIcon sx={{ fontSize: 24 }} />,
    colorKey: "error.main", 
  },
  {
    id: "coach",
    title: "Productivity Coach",
    description: "Analyze work habits",
    icon: <TrendingUpRoundedIcon sx={{ fontSize: 24 }} />,
    colorKey: "warning.main", 
  },
];

const defaultAnalysis = {
  summary: {
    productivityScore: "--",
    updatedTasks: "--",
    riskyTasks: "--",
    workload: "--",
  },
  highestPriority: [],
  planner: [],
  risks: [],
  recommendations: [],
  coach: null,
};

const voiceStatus = {
  idle: "🟢 Ready",
  listening: "🎤 Listening...",
  thinking: "🧠 AI is thinking...",
  speaking: "🔊 AI is speaking...",
};

const AIAssistant = () => {
  // ✅ DEFENSIVE CONTEXT SHIELD: Protects your app from crashing if an independent hook returns empty
  const { user } = useAuth() || {};
  const { tasks = [] } = useTasks() || {};
  
  const { 
    addUserMessage = () => {}, 
    addAIMessage = () => {} 
  } = useAI() || {};
  
  const voiceAssistantData = useVoiceAssistant() || {};
  const voiceState = voiceAssistantData.voiceState || "idle";

  const [activeAction, setActiveAction] = useState(null);
  const [analysis, setAnalysis] = useState(defaultAnalysis);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [sessionStats, setSessionStats] = useState({ analyses: 0 });

  // ✅ REF BARRIER SHIELD: Prevents re-render cascades from launching duplicate welcome triggers
  const welcomeFired = useRef(false);

  const secureUserTasks = useMemo(() => {
    if (!user || !user.uid) return [];
    return tasks.filter((t) => t && (!t.userId || t.userId === user.uid));
  }, [tasks, user]);

  useEffect(() => {
    if (welcomeFired.current) return;
    welcomeFired.current = true;
    
    addAIMessage(`
👋 Welcome to Deadline Guardian AI!

I'm your intelligent productivity assistant.

I can help you:
✅ Analyze Tasks
📅 Generate Daily Planner
⚠️ Detect Deadline Risks
📈 Improve Productivity
🎤 Talk with you using Voice AI
`);
  }, [addAIMessage]);

  const handleAIAction = async (actionId) => {
    if (activeAction) return;

    if (secureUserTasks.length === 0) {
      addAIMessage("⚠️ No tasks found. Please add some tasks before requesting AI analysis.");
      return;
    }

    try {
      setActiveAction(actionId);
      let prompt = "";
      let userMessage = "";

      switch (actionId) {
        case "analyze":
          userMessage = "Analyze all my tasks.";
          prompt = buildTaskAnalysisPrompt(secureUserTasks);
          break;
        case "planner":
          userMessage = "Generate my daily planner.";
          prompt = buildPlannerPrompt(secureUserTasks);
          break;
        case "risk":
          userMessage = "Analyze deadline risks.";
          prompt = buildRiskPrompt(secureUserTasks);
          break;
        case "coach":
          userMessage = "Analyze my productivity.";
          prompt = buildCoachPrompt(secureUserTasks);
          break;
        default:
          return;
      }

      addUserMessage(userMessage);
      const response = await askGemini(prompt);
      const parsed = parseAIResponse(response);

      setAnalysis((previous) => {
        const previousSummary = previous.summary || defaultAnalysis.summary;
        const newSummary = parsed.summary || {};

        return {
          ...previous,
          ...parsed,
          summary: {
            ...previousSummary,
            ...newSummary,
            productivityScore: newSummary.productivityScore || previousSummary.productivityScore,
            updatedTasks: newSummary.updatedTasks || previousSummary.updatedTasks,
            riskyTasks: newSummary.riskyTasks || previousSummary.riskyTasks,
            workload: newSummary.workload || previousSummary.workload,
          },
          planner: parsed.planner?.length > 0 ? parsed.planner : previous.planner,
          risks: parsed.risks?.length > 0 ? parsed.risks : previous.risks,
          recommendations: parsed.recommendations?.length > 0 ? parsed.recommendations : previous.recommendations,
          coach: parsed.coach || previous.coach,
        };
      });

      addAIMessage(parsed.chat || "✅ AI analysis completed successfully.");
      setLastUpdated(new Date());
      setSessionStats((previous) => ({ ...previous, analyses: previous.analyses + 1 }));

    } catch (error) {
      console.error("Gemini Error:", error);
      addAIMessage("❌ Unable to generate AI analysis. Please try again.");
    } finally {
      setActiveAction(null);
    }
  };
// src/pages/AIAssistant.jsx (Part 2 of 2)
  return (
    <Box sx={{ p: { xs: 1.5, md: 3 }, maxWidth: "1600px", mx: "auto" }}>
      <AIHeader />

      {/* Diagnostics Monitor System Panel */}
      <Paper
        elevation={0}
        sx={{
          mt: 3,
          mb: 4,
          p: 3,
          borderRadius: "24px", 
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper", 
          boxShadow: (theme) => theme.palette.mode === "dark" 
            ? "0 4px 12px rgba(0,0,0,0.3)" 
            : "0 4px 12px rgba(15,23,42,0.01)"
        }}
      >
        {/* ✅ STABILIZED GRIDS: Explicitly added missing MUI "item" props to prevent display collapse */}
        <Grid container spacing={3.5} sx={{ alignItems: "center" }}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", display: "block" }}>
              Voice Assistant Status
            </Typography>
            <Typography variant="h6" fontWeight={800} sx={{ color: "primary.main", mt: 0.5, letterSpacing: "-0.01em" }}>
              {voiceStatus[voiceState] || "🟢 Ready"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", display: "block" }}>
              Session Engine Metrics
            </Typography>
            <Typography variant="h6" fontWeight={800} sx={{ color: "text.primary", mt: 0.5, letterSpacing: "-0.01em" }}>
              {sessionStats.analyses} Cycles Run
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", display: "block" }}>
              Last Engine Sync
            </Typography>
            <Typography variant="h6" fontWeight={800} sx={{ color: "text.primary", mt: 0.5, letterSpacing: "-0.01em" }}>
              {lastUpdated ? lastUpdated.toLocaleTimeString() : "--"}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Main Action Cards Row */}
      <Grid container spacing={3.5} sx={{ mb: 4.5 }}>
        {actions.map((action) => (
          <Grid item xs={12} sm={6} md={3} key={action.id}>
            <AIActionCard
              title={action.title}
              description={action.description}
              icon={action.icon}
              color={action.colorKey}
              loading={activeAction === action.id}
              onClick={() => handleAIAction(action.id)}
            />
          </Grid>
        ))}
      </Grid>

      {/* Main Core Splits Content Container Grid */}
      <Grid container spacing={4} sx={{ alignItems: "stretch" }}>
        {/* CHAT INTERFACE PANEL */}
        <Grid item xs={12} lg={5} sx={{ display: "flex", flexDirection: "column" }}>
          <AIChat />
        </Grid>

        {/* GENERATIVE METRIC CARDS BOARD */}
        <Grid item xs={12} lg={7} sx={{ display: "flex", flexDirection: "column", gap: 3.5 }}>
          <AIScoreCard summary={analysis.summary} />
          
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3.5 }}>
            {analysis.recommendations?.length > 0 && (
              <AIRecommendationCard recommendations={analysis.recommendations} />
            )}
            {analysis.planner?.length > 0 && (
              <AIDailyPlanner planner={analysis.planner} />
            )}
            {analysis.risks?.length > 0 && (
              <AIRiskDetector risks={analysis.risks} />
            )}
            {analysis.coach && (
              <AIProductivityCoach coach={analysis.coach} />
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AIAssistant;
