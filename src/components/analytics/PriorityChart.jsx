// src/components/analytics/PriorityChart.jsx

import { Paper, Typography, Box } from "@mui/material";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

const COLORS = {
  High: "#EF4444",
  Medium: "#F59E0B",
  Low: "#22C55E",
};

const PriorityChart = ({ data }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        background:
          "linear-gradient(180deg,#ffffff,#fafbff)",
        height: 520,
      }}
    >
      <Typography
        variant="h5"
        fontWeight={700}
      >
        Priority Distribution
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        mb={4}
      >
        Tasks grouped by priority
      </Typography>

      <Box
        sx={{
          width: "100%",
          height: 390,
        }}
      >
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 20,
              left: 0,
              bottom: 10,
            }}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="#E5E7EB"
            />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 14,
                fontWeight: 600,
              }}
            />

            <YAxis
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{
                fill: "#f3f4f6",
              }}
              contentStyle={{
                borderRadius: 12,
                border: "none",
                boxShadow:
                  "0 10px 30px rgba(0,0,0,.15)",
              }}
            />

            <Bar
              dataKey="value"
              radius={[10, 10, 0, 0]}
              barSize={70}
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[entry.name] || "#4F46E5"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default PriorityChart;