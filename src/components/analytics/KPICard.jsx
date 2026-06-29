import { Paper, Typography, Stack, Box } from "@mui/material";

const KPICard = ({
  title,
  value,
  subtitle,
  icon,
  color,
}) => {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 4,
        height: "100%",
        transition: "0.3s",
        borderLeft: `6px solid ${color}`,
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: 8,
        },
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
      >
        <Box>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {title}
          </Typography>

          <Typography
            variant="h3"
            fontWeight={700}
            mt={1}
          >
            {value}
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
          >
            {subtitle}
          </Typography>
        </Box>

        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            bgcolor: `${color}15`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color,
          }}
        >
          {icon}
        </Box>
      </Stack>
    </Paper>
  );
};

export default KPICard;