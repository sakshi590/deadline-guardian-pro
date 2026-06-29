// src/components/dashboard/CountdownCard.jsx

import { useMemo } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
  LinearProgress,
} from "@mui/material";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import { useTasks } from "../../context/TaskContext";

const CountdownCard = () => {
  const { tasks } = useTasks();

  const nextTask = useMemo(() => {
    const pending = tasks
      .filter(
        (task) =>
          !task.completed &&
          task.dueDate
      )
      .sort(
        (a, b) =>
          new Date(a.dueDate) -
          new Date(b.dueDate)
      );

    return pending[0];
  }, [tasks]);

  if (!nextTask) {
    return (
      <Card
        sx={{
          borderRadius: 4,
          height: "100%",
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            fontWeight={700}
            mb={3}
          >
            Upcoming Deadline
          </Typography>

          <Typography
            color="text.secondary"
            align="center"
            mt={6}
          >
            🎉 No upcoming deadlines
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const now = new Date();

  const due = new Date(nextTask.dueDate);

  const diff = due - now;

  const overdue = diff < 0;

  const days = Math.abs(
    Math.floor(diff / (1000 * 60 * 60 * 24))
  );

  const hours = Math.abs(
    Math.floor(
      (diff % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    )
  );

  const progress = overdue
    ? 100
    : Math.max(5, 100 - days * 10);

  return (
    <Card
      sx={{
        borderRadius: 4,
        height: "100%",
        background:
          "linear-gradient(135deg,#6366F1,#8B5CF6)",
        color: "#fff",
      }}
    >
      <CardContent>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="h6"
            fontWeight={700}
          >
            Next Deadline
          </Typography>

          <AccessTimeIcon />
        </Stack>

        <Typography
          variant="h5"
          mt={4}
          fontWeight={700}
        >
          {nextTask.title}
        </Typography>

        <Typography
          sx={{
            opacity: .9,
            mt: 1,
          }}
        >
          {nextTask.category}
        </Typography>

        <Box mt={4}>

          <Typography>
            {overdue
              ? "Task is overdue"
              : `${days} Days ${hours} Hours Left`}
          </Typography>

          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              mt: 2,
              height: 10,
              borderRadius: 10,
              bgcolor: "rgba(255,255,255,.25)",
            }}
          />

        </Box>

        <Stack
          direction="row"
          spacing={1}
          mt={4}
          flexWrap="wrap"
        >

          <Chip
            icon={<EventIcon />}
            label={new Date(
              nextTask.dueDate
            ).toLocaleDateString()}
          />

          <Chip
            color={
              overdue
                ? "error"
                : "success"
            }
            icon={<WarningAmberIcon />}
            label={
              overdue
                ? "Overdue"
                : nextTask.priority
            }
          />

        </Stack>

      </CardContent>
    </Card>
  );
};

export default CountdownCard;