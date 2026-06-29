import { Chip } from "@mui/material";

function TaskChip({ priority }) {
  let color = "default";

  switch (priority) {
    case "High":
      color = "error";
      break;

    case "Medium":
      color = "warning";
      break;

    case "Low":
      color = "success";
      break;

    default:
      color = "default";
  }

  return (
    <Chip
      label={priority}
      color={color}
      size="small"
    />
  );
}

export default TaskChip;