import {
  Paper,
  Typography,
  Stack,
  Avatar,
  Divider,
} from "@mui/material";

import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

const AIInsights = ({ insights }) => {
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
            bgcolor: "#4F46E5",
            width: 52,
            height: 52,
          }}
        >
          <AutoAwesomeRoundedIcon />
        </Avatar>

        <Typography
          variant="h5"
          fontWeight={700}
        >
          AI Insights
        </Typography>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      <Stack spacing={2}>
        {insights.map((item, index) => (
          <Paper
            key={index}
            elevation={0}
            sx={{
              p: 2,
              bgcolor: "#EEF2FF",
              borderLeft: "5px solid #4F46E5",
              borderRadius: 3,
            }}
          >
            <Typography>
              {item}
            </Typography>
          </Paper>
        ))}
      </Stack>
    </Paper>
  );
};

export default AIInsights;