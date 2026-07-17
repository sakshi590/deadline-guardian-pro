// src/pages/NotFound.jsx
import { Box, Button, Typography, alpha } from "@mui/material";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2.5,
        bgcolor: "background.default", // ✅ UPDATED: Smooth light / dark canvas fill context
        px: 3,
        textAlign: "center"
      }}
    >
      {/* ================= ERROR HEADER CODE ================= */}
      <Typography 
        variant="h1" // Upgraded scale for a prominent, clean visual anchor
        fontWeight={900}
        sx={{ 
          color: "primary.main", // ✅ UPDATED: Tracks your active signature purple token dynamically
          letterSpacing: "-0.04em",
          lineHeight: 1,
          // Premium subtle background text halo glow
          textShadow: (theme) => theme.palette.mode === "dark"
            ? `0 8px 40px ${alpha(theme.palette.primary.main, 0.2)}`
            : `0 8px 40px ${alpha(theme.palette.primary.main, 0.1)}`
        }}
      >
        404
      </Typography>

      {/* ================= STATUS LABELS ================= */}
      <Typography 
        variant="h5" 
        fontWeight={800} 
        sx={{ color: "text.primary", letterSpacing: "-0.01em" }} // ✅ UPDATED: Stark adaptive contrast text
      >
        Page Not Found
      </Typography>

      <Typography 
        variant="body2" 
        sx={{ color: "text.secondary", fontWeight: 500, maxWidth: "380px", mb: 1, lineHeight: 1.6 }}
      >
        The resource you are attempting to locate has been moved, re-indexed, or removed from active operational directories.
      </Typography>

      {/* ================= CAPSULE CTA TRIGGER BUTTON ================= */}
      <Button
        component={Link}
        to="/dashboard"
        variant="contained"
        disableElevation
        sx={{
          py: 1.2,
          px: 4,
          borderRadius: "24px", // ✅ UPDATED: Smooth pill capsule curve family look button alignment
          textTransform: "none",
          fontWeight: 700,
          fontSize: "0.9rem",
          bgcolor: "primary.main",
          color: "primary.contrastText",
          transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          "&:hover": {
            bgcolor: "primary.dark",
            transform: "translateY(-1px)",
            boxShadow: (theme) => `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`
          },
          "&:active": {
            transform: "translateY(0)"
          }
        }}
      >
        Go to Dashboard
      </Button>
    </Box>
  );
}

export default NotFound;
