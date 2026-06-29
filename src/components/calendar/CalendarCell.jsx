import {
  Badge,
  Box,
  Paper,
  Typography,
} from "@mui/material";

import { useTasks } from "../../context/TaskContext";
import useCalendar from "./hooks/useCalendar";

function CalendarCell({ date }) {
  const { tasks } = useTasks();

  const {
    today,
    selectedDate,
    setSelectedDate,
  } = useCalendar();

  if (!date) {
    return (
      <Paper
        elevation={0}
        sx={{
          height: 90,
          bgcolor: "transparent",
        }}
      />
    );
  }

  const dayTasks = tasks.filter((task) => {
    if (!task.dueDate) return false;

    return (
      new Date(task.dueDate).toDateString() ===
      date.toDateString()
    );
  });

  const isToday =
    date.toDateString() === today.toDateString();

  const isSelected =
    date.toDateString() ===
    selectedDate.toDateString();

  return (
    <Paper
      elevation={isSelected ? 6 : 1}
      onClick={() => setSelectedDate(date)}
      sx={{
        cursor: "pointer",
        height: 90,
        p: 1,
        borderRadius: 3,

        bgcolor: isToday
          ? "primary.light"
          : "background.paper",

        border: isSelected
          ? "2px solid"
          : "1px solid transparent",

        borderColor: isSelected
          ? "primary.main"
          : "transparent",

        transition: "0.25s",

        "&:hover": {
          transform: "scale(1.03)",
        },
      }}
    >
      <Typography
        fontWeight={700}
      >
        {date.getDate()}
      </Typography>

      <Box mt={1}>
        <Badge
          badgeContent={dayTasks.length}
          color="primary"
        />
      </Box>

      <Box
        mt={2}
        display="flex"
        gap={0.5}
        flexWrap="wrap"
      >
        {dayTasks.slice(0, 3).map((task) => (
          <Box
            key={task.id}
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",

              bgcolor:
                task.priority === "High"
                  ? "error.main"
                  : task.priority === "Medium"
                  ? "warning.main"
                  : "success.main",
            }}
          />
        ))}
      </Box>

    </Paper>
  );
}

export default CalendarCell;