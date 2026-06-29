// src/components/dashboard/ActivityTimeline.jsx

import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  Chip,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";

import { useTasks } from "../../context/TaskContext";

const ActivityTimeline = () => {
  const { tasks } = useTasks();

  // Fake activity based on tasks (until we add real logs later)
  const activities = tasks
    .slice(-6)
    .reverse()
    .map((task) => ({
      id: task.id,
      title: task.title,
      type: task.status === "Completed" ? "completed" : "created",
      time: task.updatedAt || task.createdAt || "Now",
    }));

  const getIcon = (type) => {
    switch (type) {
      case "completed":
        return <CheckCircleIcon color="success" />;
      case "created":
        return <AddCircleIcon color="primary" />;
      case "updated":
        return <EditIcon color="warning" />;
      default:
        return <AddCircleIcon />;
    }
  };

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
          Activity Timeline
        </Typography>

        {activities.length === 0 ? (
          <Typography color="text.secondary">
            No recent activity yet
          </Typography>
        ) : (
          <Stack spacing={2}>
            {activities.map((act) => (
              <Box
                key={act.id}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 2,
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
                {/* Icon */}
                <Box>{getIcon(act.type)}</Box>

                {/* Content */}
                <Box flex={1}>
                  <Typography fontWeight={600}>
                    {act.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {act.type === "completed"
                      ? "Task completed"
                      : "Task created"}
                  </Typography>
                </Box>

                {/* Status Chip */}
                <Chip
                  label={act.type}
                  size="small"
                  color={
                    act.type === "completed"
                      ? "success"
                      : "primary"
                  }
                />
              </Box>
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityTimeline;