import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import { useTasks } from "../../../context/TaskContext";

function PriorityChart() {
  const { tasks } = useTasks();

  const data = [
    {
      name: "High",
      tasks: tasks.filter(
        (t) => t.priority === "High"
      ).length,
    },
    {
      name: "Medium",
      tasks: tasks.filter(
        (t) => t.priority === "Medium"
      ).length,
    },
    {
      name: "Low",
      tasks: tasks.filter(
        (t) => t.priority === "Low"
      ).length,
    },
  ];

  return (
    <Card elevation={3}>
      <CardContent>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ mb: 2 }}
        >
          Priority Distribution
        </Typography>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <BarChart data={data}>
            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="tasks" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default PriorityChart;