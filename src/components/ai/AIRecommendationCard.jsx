import {
  Paper,
  Typography,
  Stack,
  Avatar,
  Divider,
} from "@mui/material";

import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

const AIRecommendationCard = ({ suggestions = [] }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        mb={2}
      >
        <Avatar
          sx={{
            bgcolor: "#4F46E5",
          }}
        >
          <AutoAwesomeRoundedIcon />
        </Avatar>

        <Typography
          variant="h6"
          fontWeight={700}
        >
          AI Suggestions
        </Typography>
      </Stack>

      <Divider sx={{ mb: 2 }} />

      <Stack spacing={2}>
        {suggestions.length === 0 ? (
          <Typography color="text.secondary">
            No suggestions yet.
          </Typography>
        ) : (
          suggestions.map((item, index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                p: 2,
                bgcolor: "#EEF2FF",
                borderRadius: 2,
                borderLeft: "4px solid #4F46E5",
              }}
            >
              <Typography variant="body2">
                {item}
              </Typography>
            </Paper>
          ))
        )}
      </Stack>
    </Paper>
  );
};

export default AIRecommendationCard;