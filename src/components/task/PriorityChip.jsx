// src/components/task/PriorityChip.jsx
import { Chip, alpha } from "@mui/material";

const PriorityChip = ({ priority }) => {
  // Map raw string labels to system semantic theme palette keys
  const config = {
    High: "error",
    Medium: "warning",
    Low: "success",
  }[priority] || "warning";

  return (
    <Chip
      label={priority}
      size="small"
      sx={{
        fontWeight: 700,
        fontSize: "0.7rem",
        textTransform: "uppercase",
        letterSpacing: "0.03em",
        borderRadius: "8px", // Standardised to match the modern dashboard family curvature
        
        // ✅ UPDATED: Background tint adaptively softens in dark mode instead of staying blindingly bright light-mode white
        bgcolor: (theme) => alpha(theme.palette[config].main, 0.08),
        
        // ✅ FIXED: Standardised key evaluation mapping to point safely into theme variables without breaking string templates
        color: (theme) => theme.palette[config].main,
        
        // Seamless micro-border edge framing trace line
        border: "1px solid",
        borderColor: (theme) => alpha(theme.palette[config].main, 0.16),
        
        "& .MuiChip-label": {
          px: 1.2,
        },
      }}
    />
  );
};

export default PriorityChip;
