// src/components/analytics/StatCard.jsx
import { Paper, Typography, Stack, Box, alpha } from "@mui/material";

const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  color,
}) => {
  return (
    <Paper
      elevation={0} 
      sx={{
        p: 2.5,
        borderRadius: "20px", 
        height: "100%",
        bgcolor: "background.paper", 
        border: "1px solid",
        borderColor: "divider", 
        background: (theme) => theme.palette.mode === "dark"
          ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.default, 0.4)} 100%)`
          : `linear-gradient(135deg, #FFFFFF 0%, ${theme.palette.background.default} 100%)`,
        boxShadow: (theme) => theme.palette.mode === "dark" ? "0 4px 12px rgba(0,0,0,0.3)" : "0 4px 12px rgba(0, 0, 0, 0.01)",
        transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        "&:hover": {
          transform: "translateY(-3px)", 
          borderColor: (theme) => alpha(theme.palette.text.primary, 0.15),
          boxShadow: (theme) => theme.palette.mode === "dark" 
            ? "0 8px 24px rgba(0,0,0,0.4)" 
            : "0 8px 24px rgba(15, 23, 42, 0.03)",
        },
      }}
    >
      {/* ✅ FIXED: Transferred the stack flex layout variables into a standard theme-safe sx style wrapper block */}
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.725rem", display: "block" }} 
          >
            {title}
          </Typography>

          <Typography
            variant="h4" 
            fontWeight={800}
            sx={{ color: "text.primary", letterSpacing: "-0.02em", mt: 0.5, mb: 0.5 }} 
          >
            {value}
          </Typography>

          <Typography
            variant="caption"
            sx={{ color: "text.secondary", fontWeight: 600, display: "block" }}
          >
            {subtitle}
          </Typography>
        </Box>

        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: "10px", 
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: (theme) => {
              if (!color) return alpha(theme.palette.primary.main, 0.08);
              if (color.includes('.')) {
                const [p, s] = color.split('.');
                return alpha(theme.palette[p][s], 0.08);
              }
              return alpha(color, 0.08);
            },
            color: color || "primary.main",
            border: "1px solid",
            borderColor: (theme) => {
              if (!color) return alpha(theme.palette.primary.main, 0.15);
              if (color.includes('.')) {
                const [p, s] = color.split('.');
                return alpha(theme.palette[p][s], 0.15);
              }
              return alpha(color, 0.15);
            },
            flexShrink: 0,
            "& .MuiSvgIcon-root": { fontSize: 20 } 
          }}
        >
          {icon}
        </Box>
      </Stack>
    </Paper>
  );
};

export default StatCard;
