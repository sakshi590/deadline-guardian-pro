import {
  Paper,
  Typography,
  Stack,
  Avatar,
  Chip,
} from "@mui/material";

import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";

const AIHeader = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        mb: 3,
        borderRadius: 5,
        background:
          "linear-gradient(135deg,#4F46E5 0%,#7C3AED 100%)",
        color: "#fff",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Stack
        direction="row"
        spacing={3}
        alignItems="center"
      >
        <Avatar
          sx={{
            bgcolor: "#fff",
            color: "#4F46E5",
            width: 72,
            height: 72,
          }}
        >
          <PsychologyRoundedIcon
            sx={{ fontSize: 40 }}
          />
        </Avatar>

        <Stack spacing={1}>

          <Typography
            variant="h3"
            fontWeight={800}
          >
            Deadline Guardian AI
          </Typography>

          <Typography
            sx={{
              opacity: .9,
              maxWidth: 650,
            }}
          >
            Your intelligent productivity assistant.
            Analyze tasks, generate schedules,
            predict deadline risks and boost
            productivity using AI.
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            mt={1}
          >
            <Chip
              label="Gemini AI"
              sx={{
                bgcolor: "#ffffff22",
                color: "#fff",
              }}
            />

            <Chip
              label="Task Analysis"
              sx={{
                bgcolor: "#ffffff22",
                color: "#fff",
              }}
            />

            <Chip
              label="Smart Planner"
              sx={{
                bgcolor: "#ffffff22",
                color: "#fff",
              }}
            />

            <Chip
              label="Risk Detection"
              sx={{
                bgcolor: "#ffffff22",
                color: "#fff",
              }}
            />
          </Stack>

        </Stack>

      </Stack>
    </Paper>
  );
};

export default AIHeader;