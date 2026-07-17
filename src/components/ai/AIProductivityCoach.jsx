// src/components/ai/AIProductivityCoach.jsx
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  Chip,
  Divider,
  alpha,
} from "@mui/material";

import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import LightbulbRoundedIcon from "@mui/icons-material/LightbulbRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";

const AIProductivityCoach = ({ coach }) => {
  if (!coach || typeof coach !== "object" || Object.keys(coach).length === 0) {
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
          boxShadow: (theme) => theme.palette.mode === "dark" 
            ? "0 10px 30px rgba(0,0,0,0.3)" 
            : "0 10px 30px rgba(15, 23, 42, 0.01)"
        }}
      >
        <CardContent sx={{ p: 3, flexGrow: 1, "&:last-child": { pb: 3 } }}>
          <Typography variant="subtitle1" fontWeight={800} sx={{ color: "text.primary", mb: 1, letterSpacing: "-0.01em" }}>
            Productivity Coach
          </Typography>
          <Typography sx={{ color: "text.secondary", fontWeight: 500, fontSize: "0.925rem" }}>
            Click <b>Productivity Coach</b> to receive personalized work habit feedback.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const safeStrengths = Array.isArray(coach.strengths) ? coach.strengths : [];
  const safeSuggestions = Array.isArray(coach.suggestions) ? coach.suggestions : [];

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
        boxShadow: (theme) => theme.palette.mode === "dark" 
          ? "0 10px 30px rgba(0,0,0,0.3)" 
          : "0 10px 30px rgba(15, 23, 42, 0.01)"
      }}
    >
      <CardContent sx={{ p: 3, flexGrow: 1, "&:last-child": { pb: 3 } }}>
        {/* ================= HEADER SECTOR ================= */}
        {/* ✅ FIXED: Handled text stack layouts cleanly via material component style properties */}
        <Stack 
          spacing={1.5} 
          sx={{ 
            direction: "row",
            alignItems: "center",
            mb: 2 
          }}
        >
          <TrendingUpRoundedIcon sx={{ color: "warning.main", fontSize: 22 }} /> 
          <Typography variant="subtitle1" fontWeight={800} sx={{ color: "text.primary", letterSpacing: "-0.01em" }}>
            Productivity Coach
          </Typography>
        </Stack>

        {/* ✅ FIXED: Handled text stack layouts cleanly via material component style properties */}
        <Stack 
          spacing={1.5} 
          sx={{ 
            direction: "row",
            alignItems: "center",
            flexWrap: "wrap",
            mb: 3 
          }}
        >
          <Chip
            label={`Score: ${coach.score ?? "--"}/100`}
            size="small"
            sx={{ 
              fontWeight: 700, 
              borderRadius: "8px",
              fontSize: "0.75rem",
              bgcolor: (theme) => alpha(theme.palette.warning.main, 0.08), 
              color: "warning.main",
              border: "1px solid",
              borderColor: (theme) => alpha(theme.palette.warning.main, 0.2),
              px: 0.5,
              "& .MuiChip-label": { px: 1 }
            }}
          />
          {/* Optional Supporting Strategy Badges */}
          {(coach.focus || coach.mindset) && (
            <Chip
              variant="outlined"
              size="small"
              label={coach.focus || coach.mindset}
              sx={{ 
                fontWeight: 700, 
                borderRadius: "8px",
                fontSize: "0.75rem",
                color: "text.secondary", 
                borderColor: "divider",
                bgcolor: (theme) => alpha(theme.palette.text.primary, 0.01),
                px: 0.5,
                "& .MuiChip-label": { px: 1 }
              }}
            />
          )}
        </Stack>

        <Divider sx={{ mb: 2.5, borderColor: "divider" }} />

        {/* ================= STRENGTHS MATRICES ================= */}
        <Box sx={{ mb: 3 }}>
          {/* ✅ FIXED: Handled text stack layouts cleanly via material component style properties */}
          <Stack 
            spacing={1} 
            sx={{ 
              direction: "row",
              alignItems: "center",
              mb: 1.5 
            }}
          >
            <ThumbUpRoundedIcon sx={{ fontSize: 16, color: "success.main" }} />
            <Typography fontWeight={800} variant="body2" sx={{ color: "text.primary", letterSpacing: "-0.005em" }}>Strengths</Typography>
          </Stack>
          {safeStrengths.length > 0 ? (
            <Stack spacing={1}>
              {safeStrengths.map((item, index) => (
                <Typography key={index} variant="body2" sx={{ color: "text.secondary", fontWeight: 500, lineHeight: 1.5, pl: 0.5 }}>
                  • {item}
                </Typography>
              ))}
            </Stack>
          ) : (
            <Typography variant="caption" sx={{ color: "text.disabled", fontWeight: 600, fontStyle: "italic", pl: 0.5 }}>
              No strengths logged yet.
            </Typography>
          )}
        </Box>

        {/* ================= SUGGESTIONS MATRICES ================= */}
        <Box sx={{ mb: coach.motivation ? 3 : 0 }}>
          {/* ✅ FIXED: Handled text stack layouts cleanly via material component style properties */}
          <Stack 
            spacing={1} 
            sx={{ 
              direction: "row",
              alignItems: "center",
              mb: 1.5 
            }}
          >
            <LightbulbRoundedIcon sx={{ fontSize: 16, color: "primary.main" }} />
            <Typography fontWeight={800} variant="body2" sx={{ color: "text.primary", letterSpacing: "-0.005em" }}>Suggestions</Typography>
          </Stack>
          {safeSuggestions.length > 0 ? (
            <Stack spacing={1}>
              {safeSuggestions.map((item, index) => (
                <Typography key={index} variant="body2" sx={{ color: "text.secondary", fontWeight: 500, lineHeight: 1.5, pl: 0.5 }}>
                  • {item}
                </Typography>
              ))}
            </Stack>
          ) : (
            <Typography variant="caption" sx={{ color: "text.disabled", fontWeight: 600, fontStyle: "italic", pl: 0.5 }}>
              No immediate adjustments recommended.
            </Typography>
          )}
        </Box>

        {/* ================= MOTIVATIONAL COACH BANNER ================= */}
        {coach.motivation && (
          <>
            <Divider sx={{ mb: 2.5, borderColor: "divider" }} />
            <Box 
              sx={{ 
                p: 2, 
                borderRadius: "14px", 
                bgcolor: (theme) => alpha(theme.palette.warning.main, 0.04),
                border: "1px solid",
                borderColor: (theme) => alpha(theme.palette.warning.main, 0.12),
              }}
            >
              {/* ✅ FIXED: Handled text stack layouts cleanly via material component style properties */}
              <Stack 
                spacing={1.5} 
                sx={{ 
                  direction: "row",
                  alignItems: "flex-start" 
                }}
              >
                <EmojiEventsRoundedIcon sx={{ color: "warning.main", fontSize: 20, mt: 0.25, flexShrink: 0 }} />
                <Typography variant="body2" sx={{ fontStyle: "italic", color: "text.primary", fontWeight: 600, lineHeight: 1.55 }}>
                  "{coach.motivation}"
                </Typography>
              </Stack>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AIProductivityCoach;
