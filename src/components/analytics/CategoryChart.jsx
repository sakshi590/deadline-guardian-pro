// src/components/analytics/CategoryChart.jsx

import {
  Paper,
  Typography,
  Box,
  Stack,
  Divider,
} from "@mui/material";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const COLORS = [
  "#4F46E5",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
  "#06B6D4",
  "#8B5CF6",
];

const CategoryChart = ({ data }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        height: "auto", // Dynamically expands to easily fit stacked elements
        background:
          "linear-gradient(180deg,#ffffff,#fafbff)",
      }}
    >
      <Typography
        variant="h5"
        fontWeight={700}
      >
        Category Distribution
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        mb={3}
      >
        Tasks grouped by category
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {/* Main Container - Stacked Vertically */}
      <Stack 
        direction="column" 
        spacing={3} 
        alignItems="center"
      >
        {/* Donut Wrapper */}
        <Box
          sx={{
            width: "100%",
            height: 240, // Optimized height boundary for vertical layouts
            position: "relative",
          }}
        >
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%" // Perfectly centered on screen
                cy="50%"
                innerRadius={65} // Balanced radii for vertical screen space
                outerRadius={95}
                paddingAngle={4}
              >
                {data.map((item, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[index % COLORS.length]
                    }
                  />
                ))}
              </Pie>

              <Tooltip />
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
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
              >
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor:
                      COLORS[index % COLORS.length],
                    flexShrink: 0,
                  }}
                />

                <Typography
                  fontWeight={500}
                  color="text.primary"
                >
                  {item.name}
                </Typography>
              </Stack>

              <Typography
                fontWeight={700}
                color="text.secondary"
              >
                {item.value}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Paper>
  );
};

export default CategoryChart;
