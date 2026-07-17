// src/pages/Welcome.jsx
import { Box, Container, Grid, Typography, Stack, Button, alpha } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { styled, useTheme } from "@mui/material/styles";

import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import KeyboardVoiceRoundedIcon from "@mui/icons-material/KeyboardVoiceRounded";

import HeroSection from "../components/auth/HeroSection";
import FeatureCard from "../components/auth/FeatureCard";

// ✅ FIXED: Using modern motion.create() wrappers instead of the deprecated custom factory syntax
const MotionBox = motion.create 
  ? motion.create(Box) 
  : motion(Box);

const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: theme.palette.primary.contrastText,
  padding: "14px 36px",
  borderRadius: "50px",
  fontWeight: 700,
  textTransform: "none",
  fontSize: "1rem",
  letterSpacing: "-0.01em",
  boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.2)}`,
  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: `0 12px 32px ${alpha(theme.palette.primary.main, 0.35)}`,
    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
  },
}));

const features = [
  {
    title: "AI Task Analysis",
    description: "Gemini AI prioritizes tasks, detects risks and recommends the best order.",
    icon: <PsychologyRoundedIcon sx={{ fontSize: 32 }} />,
    colorKey: "primary.main",
  },
  {
    title: "Smart Planner",
    description: "Generate an intelligent daily schedule automatically.",
    icon: <CalendarMonthRoundedIcon sx={{ fontSize: 32 }} />,
    colorKey: "success.main",
  },
  {
    title: "Analytics",
    description: "Track productivity trends with interactive dashboards.",
    icon: <AnalyticsRoundedIcon sx={{ fontSize: 32 }} />,
    colorKey: "warning.main",
  },
  {
    title: "Voice Assistant",
    description: "Talk naturally with your AI productivity assistant.",
    icon: <KeyboardVoiceRoundedIcon sx={{ fontSize: 32 }} />,
    colorKey: "error.main",
  },
];

const Welcome = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ================= HIGH-END MESH BACKGROUND BLURS ================= */}
      <Box sx={{ position: "absolute", width: 600, height: 600, bgcolor: "primary.main", opacity: isDark ? 0.15 : 0.04, borderRadius: "50%", filter: "blur(140px)", top: -200, left: -150, pointerEvents: "none" }} />
      <Box sx={{ position: "absolute", width: 500, height: 500, bgcolor: "primary.dark", opacity: isDark ? 0.12 : 0.03, borderRadius: "50%", filter: "blur(140px)", top: "30%", right: -100, pointerEvents: "none" }} />
      <Box sx={{ position: "absolute", width: 600, height: 600, bgcolor: "secondary.main", opacity: isDark ? 0.08 : 0.02, borderRadius: "50%", filter: "blur(160px)", bottom: -200, left: "20%", pointerEvents: "none" }} />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        {/* ================= NAVBAR ================= */}
        {/* ✅ FIXED: Transferred the stack parameters to the theme-safe sx style wrapper block */}
        <Stack 
          direction="row" 
          py={3}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid",
            borderColor: "divider",
            backdropFilter: "blur(8px)",
          }}
        >
          <Typography
            variant="h5"
            fontWeight={800}
            sx={{
              background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.03em",
            }}
          >
            Deadline Guardian Pro
          </Typography>

          <Button
            onClick={() => navigate("/login")}
            sx={{
              textTransform: "none",
              fontWeight: 700,
              fontSize: "0.9rem",
              color: "primary.main",
              px: 3,
              py: 1,
              borderRadius: "20px",
              border: "1px solid",
              borderColor: (theme) => alpha(theme.palette.primary.main, 0.2),
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.02),
              transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
              "&:hover": { 
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                borderColor: "primary.main",
              }
            }}
          >
            Sign In
          </Button>
        </Stack>

        {/* ================= HERO SECTION ================= */}
        <HeroSection
          onGetStarted={() => navigate("/register")}
          onLogin={() => navigate("/login")}
        />

        {/* ================= FEATURES SECTION ================= */}
        <MotionBox
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          sx={{ mt: 14 }}
        >
          {/* ✅ FIXED: Handled layout alignment via theme-safe sx properties */}
          <Typography 
            variant="h4" 
            fontWeight={800} 
            mb={2}
            sx={{ 
              textAlign: "center",
              color: "text.primary",
              letterSpacing: "-0.02em",
              fontSize: { xs: "1.8rem", md: "2.5rem" }
            }}
          >
            Everything You Need To Stay Productive
          </Typography>
          {/* ✅ FIXED: Handled layout alignment via theme-safe sx properties */}
          <Typography 
            mb={8}
            sx={{ 
              textAlign: "center",
              color: "text.secondary",
              maxWidth: 600,
              mx: "auto",
              fontSize: "1.05rem",
              fontWeight: 500
            }}
          >
            Powerful AI-driven features designed to optimize workflow schedules and secure your timeline assets.
          </Typography>

          {/* Symmetrical desktop column matrix mapping */}
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              // ✅ FIXED: Removed the invalid boolean 'item' attribute prop to prevent console logging pollution
              <Grid xs={12} sm={6} md={3} key={index}>
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  color={feature.colorKey}
                />
              </Grid>
            ))}
          </Grid>
        </MotionBox>

        {/* ================= CALL TO ACTION (GLASSMORPHIC UPGRADE) ================= */}
        <MotionBox
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          sx={{
            mt: 16,
            mb: 10,
            p: { xs: 5, md: 8 },
            borderRadius: "32px",
            background: "linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(124, 58, 237, 0.05) 100%)",
            backdropFilter: "blur(16px)",
            border: "1px solid",
            borderColor: (theme) => theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.04)",
            position: "relative",
            overflow: "hidden",
            boxShadow: (theme) => theme.palette.mode === "dark" ? "0 30px 70px rgba(0, 0, 0, 0.5)" : "0 30px 70px rgba(15, 23, 42, 0.02)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: "-0.02em", mb: 2 }}>
            Secure Your Operational Deadlines Today
          </Typography>
          <Typography sx={{ color: "text.secondary", maxWidth: 500, mb: 4, fontWeight: 500 }}>
            Let AI handle the prioritization while you focus on execution.
          </Typography>
          <GradientButton onClick={() => navigate("/register")}>
            Get Started For Free
          </GradientButton>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default Welcome;
