import { Paper, Typography } from "@mui/material";

const ChartCard = ({
  title,
  children,
}) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 4,
        height: "100%",
      }}
    >
      <Typography
        variant="h6"
        fontWeight={700}
        mb={3}
      >
        {title}
      </Typography>

      {children}
    </Paper>
  );
};

export default ChartCard;