// src/components/analytics/ChartCard.jsx
import { Paper, Typography, alpha } from "@mui/material";

const ChartCard = ({ title, children }) => {
  return (
    <Paper
      elevation={0} // Changed from elevation 3 to a flat SaaS layout style family
      sx={{
        p: 3.5,
        borderRadius: "24px", // Matches your exact capsule curve layout family
        border: "1px solid",
        borderColor: "divider", // Theme adaptive separation frame line
        bgcolor: "background.paper", // Seamless dark/light card backing surface
        height: "100%",
        display: "flex",
        flexDirection: "column",
        // Clean dynamic SaaS backdrop gradient that darkens smoothly across themes
        background: (theme) => theme.palette.mode === "dark"
          ? `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.default, 0.4)} 100%)`
          : `linear-gradient(180deg, #FFFFFF 0%, ${theme.palette.background.default} 100%)`,
        boxShadow: (theme) => theme.palette.mode === "dark" 
          ? "0 10px 30px rgba(0,0,0,0.3)" 
          : "0 10px 30px rgba(15, 23, 42, 0.01)",
      }}
    >
      {/* ================= SECTION HEADER METRIC ================= */}
      <Typography
        variant="subtitle1"
        fontWeight={800} // Upgraded weight for premium brand harmony profile
        sx={{ 
          color: "text.primary", // ✅ UPDATED: Shifts cleanly from charcoal slate to pure white text
          mb: 3.5, 
          letterSpacing: "-0.01em" 
        }}
      >
        {title}
      </Typography>

      {/* Dynamic Graph Injection Mounting Node Container Area */}
      {children}
    </Paper>
  );
};

export default ChartCard;
