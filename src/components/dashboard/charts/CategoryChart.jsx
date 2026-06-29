import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import { useTasks } from "../../../context/TaskContext";

const COLORS = [
  "#1976d2",
  "#2e7d32",
  "#ed6c02",
  "#9c27b0",
  "#d32f2f",
];

function CategoryChart() {
  const { tasks } = useTasks();

  const categories = {};

  tasks.forEach((task) => {
    const category = task.category || "Other";

    categories[category] =
      (categories[category] || 0) + 1;
  });

  const data = Object.keys(categories).map((key) => ({
    name: key,
    value: categories[key],
  }));

  return (
    <Card elevation={3}>
      <CardContent>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ mb: 2 }}
        >
          Tasks by Category
        </Typography>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={100}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[index % COLORS.length]
                  }
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default CategoryChart;