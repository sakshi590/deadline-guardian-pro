// src/components/ai/AIHeader.jsx
import { Box, Typography, Chip, alpha } from "@mui/material";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

const AIHeader = () => {
  return (
    <Box
      sx={{
        mb: 4,
        p: { xs: 3, md: 4 },
        borderRadius: "24px", 
        background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        color: "primary.contrastText",
        overflow: "hidden",
        position: "relative",
        boxShadow: (theme) => `0 12px 32px ${alpha(theme.palette.primary.main, 0.18)}`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          gap: 3,
          position: "relative",
          zIndex: 1, 
        }}
      >
        <Box>
          <Typography
            variant="h3"
            fontWeight={800}
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "2.75rem" },
              letterSpacing: "-0.025em",
              color: "primary.contrastText"
            }}
          >
            AI Assistant
          </Typography>
          <Typography sx={{ mt: 1, opacity: 0.85, maxWidth: "500px", fontWeight: 500, fontSize: { xs: "0.9rem", sm: "0.95rem" }, color: "primary.contrastText" }}>
            Your intelligent productivity companion powered by Gemini AI.
          </Typography>
        </Box>

        {/* ================= ADAPTIVE GLOW TAG BADGE ================= */}
        <Chip
          icon={<AutoAwesomeRoundedIcon sx={{ fontSize: "16px !important" }} />}
          label="Gemini AI Connected"
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.15)",
            color: "primary.contrastText", 
            fontWeight: 700,
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.03em",
            borderRadius: "24px",
            px: 0.5,
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            "& .MuiChip-icon": { color: "primary.contrastText" },
            "& .MuiChip-label": { px: 1.2 }
          }}
        />
      </Box>

      {/* Decorative Vector Watermark background layer */}
      <PsychologyRoundedIcon
        sx={{
          position: "absolute",
          right: -25,
          bottom: -25,
          fontSize: { xs: 120, sm: 150, md: 180 },
          color: "rgba(255, 255, 255, 0.06)", 
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
    </Box>
  );
};

export default AIHeader;
