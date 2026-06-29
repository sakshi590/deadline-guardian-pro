import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";

function StatCard({ title, value, color, icon }) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "16px",
        border: "1px solid #e2e8f0",
        height: "100%",
        bgcolor: "#ffffff"
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <div style={{ minWidth: 0 }}>
            <Typography fontSize="14px" fontWeight={600} color="#64748b" noWrap>
              {title}
            </Typography>

            <Typography variant="h4" fontWeight={700} color="#0f172a" sx={{ mt: 1, letterSpacing: "-0.5px" }}>
              {value}
            </Typography>
          </div>

          <Avatar
            sx={{
              bgcolor: color ? `${color}15` : "rgba(37, 99, 235, 0.08)", // Auto adds subtle translucent overlay tint fallback
              color: color || "#2563eb",
              width: 44,
              height: 44,
              borderRadius: "12px"
            }}
          >
            {icon}
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default StatCard;
