// src/components/analytics/AIInsights.jsx
import {
  Paper,
  Typography,
  Stack,
  Avatar,
  Divider,
  Box,
  alpha, // ✅ FIXED: Imported alpha helper for theme-resilient translucent overlays
} from "@mui/material";

import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

const AIInsights = ({ insights }) => {
  return (
    <CardPaper
      sx={{
        p: 3.5,
        borderRadius: "24px", // Matches your exact capsule curve layout family
        border: "1px solid",
        borderColor: "divider", // Adaptable structural separation framework outline trace line
        // ✅ UPDATED: Clean, theme-adaptive SaaS backdrop gradient that darkens smoothly
        background: (theme) => theme.palette.mode === "dark"
          ? `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.default, 0.4)} 100%)`
          : `linear-gradient(180deg, #FFFFFF 0%, ${theme.palette.background.default} 100%)`,
        height: "100%",
        boxShadow: (theme) => theme.palette.mode === "dark" ? "0 10px 30px rgba(0,0,0,0.3)" : "0 10px 30px rgba(15,23,42,0.01)"
      }}
    >
      {/* ================= HEADER SECTOR ================= */}
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        mb={3}
      >
        {/* ✅ UPDATED: Converted into a signature premium rounded dashboard squircle badge container */}
        <Avatar
          sx={{
            background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
            color: "primary.contrastText",
            width: 44,
            height: 44,
            borderRadius: "12px",
            boxShadow: (theme) => `0 4px 14px ${alpha(theme.palette.primary.main, 0.25)}`
          }}
        >
          <AutoAwesomeRoundedIcon sx={{ fontSize: 20 }} />
        </Avatar>

        <Typography
          variant="subtitle1"
          fontWeight={800} // Upgraded weight for premium brand harmony profile
          sx={{ color: "text.primary", letterSpacing: "-0.01em" }} // ✅ UPDATED: Stark adaptive title contrast text
        >
          AI Insights
        </Typography>
      </Stack>

      <Divider sx={{ mb: 3.5, borderColor: "divider" }} />

      {/* ================= INSIGHT LIST FEEDS ================= */}
      <Stack spacing={2}>
        {insights.map((item, index) => (
          <CardPaper
            key={index}
            sx={{
              p: 2,
              // ✅ UPDATED: Background tint adaptively softens in dark mode instead of staying blindingly bright light-mode blue
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
              // ✅ UPDATED: Direct theme palette token error/primary main border trace assignment
              borderLeft: "4px solid",
              borderLeftColor: "primary.main",
              borderRadius: "14px",
              borderTop: "1px solid",
              borderTopColor: (theme) => alpha(theme.palette.primary.main, 0.1),
              borderRight: "1px solid",
              borderRightColor: (theme) => alpha(theme.palette.primary.main, 0.1),
              borderBottom: "1px solid",
              borderBottomColor: (theme) => alpha(theme.palette.primary.main, 0.1),
            }}
          >
            <Typography variant="body2" sx={{ color: "text.primary", fontWeight: 600, lineHeight: 1.5 }}>
              {item}
            </Typography>
          </CardPaper>
        ))}
      </Stack>
    </CardPaper>
  );
};

// Reusable standard base card chassis wrapper to guarantee zero layout compilation breaks
function CardPaper({ children, sx = {}, ...props }) {
  return (
    <Paper elevation={0} sx={sx} {...props}>
      {children}
    </Paper>
  );
}

export default AIInsights;
