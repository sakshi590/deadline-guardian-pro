// src/components/common/EmptyState.jsx

import {
  Box,
  Typography,
} from "@mui/material";

import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";

const EmptyState = ({
  title = "Nothing Here",
  description = "No data available.",
}) => {
  return (
    <Box
      sx={{
        py: 8,
        textAlign: "center",
      }}
    >
      <AssignmentTurnedInRoundedIcon
        sx={{
          fontSize: 80,
          color: "primary.main",
          mb: 2,
        }}
      />

      <Typography
        variant="h5"
        fontWeight={700}
      >
        {title}
      </Typography>

      <Typography
        color="text.secondary"
        sx={{
          mt: 1,
          maxWidth: 400,
          mx: "auto",
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default EmptyState;