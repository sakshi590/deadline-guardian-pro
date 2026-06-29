// src/components/dashboard/ProgressSection.jsx

import { Card, CardContent, Typography, Box, Stack } from "@mui/material";

import { useTasks } from "../../context/TaskContext";

const ProgressSection = () => {
  const { tasks } = useTasks();

  const total = tasks.length;

  const completed = tasks.filter(
    (t) => t.status === "Completed"
  ).length;

  const progress =
    total === 0 ? 0 : Math.round((completed / total) * 100);

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
          Productivity Progress
        </Typography>

        <Stack
          alignItems="center"
          justifyContent="center"
          spacing={2}
        >
          {/* Circular Progress */}
          <Box
            sx={{
              width: 140,
              height: 140,
              borderRadius: "50%",
              background: `conic-gradient(
                #22c55e ${progress * 3.6}deg,
                #e5e7eb 0deg
              )`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Box
              sx={{
                width: 110,
                height: 110,
                borderRadius: "50%",
                bgcolor: "background.paper",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Typography variant="h5" fontWeight={700}>
                {progress}%
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
              >
                Completed
              </Typography>
            </Box>
          </Box>

          {/* Stats */}
          <Stack direction="row" spacing={3} mt={2}>
            <Box textAlign="center">
              <Typography fontWeight={700}>
                {completed}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Done
              </Typography>
            </Box>

            <Box textAlign="center">
              <Typography fontWeight={700}>
                {total - completed}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Remaining
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProgressSection;