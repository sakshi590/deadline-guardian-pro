// src/components/common/EmptyState.jsx
import {
  Box,
  Typography,
  alpha,
} from "@mui/material";

import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";

const EmptyState = ({
  title = "Nothing Here",
  description = "No data available.",
}) => {
  return (
    <Box
      sx={{
        py: { xs: 6, md: 8 },
        px: 3,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        minHeight: 280,
      }}
    >
      {/* ================= REFINED DYNAMIC CONTAINER SQUIRCLE ================= */}
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: "24px", // Matches your exact capsule curve layout family curvature
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 3,
          // ✅ UPDATED: Dynamic alpha background tint overrides light-mode bleeding anomalies
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          color: "primary.main",
          border: "1px solid",
          borderColor: (theme) => alpha(theme.palette.primary.main, 0.16),
          boxShadow: (theme) => theme.palette.mode === "dark"
            ? `0 8px 32px ${alpha(theme.palette.primary.main, 0.05)}`
            : "none",
        }}
      >
        <AssignmentTurnedInRoundedIcon
          sx={{
            fontSize: 36, // Balanced vector sizing inside squircle limits
            color: "primary.main",
          }}
        />
      </Box>

      {/* ================= STATUS TEXT BLOCKS ================= */}
      <Typography
        variant="subtitle1"
        fontWeight={800} // Upgraded weight for premium brand harmony profile
        sx={{ 
          color: "text.primary", // ✅ UPDATED: Stark adaptive title contrast text
          letterSpacing: "-0.015em",
          lineHeight: 1.3
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: "text.secondary", // ✅ UPDATED: High contrast secondary text node tracking 
          mt: 1.25,
          maxWidth: 360,
          mx: "auto",
          fontWeight: 500,
          lineHeight: 1.6
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default EmptyState;
