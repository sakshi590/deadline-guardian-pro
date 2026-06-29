// src/components/calendar/TaskDetailsDrawer.jsx

import {
  Drawer,
  Box,
  Typography,
  Chip,
  Divider,
  Stack,
  Button,
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

const priorityColors = {
  High: "error",
  Medium: "warning",
  Low: "success",
};

const TaskDetailsDrawer = ({
  open,
  task,
  onClose,
}) => {
  const {
    deleteTask,
    toggleComplete,
  } = useTasks();

  const {
    openTaskDialog,
  } = useUI();

  if (!task) return null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: {
            xs: "100%",
            sm: 420,
          },
          p: 3,
        },
      }}
    >
      <Typography
        variant="h5"
        fontWeight={700}
        gutterBottom
      >
        {task.title}
      </Typography>

      <Chip
        label={task.priority}
        color={
          priorityColors[task.priority] || "primary"
        }
        sx={{ mb: 3 }}
      />

      <Divider sx={{ mb: 3 }} />

      <Stack spacing={2}>

        <Box display="flex" gap={2}>
          <CategoryRoundedIcon color="primary" />
          <Typography>
            {task.category}
          </Typography>
        </Box>

        <Box display="flex" gap={2}>
          <CalendarMonthRoundedIcon color="primary" />
          <Typography>
            {dayjs(task.dueDate).format(
              "DD MMM YYYY"
            )}
          </Typography>
        </Box>

        <Box display="flex" gap={2}>
          <FlagRoundedIcon color="primary" />
          <Typography>
            {task.status}
          </Typography>
        </Box>

        <Box display="flex" gap={2}>
          <AccessTimeRoundedIcon color="primary" />
          <Typography>
            {task.estimatedHours || 1} Hours
          </Typography>
        </Box>

        <Box display="flex" gap={2}>
          <DescriptionRoundedIcon color="primary" />
          <Typography>
            {task.description || "No description"}
          </Typography>
        </Box>

      </Stack>

      <Divider sx={{ my: 3 }} />

      <Stack spacing={2}>

        <Button
          variant="contained"
          startIcon={<EditRoundedIcon />}
          onClick={() => {
            onClose();
            openTaskDialog(task);
          }}
        >
          Edit Task
        </Button>

        <Button
          variant="outlined"
          color="success"
          startIcon={<CheckCircleRoundedIcon />}
          onClick={() => {
            toggleComplete(task.id);
            onClose();
          }}
        >
          Mark Complete
        </Button>

        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteRoundedIcon />}
          onClick={() => {
            deleteTask(task.id);
            onClose();
          }}
        >
          Delete Task
        </Button>

      </Stack>
    </Drawer>
  );
};

export default TaskDetailsDrawer;