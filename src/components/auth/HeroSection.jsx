// src/components/auth/HeroSection.jsx
import { Box, Typography, Stack, alpha } from "@mui/material";
import { useTheme } from "@mui/material/styles"; 
import { motion } from "framer-motion";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";

import GradientButton from "./GradientButton";

// ✅ FIXED: Swapped out deprecated factory function for modern component creation standard
const MotionBox = motion.create 
  ? motion.create(Box) 
  : motion(Box); // Secure fallback mechanism for package cross-compatibility

const HeroSection = ({
  onGetStarted,
  onLogin,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <MotionBox
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      sx={{
        textAlign: "center",
        py: {
          xs: 4,
          md: 8,
        },
      }}
    >
      {/* ================= MODERN GLOW BADGE (THEME AWARE) ================= */}
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          px: 2.5,
          py: 1,
          borderRadius: "30px",
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          color: "primary.main",
          fontWeight: 700,
          fontSize: "0.8rem",
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          mb: 4,
          border: "1px solid",
          borderColor: (theme) => alpha(theme.palette.primary.main, 0.2),
          backdropFilter: "blur(4px)",
          boxShadow: (theme) => `0 4px 20px ${alpha(theme.palette.primary.main, 0.05)}`,
        }}
      >
        <span style={{ marginRight: "8px", fontSize: "0.9rem" }}>🚀</span> AI Powered Productivity Platform
      </Box>

      {/* ================= HIGH-CONTRAST HEADING ================= */}
      <Typography
        variant="h2"
        fontWeight={900}
        sx={{
          mb: 2.5,
          fontSize: {
            xs: "2.5rem",
            sm: "3.5rem",
            md: "4.5rem",
          },
          letterSpacing: "-0.035em",
          lineHeight: 1.1,
          background: (theme) => theme.palette.mode === "dark"
            ? `linear-gradient(135deg, #FFFFFF 40%, ${theme.palette.primary.light} 100%)`
            : `linear-gradient(135deg, ${theme.palette.text.primary} 50%, ${theme.palette.primary.main} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Deadline Guardian Pro
      </Typography>

      {/* ================= REFINED SUBTITLE ================= */}
      <Typography
        variant="body1"
        sx={{
          maxWidth: 640,
          mx: "auto",
          lineHeight: 1.7,
          color: "text.secondary", 
          fontSize: { xs: "1.05rem", md: "1.15rem" },
          fontWeight: 500,
          mb: 6,
        }}
      >
        Organize your work, prioritize intelligently, meet every deadline, and boost productivity with the power of AI.
      </Typography>

      {/* ================= ACTIONS ROW ================= */}
      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        spacing={2.5}
        justifyContent="center"
        alignItems="center"
        sx={{ mb: 8 }}
      >
        <GradientButton
          endIcon={<ArrowForwardRoundedIcon sx={{ fontSize: 18 }} />}
          onClick={onGetStarted}
          sx={{
            minWidth: 180,
          }}
        >
          Get Started
        </GradientButton>

        <GradientButton
          startIcon={<LoginRoundedIcon sx={{ fontSize: 18 }} />}
          onClick={onLogin}
          sx={{
            minWidth: 180,
            background: (theme) => `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
            boxShadow: (theme) => `0 8px 24px ${alpha(theme.palette.secondary.main, 0.25)}`,
            "&:hover": {
              background: (theme) => `linear-gradient(135deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.main} 100%)`,
              boxShadow: (theme) => `0 12px 32px ${alpha(theme.palette.secondary.main, 0.4)}`,
            },
          }}
        >
          Sign In
        </GradientButton>
      </Stack>

      {/* ================= MODERN STATS DISPLAY (THEME AWARE) ================= */}
      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}
        spacing={{ xs: 4, md: 8 }}
        justifyContent="center"
        alignItems="center"
        sx={{
          mt: 4,
          p: 4,
          maxWidth: 800,
          mx: "auto",
          borderRadius: "24px", 
          background: (theme) => theme.palette.mode === "dark"
            ? "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 100%)"
            : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.default, 0.5)} 100%)`,
          border: "1px solid",
          borderColor: "divider",
          backdropFilter: "blur(10px)",
          boxShadow: (theme) => theme.palette.mode === "dark" 
            ? "none" 
            : `0 10px 30px ${alpha(theme.palette.text.primary, 0.01)}`
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h4"
            fontWeight={900}
            sx={{
              color: "primary.main",
              letterSpacing: "-0.02em",
              mb: 0.5
            }}
          >
            500+
          </Typography>
          <Typography sx={{ color: "text.secondary", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Tasks Managed
          </Typography>
        </Box>

        {/* Separator Line */}
        <Box sx={{ display: { xs: "none", md: "block" }, width: "1px", height: "32px", bgcolor: "divider" }} />

        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h4"
            fontWeight={900}
            sx={{
              color: "success.main",
              letterSpacing: "-0.02em",
              mb: 0.5
            }}
          >
            95%
          </Typography>
          <Typography sx={{ color: "text.secondary", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Productivity Score
          </Typography>
        </Box>

        {/* Separator Line */}
        <Box sx={{ display: { xs: "none", md: "block" }, width: "1px", height: "32px", bgcolor: "divider" }} />

        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h4"
            fontWeight={900}
            sx={{
              color: "warning.main",
              letterSpacing: "-0.02em",
              mb: 0.5
            }}
          >
            AI
          </Typography>
          <Typography sx={{ color: "text.secondary", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Powered Assistant
          </Typography>
        </Box>
      </Stack>
    </MotionBox>
  );
};

export default HeroSection;
