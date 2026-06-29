// src/components/dashboard/UpcomingTasks.jsx

import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  Chip,
} from "@mui/material";

import { useTasks } from "../../context/TaskContext";

const UpcomingTasks = () => {
  const { tasks } = useTasks();

  const today = new Date().toISOString().split("T")[0];

  const upcoming = tasks
    .filter((t) => t.dueDate && t.status !== "Completed")
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5);

  const isToday = (date) => date === today;

  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 4,
        height: "100%",
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight={700} mb={3}>
          Upcoming Tasks
        </Typography>

        {upcoming.length === 0 ? (
          <Typography color="text.secondary">
            No upcoming tasks 🎉
          </Typography>
        ) : (
          <Stack spacing={2}>
            {upcoming.map((task) => (
              <Box
                key={task.id}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  bgcolor: "background.default",
                  border: "1px solid #e5e7eb",
                  transition: "0.2s",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: 2,
                  },
                }}
              >
                {/* Title + Priority */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography fontWeight={600}>
                    {task.title}
                  </Typography>

                  <Chip
                    label={task.priority}
                    size="small"
                    color={
                      task.priority === "High"
                        ? "error"
                        : task.priority === "Medium"
                        ? "warning"
                        : "success"
                    }
                  />
                </Stack>

                {/* Date */}
                <Typography
                  variant="body2"
                  color={
                    isToday(task.dueDate)
                      ? "error"
                      : "text.secondary"
                  }
                  mt={1}
                >
                  {isToday(task.dueDate)
                    ? "Due Today"
                    : `Due: ${task.dueDate}`}
                </Typography>
              </Box>
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingTasks;