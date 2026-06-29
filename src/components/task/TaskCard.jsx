import {
  Card,
  CardContent,
  Typography,
  Stack,
  IconButton,
  Checkbox,
  Box,
} from "@mui/material";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";

import PriorityChip from "./PriorityChip";

import { useTasks } from "../../context/TaskContext";
import { useUI } from "../../context/UIContext";

const TaskCard = ({ task }) => {
  const { deleteTask, toggleComplete } = useTasks();
  const { openTaskDialog } = useUI();

  return (
    <Card
      onClick={() => toggleComplete(task.id)} // ✅ CLICK ANYWHERE
      elevation={3}
      sx={{
        borderRadius: 4,
        transition: ".25s",
        cursor: "pointer",

        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 8,
        },
      }}
    >
      <CardContent onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Checkbox
            checked={task.completed}
            onChange={() => toggleComplete(task.id)}
          />

          <PriorityChip priority={task.priority} />
        </Stack>

        {/* TITLE */}
        <Typography
          variant="h6"
          fontWeight={700}
          mt={1}
          sx={{
            textDecoration: task.completed
              ? "line-through"
              : "none",
            opacity: task.completed ? 0.6 : 1,
          }}
        >
          {task.title}
        </Typography>

        {/* DESCRIPTION */}
        <Typography
          color="text.secondary"
          mt={1}
          sx={{
            opacity: task.completed ? 0.6 : 1,
          }}
        >
          {task.description}
        </Typography>

        {/* DATE */}
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          mt={3}
        >
          <CalendarMonthRoundedIcon fontSize="small" />

          <Typography variant="body2">
            {task.dueDate}
          </Typography>
        </Stack>

        <Box mt={3} />

        {/* ACTIONS */}
        <Stack
          direction="row"
          justifyContent="flex-end"
          spacing={1}
        >
          <IconButton
            color="primary"
            onClick={() => openTaskDialog(task)}
          >
            <EditRoundedIcon />
          </IconButton>

          <IconButton
            color="error"
            onClick={() => deleteTask(task.id)}
          >
            <DeleteRoundedIcon />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TaskCard;