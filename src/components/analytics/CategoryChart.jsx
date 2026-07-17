// src/components/analytics/CategoryChart.jsx
import {
  Paper,
  Typography,
  Box,
  Stack,
  Divider,
  alpha,
} from "@mui/material";
import { useTheme } from "@mui/material/styles"; 

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

// Upgraded premium SaaS chart color tables [Indigo, Emerald, Amber, Rose, Cyan, Purple]
const LIGHT_COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#0EA5E9", "#8B5CF6"];
const DARK_COLORS = ["#818CF8", "#34D399", "#FBBF24", "#F87171", "#38BDF8", "#A78BFA"];

const CategoryChart = ({ data = [] }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const activeColors = isDarkMode ? DARK_COLORS : LIGHT_COLORS;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3.5,
        borderRadius: "24px", 
        border: "1px solid",
        borderColor: "divider", 
        height: "100%",
        bgcolor: "background.paper", 
        background: (theme) => theme.palette.mode === "dark"
          ? `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.default, 0.4)} 100%)`
          : `linear-gradient(180deg, #FFFFFF 0%, ${theme.palette.background.default} 100%)`,
        boxShadow: isDarkMode ? "0 10px 30px rgba(0,0,0,0.3)" : "0 10px 30px rgba(15, 23, 42, 0.01)"
      }}
    >
      <Typography
        variant="subtitle1"
        fontWeight={800} 
        sx={{ color: "text.primary", letterSpacing: "-0.01em" }}
      >
        Category Distribution
      </Typography>

      <Typography
        variant="body2"
        sx={{ color: "text.secondary", mb: 3, fontWeight: 500 }} 
      >
        Tasks grouped by category
      </Typography>

      <Divider sx={{ mb: 3, borderColor: "divider" }} />

      {data.length === 0 ? (
        <Box sx={{ height: 350, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Typography sx={{ color: "text.secondary", fontWeight: 600, fontSize: "0.95rem" }}>
            No task category distribution data available yet
          </Typography>
        </Box>
      ) : (
        <Stack 
          spacing={3} 
          sx={{
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          {/* Donut Wrapper */}
          <Box
            sx={{
              width: "100%",
              height: 240, 
              position: "relative",
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%" 
                  cy="50%"
                  innerRadius={65} 
                  outerRadius={95}
                  paddingAngle={4}
                  stroke={theme.palette.background.paper} 
                  strokeWidth={2}
                >
                  {data.map((item, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={activeColors[index % activeColors.length]}
                    />
                  ))}
                </Pie>

                <Tooltip 
                  cursor={false}
                  contentStyle={{ 
                    backgroundColor: theme.palette.background.paper, 
                    borderColor: theme.palette.divider,
                    borderRadius: "12px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                    color: theme.palette.text.primary
                  }}
                  itemStyle={{ color: theme.palette.text.primary, fontWeight: 600 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Box>

          {/* Legend List Underneath */}
          <Stack
            spacing={2}
            sx={{
              width: "100%",
              px: 1,
            }}
          >
            {data.map((item, index) => (
              <Stack
                key={index}
                spacing={1.5}
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: 1,
                  px: 1.5,
                  borderRadius: "12px",
                  bgcolor: (theme) => alpha(theme.palette.text.primary, 0.01),
                  border: "1px solid",
                  borderColor: (theme) => alpha(theme.palette.divider, 0.3)
                }}
              >
                <Stack
                  spacing={1.5}
                  sx={{
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      bgcolor: activeColors[index % activeColors.length],
                      flexShrink: 0,
                    }}
                  />

                  <Typography
                    variant="body2"
                    sx={{ color: "text.primary", fontWeight: 600 }}
                  >
                    {item.name}
                  </Typography>
                </Stack>

                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", fontWeight: 700 }}
                >
                  {item.value} {item.value === 1 ? "task" : "tasks"}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      )}
    </Paper>
  );
};

export default CategoryChart;
