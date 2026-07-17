// src/components/auth/AuthLayout.jsx
import { Box, Container, Paper, alpha } from "@mui/material";
import { useTheme } from "@mui/material/styles"; // ✅ FIXED: Access active design variables directly
import { motion } from "framer-motion";

const MotionPaper = motion(Paper);

const AuthLayout = ({ children }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default", // ✅ UPDATED: Dynamic background tracking instead of hardcoded dark hex
        position: "relative",
        overflow: "hidden",
        p: 2,
        width: "100%",
        flex: 1
      }}
    >
      {/* ================= BACKGROUND GLOW SPHERES (THEME AWARE) ================= */}
      <Box 
        sx={{ 
          position: "absolute", 
          width: 350, 
          height: 350, 
          bgcolor: "primary.main", 
          opacity: isDark ? 0.12 : 0.03, // ✅ UPDATED: Prevent light mode contrast bleaching
          borderRadius: "50%", 
          filter: "blur(100px)", 
          top: "15%", 
          left: "15%", 
          pointerEvents: "none" 
        }} 
      />
      <Box 
        sx={{ 
          position: "absolute", 
          width: 350, 
          height: 350, 
          bgcolor: "secondary.main", 
          opacity: isDark ? 0.12 : 0.02, 
          borderRadius: "50%", 
          filter: "blur(100px)", 
          bottom: "15%", 
          right: "15%", 
          pointerEvents: "none" 
        }} 
      />

      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <MotionPaper
          elevation={0}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          sx={{
            p: { xs: 4, md: 5 },
            borderRadius: "24px", // Matches your exact capsule curve layout family
            // ✅ UPDATED: Premium dual-mode responsive layout backdrop configuration panel surface
            background: (theme) => theme.palette.mode === "dark"
              ? "linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)"
              : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.default, 0.6)} 100%)`,
            backdropFilter: "blur(20px)",
            border: "1px solid",
            borderColor: (theme) => theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.08)" : "divider",
            boxShadow: (theme) => theme.palette.mode === "dark"
              ? "0 24px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
              : `0 24px 60px ${alpha(theme.palette.text.primary, 0.03)}`,
          }}
        >
          {children}
        </MotionPaper>
      </Container>
    </Box>
  );
};

export default AuthLayout;
