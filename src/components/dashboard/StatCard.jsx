// src/components/dashboard/StatCard.jsx
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Stack,
  Box,
  alpha, // ✅ UPDATED: Imported alpha helper for theme-resilient translucent badge backgrounds
} from "@mui/material";

function StatCard({ title, value, color, icon }) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "20px", 
        border: "1px solid",
        borderColor: "divider", // ✅ UPDATED: Responsive system layout border lines
        bgcolor: "background.paper", // ✅ UPDATED: Dynamic paper card surface backing
        height: "100%",
        transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        "&:hover": {
          transform: "translateY(-3px)",
          borderColor: (theme) => alpha(theme.palette.text.primary, 0.2), // Contextual highlight line on hover
          boxShadow: (theme) => theme.palette.mode === "dark" ? "0 8px 24px rgba(0,0,0,0.4)" : "0 8px 24px rgba(15, 23, 42, 0.03)",
        }
      }}
    >
      <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Box style={{ minWidth: 0 }}>
            {/* Subsection Header Label */}
            <Typography 
              noWrap
              variant="caption"
              sx={{ 
                color: "text.secondary", // ✅ UPDATED: Fluid label color token
                fontWeight: 700, 
                textTransform: "uppercase", 
                letterSpacing: "0.05em",
                fontSize: "0.725rem" 
              }}
            >
              {title}
            </Typography>

            {/* Core Value Metric */}
            <Typography 
              variant="h4" 
              fontWeight={800} 
              sx={{ 
                mt: 0.5, 
                color: "text.primary", // ✅ UPDATED: Stark adaptive title contrast text
                letterSpacing: "-0.02em" 
              }}
            >
              {value}
            </Typography>
          </Box>

          {/* ================= REFINED DYNAMIC CONTAINER BADGE ================= */}
          <Avatar
            sx={{
              // ✅ UPDATED: Safely extracts color properties to dynamically build non-bleeding background tones
              bgcolor: (theme) => {
                if (!color) return alpha(theme.palette.primary.main, 0.08);
                if (color.includes('.')) {
                  const [p, s] = color.split('.');
                  return alpha(theme.palette[p][s], 0.08);
                }
                return alpha(color, 0.08);
              },
              color: color || "primary.main",
              width: 40,
              height: 40,
              borderRadius: "10px",
              border: "1px solid",
              borderColor: (theme) => {
                if (!color) return alpha(theme.palette.primary.main, 0.15);
                if (color.includes('.')) {
                  const [p, s] = color.split('.');
                  return alpha(theme.palette[p][s], 0.15);
                }
                return alpha(color, 0.15);
              },
              boxShadow: "none",
              "& .MuiSvgIcon-root": { fontSize: 20 }
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
