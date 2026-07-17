// src/components/calendar/TaskChip.jsx
import { Chip, alpha } from "@mui/material";

function TaskChip({ priority }) {
  let colorToken = "default";

  switch (priority) {
    case "High":
      colorToken = "error";
      break;

    case "Medium":
      colorToken = "warning";
      break;

    case "Low":
      colorToken = "success";
      break;

    default:
      colorToken = "default";
  }

  // Handle standard neutral token routing gracefully
  if (colorToken === "default") {
    return <Chip label={priority} size="small" sx={{ fontWeight: 700 }} />;
  }

  return (
    <Chip
      label={priority}
      size="small"
      variant="outlined" // Upgraded to outlined for clean SaaS layout uniformity
      sx={{
        fontWeight: 700,
        fontSize: "0.7rem",
        textTransform: "uppercase",
        letterSpacing: "0.03em",
        borderRadius: "8px", // Standardised to match the modern dashboard family curvature
        
        // ✅ UPDATED: Background tint adaptively softens in dark mode instead of staying blindingly bright light-mode white
        bgcolor: (theme) => alpha(theme.palette[colorToken].main, 0.06),
        
        // ✅ UPDATED: Color tokens dynamically scale to meet active high-contrast brightness accessibility lines
        color: `${colorToken}.main`,
        borderColor: (theme) => alpha(theme.palette[colorToken].main, 0.2),
        borderWidth: "1px !important",
        
        "& .MuiChip-label": {
          px: 1.2,
        },
      }}
    />
  );
}

export default TaskChip;
