// src/components/ai/AIPrioritizer.jsx
import { useState, useMemo } from "react";
import { Button, Card, CardContent, Typography, CircularProgress, Box, Alert, Stack, alpha } from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import { useTasks } from "../../context/TaskContext";
import { useAuth } from "../../context/AuthContext"; // ✅ ADDED: Multi-User Security
import { askGemini } from "../../services/gemini";

// ✅ FIXED: Configured to accept incoming pre-analyzed priorities arrays seamlessly from parent tabs
function AIPrioritizer({ highestPriority = [] }) {
  const { user } = useAuth();
  const { tasks = [] } = useTasks() || {};
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState(null);

  // ✅ PRIVACY LOCK: Secure local fallback filtering mapping
  const secureUserTasks = useMemo(() => {
    if (!user || !user.uid) return [];
    return tasks.filter((t) => t && (!t.userId || t.userId === user.uid));
  }, [tasks, user]);

  const handleClick = async () => {
    if (!secureUserTasks || secureUserTasks.length === 0) {
      setError("You don't have any active tasks to prioritize right now.");
      return;
    }

    setLoading(true);
    setError(null);

    const prompt = `
      You are an expert productivity assistant.
      Analyze and prioritize the following tasks:
      ${JSON.stringify(secureUserTasks, null, 2)}
      Return ONLY a clean numbered priority list with a short reason for each item.
    `;

    try {
      const response = await askGemini(prompt);
      setResult(response || "No response received from model.");
    } catch (err) {
      console.error(err);
      setError("Failed to communicate with Gemini AI. Please check your network connection.");
    } finally {
      setLoading(false);
    }
  };

  const hasDataToDisplay = highestPriority.length > 0 || result;

  return (
    <Card 
      elevation={0} 
      sx={{ 
        p: 1, 
        borderRadius: "20px", 
        border: "1px solid", 
        borderColor: "divider",
        bgcolor: "background.paper" 
      }}
    >
      <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
        <Typography variant="subtitle2" fontWeight={800} sx={{ color: "text.primary", mb: 2, letterSpacing: "-0.01em" }}>
          AI Task Prioritizer
        </Typography>

        {/* ================= CAPSULE CTA TRIGGER BUTTON ================= */}
        <Button
          variant="contained"
          disableElevation
          onClick={handleClick}
          disabled={loading}
          endIcon={loading ? <CircularProgress size={16} sx={{ color: "primary.contrastText" }} /> : <AutoAwesomeRoundedIcon sx={{ fontSize: 16 }} />}
          sx={{ 
            py: 1.1, 
            px: 3.5, 
            borderRadius: "24px", 
            textTransform: "none", 
            fontWeight: 700,
            fontSize: "0.875rem",
            bgcolor: "primary.main",
            color: "primary.contrastText",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              bgcolor: "primary.dark",
              transform: "translateY(-1px)"
            },
            "&:active": {
              transform: "translateY(0)"
            }
          }}
        >
          {loading ? "Thinking..." : "Prioritize Tasks"}
        </Button>

        {error && (
          <Alert 
            severity="warning" 
            sx={{ 
              mt: 3, 
              borderRadius: "14px",
              fontWeight: 600,
              fontSize: "0.85rem"
            }}
          >
            {error}
          </Alert>
        )}

        {/* ================= REFINED RESULTS ANALYSIS BODY ================= */}
        {hasDataToDisplay && !error && (
          <Box 
            sx={{ 
              mt: 3, 
              p: 2.5, 
              borderRadius: "16px", 
              bgcolor: "background.default", 
              border: "1px solid", 
              borderColor: "divider",
              boxShadow: (theme) => theme.palette.mode === "dark" ? "inset 0 2px 8px rgba(0,0,0,0.2)" : "inset 0 2px 8px rgba(0,0,0,0.02)"
            }}
          >
            {/* If parent dashboard already computed priorities array format layout lists */}
            {highestPriority.length > 0 ? (
              <Stack spacing={2} sx={{ direction: "column" }}>
                {highestPriority.map((item, index) => (
                  <Stack key={index} spacing={1.5} sx={{ direction: "row", alignItems: "flex-start" }}>
                    <Box sx={{ fontWeight: 800, color: "primary.main", minWidth: 20 }}>{index + 1}.</Box>
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                      <Typography variant="body2" fontWeight={700} sx={{ color: "text.primary" }}>
                        {typeof item === "string" ? item : (item.task || item.title || "Task")}
                      </Typography>
                      {item.reason && (
                        <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 0.5, fontWeight: 500 }}>
                          Reason: {item.reason}
                        </Typography>
                      )}
                    </Box>
                  </Stack>
                ))}
              </Stack>
            ) : (
              // Fallback support layout for local button string results
              <Typography variant="body2" sx={{ whiteSpace: "pre-wrap", lineHeight: 1.7, color: "text.primary", fontWeight: 500 }}>
                {result}
              </Typography>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default AIPrioritizer;
