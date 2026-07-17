// src/components/ai/AIScoreCard.jsx
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  alpha,
} from "@mui/material";
import { useTheme } from "@mui/material/styles"; 

// ✅ FIXED: Destructured incoming summary dataset parameters directly out of the parent dashboard props link
const AIScoreCard = ({ summary }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  // ✅ FIXED: Safely reads the real-time score out of the summary state payload dictionary keys
  const score = summary?.productivityScore ?? "--";

  const parsedScore = typeof score === "number" ? score : parseFloat(score);
  const isInvalid = isNaN(parsedScore) || score === "--";
  const safeScore = isInvalid ? 0 : Math.min(Math.max(parsedScore, 0), 100);

  const getColorValue = () => {
    if (isInvalid) return theme.palette.text.disabled;
    if (safeScore >= 80) return theme.palette.success.main;
    if (safeScore >= 60) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  const activeColor = getColorValue();

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "24px", 
        border: "1px solid",
        borderColor: "divider", 
        bgcolor: "background.paper", 
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: isDarkMode ? "0 10px 30px rgba(0,0,0,0.3)" : "0 10px 30px rgba(15, 23, 42, 0.01)"
      }}
    >
      <CardContent sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column", "&:last-child": { pb: 3 } }}>
        <Typography 
          variant="subtitle1" 
          fontWeight={800} 
          sx={{ color: "text.primary", letterSpacing: "-0.01em" }}
        >
          Productivity Score
        </Typography>

        {/* ================= REFINED DYNAMIC RADIUS GAUGE ================= */}
        <Box 
          sx={{ 
            display: "grid", 
            placeItems: "center", 
            position: "relative", 
            my: 4, 
            flexGrow: 1, 
            minHeight: 180 
          }}
        >
          {/* Background Ring Track Layer */}
          <CircularProgress
            variant="determinate"
            value={100}
            size={170}
            thickness={4}
            sx={{
              color: () => isDarkMode ? alpha(theme.palette.divider, 0.4) : "action.hover", 
              gridArea: "1 / 1 / 2 / 2",
            }}
          />

          {/* Active Progress Data Layer */}
          <CircularProgress
            variant="determinate"
            value={safeScore}
            size={170}
            thickness={4}
            sx={{
              color: activeColor,
              transform: "rotate(-90deg)",
              strokeLinecap: "round",
              gridArea: "1 / 1 / 2 / 2",
            }}
          />

          {/* Centered Numerical Value Text Block */}
          <Box 
            sx={{ 
              gridArea: "1 / 1 / 2 / 2", 
              textAlign: "center", 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center" 
            }}
          >
            <Typography 
              variant="h2" 
              fontWeight={900} 
              sx={{ 
                color: activeColor, 
                lineHeight: 1, 
                fontSize: { xs: "2.5rem", sm: "3rem" }, 
                letterSpacing: "-0.03em" 
              }}
            >
              {isInvalid ? "--" : safeScore}
            </Typography>
            
            <Typography 
              variant="caption" 
              fontWeight={800} 
              sx={{ mt: 0.75, color: "text.secondary", letterSpacing: "0.05em", textTransform: "uppercase", fontSize: "0.65rem" }}
            >
              Out of 100
            </Typography>
          </Box>
        </Box>

        {/* Footer Descriptive Segment */}
        {/* ✅ FIXED: Cleaned up inline attributes by leveraging modern styling configurations */}
        <Typography variant="body2" sx={{ px: 2, textAlign: "center", lineHeight: 1.5, color: "text.secondary", fontWeight: 500 }}>
          {isInvalid 
            ? "Run AI analysis tasks to aggregate real-time workload calculations." 
            : "AI calculated your productivity based on workload, priorities, deadlines and completed tasks."
          }
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AIScoreCard;
