import {
  Paper,
  Typography,
  Stack,
  Avatar,
  Chip,
  Divider,
} from "@mui/material";

import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";

const UpcomingDeadlines = ({ tasks }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        background:
          "linear-gradient(180deg,#ffffff,#fafbff)",
        height: "100%",
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        mb={3}
      >
        <Avatar
          sx={{
            bgcolor: "#EF4444",
            width: 52,
            height: 52,
          }}
        >
          <CalendarMonthRoundedIcon />
        </Avatar>

        <Typography
          variant="h5"
          fontWeight={700}
        >
          Upcoming Deadlines
        </Typography>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      <Stack spacing={2}>
        {tasks.length === 0 && (
          <Typography
            color="text.secondary"
          >
            No upcoming deadlines 🎉
          </Typography>
        )}

        {tasks.map((task) => (
          <Paper
            key={task.id}
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 3,
              bgcolor: "#F8FAFC",
              border: "1px solid #E5E7EB",
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack spacing={0.5}>
                <Typography
                  fontWeight={600}
                >
                  {task.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {task.dueDate}
                </Typography>
              </Stack>

              <Chip
                label={task.priority}
                color={
                  task.priority === "High"
                    ? "error"
                    : task.priority === "Medium"
                    ? "warning"
                    : "success"
                }
              />
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Paper>
  );
};

export default UpcomingDeadlines;