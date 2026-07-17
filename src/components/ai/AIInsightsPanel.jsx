// src/components/ai/AIInsightsPanel.jsx
import { Card, CardContent, Typography, Stack, Divider, Chip, Box, alpha } from "@mui/material";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";

const Section = ({ title, icon, items, colorKey, fallbackText }) => {
  const safeItems = Array.isArray(items) ? items : [];

  return (
    <Box>
      {/* ✅ FIXED: Transferred the stack layout attributes into the safe sx styling wrapper */}
      <Stack 
        spacing={1.5} 
        sx={{ 
          direction: "row",
          alignItems: "center",
          mb: 2 
        }}
      >
        {icon}
        <Typography variant="subtitle2" fontWeight={800} sx={{ color: "text.primary", letterSpacing: "-0.01em" }}>
          {title}
        </Typography>
      </Stack>

      {safeItems.length > 0 ? (
        <Stack spacing={1}>
          {safeItems.map((item, index) => {
            let displayLabel = "";
            if (typeof item === "string") {
              displayLabel = item;
            } else if (item && typeof item === "object") {
              displayLabel = item.time ? `[${item.time}] ${item.task || ""}` : (item.task || item.title || "Task");
            }

            return (
              <Chip
                key={index}
                label={displayLabel}
                variant="outlined"
                sx={{
                  justifyContent: "flex-start",
                  height: "auto",
                  py: 1.2,
                  px: 1.5,
                  borderRadius: "12px", 
                  whiteSpace: "normal",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  bgcolor: (theme) => alpha(theme.palette[colorKey].main, 0.05),
                  color: `${colorKey}.main`,
                  border: "1px solid",
                  borderColor: (theme) => alpha(theme.palette[colorKey].main, 0.18),
                  "& .MuiChip-label": { width: "100%", textAlign: "left", whiteSpace: "normal", lineHeight: 1.45, px: 0.5 },
                }}
              />
            );
          })}
        </Stack>
      ) : (
        <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500, fontStyle: "italic", pl: 0.5 }}>
          {fallbackText || "No data available yet."}
        </Typography>
      )}
    </Box>
  );
};

const AIInsightsPanel = ({ analysis }) => {
  if (!analysis) {
    return (
      <Card
        elevation={0}
        sx={{
          borderRadius: "24px", 
          border: "1px solid",
          borderColor: "divider",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3.5,
          textAlign: "center",
          bgcolor: (theme) => alpha(theme.palette.text.primary, 0.02),
        }}
      >
        <CardContent>
          <PsychologyRoundedIcon sx={{ fontSize: 44, color: "text.disabled", mb: 2, opacity: 0.7 }} />
          <Typography variant="subtitle1" fontWeight={800} sx={{ color: "text.primary", mb: 1, letterSpacing: "-0.01em" }}>No Insights Generated</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500, maxWidth: "320px", mx: "auto" }}>
            Use the actions below to trigger task prioritization and habit coaching loops.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      elevation={0} 
      sx={{ 
        borderRadius: "24px", 
        border: "1px solid", 
        borderColor: "divider", 
        bgcolor: "background.paper",
        height: "100%",
        boxShadow: (theme) => theme.palette.mode === "dark" 
          ? "0 10px 30px rgba(0,0,0,0.3)" 
          : "0 10px 30px rgba(15, 23, 42, 0.01)"
      }}
    >
      <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
        <Typography variant="h5" fontWeight={800} sx={{ color: "text.primary", mb: 3.5, letterSpacing: "-0.02em" }}>
          AI Insights
        </Typography>
        
        <Stack spacing={3}>
          <Section
            title="Highest Priority"
            colorKey="primary"
            items={analysis.highestPriority}
            fallbackText="Click 'Analyze Tasks' to extract priorities."
            icon={<FlagRoundedIcon sx={{ color: "primary.main", fontSize: 20 }} />}
          />
          
          <Divider sx={{ borderColor: "divider" }} />
          
          <Section
            title="Risk Alerts"
            colorKey="error"
            items={analysis.risks}
            fallbackText="Click 'Risk Detector' to check timeline threats."
            icon={<WarningAmberRoundedIcon sx={{ color: "error.main", fontSize: 20 }} />}
          />
          
          <Divider sx={{ borderColor: "divider" }} />
          
          <Section
            title="Today's Planner"
            colorKey="success"
            items={analysis.planner}
            fallbackText="Click 'Daily Planner' to structure today's itinerary."
            icon={<CalendarMonthRoundedIcon sx={{ color: "success.main", fontSize: 20 }} />}
          />
          
          <Divider sx={{ borderColor: "divider" }} />
          
          <Box>
            {/* ✅ FIXED: Transferred the stack layout attributes into the safe sx styling wrapper */}
            <Stack 
              spacing={1.5} 
              sx={{ 
                direction: "row",
                alignItems: "center",
                mb: 2 
              }}
            >
              <PsychologyRoundedIcon sx={{ color: "warning.main", fontSize: 20 }} />
              <Typography variant="subtitle2" fontWeight={800} sx={{ color: "text.primary", letterSpacing: "-0.01em" }}>
                AI Productivity Coach
              </Typography>
            </Stack>
            
            {analysis.coach?.motivation || analysis.coach?.strengths ? (
              <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500, lineHeight: 1.6, pl: 0.5 }}>
                {analysis.coach.motivation || "Coaching analysis loaded."}
              </Typography>
            ) : (
              <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500, fontStyle: "italic", pl: 0.5 }}>
                Click 'Productivity Coach' to analyze work habits.
              </Typography>
            )}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default AIInsightsPanel;
