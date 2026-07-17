// src/components/calendar/TaskDetailsDrawer.jsx
import {
  Drawer,
  Box,
  Typography,
  Chip,
  Divider,
  Stack,
  Button,
  alpha, // ✅ FIXED: Imported alpha helper for theme-resilient focus highlights
} from "@mui/material";

import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import dayjs from "dayjs";

import { useTasks } from "../../context/TaskContext";
import { useUI } from "../../context/UIContext";

const priorityConfig = {
  High: "error",
  Medium: "warning",
  Low: "success",
};

const TaskDetailsDrawer = ({ open, task, onClose }) => {
  const { deleteTask, toggleComplete } = useTasks();
  const { openTaskDialog } = useUI();

  if (!task) return null;

  const priorityKey = priorityConfig[task.priority] || "primary";

  // Reusable styling for meta row list icon wrappers
  const metaIconBoxStyles = (key) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    bgcolor: (theme) => alpha(theme.palette[key].main, 0.06),
    color: `${key}.main`,
    width: 36,
    height: 36,
    borderRadius: "10px",
    border: "1px solid",
    borderColor: (theme) => alpha(theme.palette[key].main, 0.15),
  });

  const baseButtonStyles = {
    py: 1.3,
    borderRadius: "24px", // ✅ UPDATED: Smooth pill curve look across action flows
    textTransform: "none",
    fontWeight: 700,
    fontSize: "0.9rem",
    boxShadow: "none",
    transition: "all 0.2s ease-in-out",
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      disableScrollLock
      PaperProps={{
        sx: {
          width: {
            xs: "100%",
            sm: 420,
          },
          p: 3.5,
          bgcolor: "background.paper", // ✅ UPDATED: Responsive background canvas surface
          backgroundImage: "none",
          borderLeft: "1px solid",
          borderColor: "divider", // Theme adaptive tracking boundary trace line
        },
      }}
    >
      {/* ================= HEADER SECTOR ================= */}
      <Typography
        variant="h5"
        fontWeight={800} // Upgraded weight for premium brand harmony profile
        sx={{ color: "text.primary", letterSpacing: "-0.02em", mb: 1.5, pr: 2 }}
      >
        {task.title}
      </Typography>

      {/* ✅ UPDATED: Re-mapped priority chips using soft alpha tints instead of heavy solid block colors */}
      <Box sx={{ mb: 3.5 }}>
        <Chip
          label={task.priority}
          size="small"
          variant="outlined"
          sx={{
            fontWeight: 700,
            fontSize: "0.7rem",
            textTransform: "uppercase",
            letterSpacing: "0.03em",
            borderRadius: "8px",
            bgcolor: (theme) => alpha(theme.palette[priorityKey].main, 0.08),
            color: `${priorityKey}.main`,
            borderColor: (theme) => alpha(theme.palette[priorityKey].main, 0.2),
            borderWidth: "1px !important",
            "& .MuiChip-label": { px: 1.2 }
          }}
        />
      </Box>

      <Divider sx={{ mb: 3.5, borderColor: "divider" }} />

      {/* ================= DATA GRID LIST ================= */}
      <Stack spacing={2.5}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box sx={metaIconBoxStyles("primary")}><CategoryRoundedIcon sx={{ fontSize: 18 }} /></Box>
          <Box>
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, textTransform: "uppercase", display: "block" }}>Category</Typography>
            <Typography variant="body2" sx={{ color: "text.primary", fontWeight: 600, mt: 0.25 }}>{task.category}</Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          <Box sx={metaIconBoxStyles("primary")}><CalendarMonthRoundedIcon sx={{ fontSize: 18 }} /></Box>
          <Box>
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, textTransform: "uppercase", display: "block" }}>Due Date</Typography>
            <Typography variant="body2" sx={{ color: "text.primary", fontWeight: 600, mt: 0.25 }}>{dayjs(task.dueDate).format("DD MMM YYYY")}</Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          <Box sx={metaIconBoxStyles("warning")}><FlagRoundedIcon sx={{ fontSize: 18 }} /></Box>
          <Box>
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, textTransform: "uppercase", display: "block" }}>Current Status</Typography>
            <Typography variant="body2" sx={{ color: "text.primary", fontWeight: 600, mt: 0.25 }}>{task.status}</Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          <Box sx={metaIconBoxStyles("success")}><AccessTimeRoundedIcon sx={{ fontSize: 18 }} /></Box>
          <Box>
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, textTransform: "uppercase", display: "block" }}>Time Allocation</Typography>
            <Typography variant="body2" sx={{ color: "text.primary", fontWeight: 600, mt: 0.25 }}>{task.estimatedHours || 1} Operational Hours</Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="flex-start">
          <Box sx={metaIconBoxStyles("primary")}><DescriptionRoundedIcon sx={{ fontSize: 18 }} /></Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, textTransform: "uppercase", display: "block" }}>Task Summary Notes</Typography>
            <Typography variant="body2" sx={{ color: "text.primary", fontWeight: 500, mt: 0.5, lineHeight: 1.6 }}>
              {task.description || "No specific detailed description provided for this operation."}
            </Typography>
          </Box>
        </Stack>
      </Stack>

      <Divider sx={{ my: 4, borderColor: "divider" }} />

      {/* ================= CAPSULE CALL TO ACTION FOOTER BUTTONS ================= */}
      <Stack spacing={2} mt="auto">
        <Button
          variant="contained"
          startIcon={<EditRoundedIcon sx={{ fontSize: 18 }} />}
          onClick={() => {
            onClose();
            openTaskDialog(task);
          }}
          sx={{
            ...baseButtonStyles,
            bgcolor: "primary.main",
            color: "primary.contrastText",
            "&:hover": { bgcolor: "primary.dark" }
          }}
        >
          Edit Task
        </Button>

        <Button
          variant="outlined"
          color="success"
          startIcon={<CheckCircleRoundedIcon sx={{ fontSize: 18 }} />}
          onClick={() => {
            toggleComplete(task.id);
            onClose();
          }}
          sx={{
            ...baseButtonStyles,
            color: "success.main",
            borderColor: "success.main",
            borderWidth: "1.5px",
            "&:hover": { bgcolor: (theme) => alpha(theme.palette.success.main, 0.04), borderColor: "success.dark", borderWidth: "1.5px" }
          }}
        >
          {task.completed ? "Mark Incomplete" : "Mark Complete"}
        </Button>

        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteRoundedIcon sx={{ fontSize: 18 }} />}
          onClick={() => {
            deleteTask(task.id);
            onClose();
          }}
          sx={{
            ...baseButtonStyles,
            color: "error.main",
            borderColor: "error.main",
            borderWidth: "1.5px",
            "&:hover": { bgcolor: (theme) => alpha(theme.palette.error.main, 0.04), borderColor: "error.dark", borderWidth: "1.5px" }
          }}
        >
          Delete Task Permanent
        </Button>
      </Stack>
    </Drawer>
  );
};

export default TaskDetailsDrawer;
