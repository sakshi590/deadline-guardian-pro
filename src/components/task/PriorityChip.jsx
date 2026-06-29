// src/components/task/PriorityChip.jsx

import { Chip } from "@mui/material";

const colors = {
  High: {
    bg: "#FEE2E2",
    color: "#DC2626",
  },
  Medium: {
    bg: "#FEF3C7",
    color: "#D97706",
  },
  Low: {
    bg: "#DCFCE7",
    color: "#16A34A",
  },
};

const PriorityChip = ({ priority }) => {
  const style =
    colors[priority] || colors.Medium;

  return (
    <Chip
      label={priority}
      size="small"
      sx={{
        bgcolor: style.bg,
        color: style.color,
        fontWeight: 700,
        borderRadius: 2,
      }}
    />
  );
};

export default PriorityChip;