// src/components/dashboard/ProductivityScore.jsx
import { Box, Typography, alpha } from "@mui/material";

function ProductivityScore({ score }) {
  let message = "";

  if (score >= 90) message = "Excellent! You're highly productive.";
  else if (score >= 70) message = "Great work! Keep it up.";
  else if (score >= 50) message = "You're doing well. Stay focused.";
  else message = "Let's complete a few more tasks today!";

  return (
    <Box sx={{ mt: 4, pt: 3, borderTop: "1px solid", borderColor: "divider" }}>
      {/* Subsection Header Label */}
      <Typography variant="body2" sx={{ color: "text.primary", fontWeight: 700, letterSpacing: "-0.01em" }}>
        Productivity Score
      </Typography>

      {/* ================= REFINED DYNAMIC SCORE PANEL ================= */}
      <Typography 
        variant="h4" 
        fontWeight={800} 
        sx={{ 
          mt: 1.5, 
          color: "primary.main", // ✅ UPDATED: Adapts dynamically across brand theme modes
          letterSpacing: "-0.03em" 
        }}
      >
        {score} 
        <span style={{ fontSize: "15px", color: "text.secondary", fontWeight: 600, marginLeft: "4px" }}>
          / 100
        </span>
      </Typography>

      {/* ================= PILL MESSAGE BANNER ================= */}
      <Box 
        sx={{ 
          mt: 2, 
          px: 2, 
          py: 1, 
          borderRadius: "10px", 
          // ✅ UPDATED: Uses alpha() on the primary theme palette to prevent text bleaching blurs in dark mode
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06), 
          border: "1px solid",
          borderColor: (theme) => alpha(theme.palette.primary.main, 0.15),
          display: "inline-block"
        }}
      >
        <Typography sx={{ fontSize: "0.825rem", color: "primary.main", fontWeight: 700, letterSpacing: "-0.01em" }}>
          {message}
        </Typography>
      </Box>
    </Box>
  );
}

export default ProductivityScore;
