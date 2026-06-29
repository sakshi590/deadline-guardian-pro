// src/components/ai/AIActionCard.jsx

import {
  Card,
  CardContent,
  Typography,
  Stack,
  Avatar,
  Button,
} from "@mui/material";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

const AIActionCard = ({ action, onClick, disabled }) => {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        transition: "0.3s",
        opacity: disabled ? 0.7 : 1,
        pointerEvents: disabled ? "none" : "auto",

        "&:hover": {
          transform: disabled ? "none" : "translateY(-6px)",
          boxShadow: disabled ? "none" : "0 12px 35px rgba(0,0,0,0.12)",
        },
      }}
    >
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            sx={{
              bgcolor: action.color,
              width: 56,
              height: 56,
            }}
          >
            {action.icon}
          </Avatar>

          <Stack flex={1}>
            <Typography variant="h6" fontWeight={700}>
              {action.title}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {action.description}
            </Typography>
          </Stack>
        </Stack>

        <Button
          onClick={() => onClick(action.id)}
          disabled={disabled}
          fullWidth
          variant="contained"
          endIcon={<ArrowForwardRoundedIcon />}
          sx={{
            mt: 3,
            borderRadius: 3,
            textTransform: "none",
            fontWeight: 600,
            py: 1.2,
            bgcolor: action.color,

            "&:hover": {
              bgcolor: action.color,
              opacity: 0.9,
            },
          }}
        >
          {disabled ? "Thinking..." : "Run AI"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AIActionCard;
