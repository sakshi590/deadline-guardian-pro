import { Card, CardContent, Typography } from "@mui/material";

function DashboardCard({ title, value, color }) {
  return (
    <Card
      sx={{
        borderLeft: `5px solid ${color}`,
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Typography color="text.secondary" gutterBottom>
          {title}
        </Typography>

        <Typography variant="h4" fontWeight="bold">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default DashboardCard;