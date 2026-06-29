import { Paper, Typography, Stack, Box } from "@mui/material";

const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  color,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        height: "100%",
        background:
          "linear-gradient(135deg,#ffffff,#f8fafc)",
        border: "1px solid",
        borderColor: "divider",
        transition: "0.3s",

        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 20px 45px rgba(0,0,0,.12)",
        },
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
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
            variant="body2"
            color="text.secondary"
          >
            {subtitle}
          </Typography>

        </Box>

        <Box
          sx={{
            width: 70,
            height: 70,
            borderRadius: "50%",
            bgcolor: color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            boxShadow: `0 10px 30px ${color}55`,
          }}
        >
          {icon}
        </Box>
      </Stack>
    </Paper>
  );
};

export default StatCard;