import {
  Paper,
  Typography,
  Box,
} from "@mui/material";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const ProductivityChart = ({ data }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 4,
        borderRadius: 4,
        mt: 4,
      }}
    >
      <Typography
        variant="h5"
        fontWeight={700}
        mb={1}
      >
        Weekly Productivity
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        mb={4}
      >
        Tasks completed over the last 7 days.
      </Typography>

      <Box
        sx={{
          width: "100%",
          height: 450,
        }}
      >
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 10,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="date"
            />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="count"
              stroke="#4F46E5"
              strokeWidth={4}
              dot={{
                r: 6,
              }}
              activeDot={{
                r: 9,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default ProductivityChart;