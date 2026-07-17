// src/components/analytics/PriorityChart.jsx
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell, // ✅ FIXED: Imported Cell component to allow distinct priority bar colors
} from "recharts";

import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles"; // ✅ FIXED: Access active design variables directly

import { useTasks } from "../../../context/TaskContext";

// Semantic color mapping aligned with priority alerts [High = Crimson, Medium = Amber, Low = Emerald]
const LIGHT_COLORS = { High: "#EF4444", Medium: "#F59E0B", Low: "#10B981" };
const DARK_COLORS = { High: "#F87171", Medium: "#FBBF24", Low: "#34D399" };

function PriorityChart() {
  const { tasks } = useTasks();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const colors = isDarkMode ? DARK_COLORS : LIGHT_COLORS;

  const data = [
    {
      name: "High",
      tasks: tasks.filter((t) => t.priority === "High").length,
    },
    {
      name: "Medium",
      tasks: tasks.filter((t) => t.priority === "Medium").length,
    },
    {
      name: "Low",
      tasks: tasks.filter((t) => t.priority === "Low").length,
    },
  ];

  return (
    <Card 
      elevation={0} // Standardized to flat family look matching CategoryChart
      sx={{ 
        borderRadius: "24px", 
        border: "1px solid",
        borderColor: "divider", // Adaptable structural framework outlines
        bgcolor: "background.paper", // Responsive layer surface backing
        boxShadow: isDarkMode ? "0 10px 30px rgba(0,0,0,0.3)" : "0 10px 30px rgba(0,0,0,0.01)"
      }}
    >
      <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
        <Typography
          variant="subtitle1"
          fontWeight={800}
          sx={{ color: "text.primary", mb: 3.5, letterSpacing: "-0.01em" }}
        >
          Priority Distribution
        </Typography>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            {/* ✅ FIXED: XAxis Ticks and labels adapt smoothly across theme toggles */}
            <XAxis 
              dataKey="name" 
              tick={{ fill: theme.palette.text.secondary, fontSize: 12, fontWeight: 600 }}
              axisLine={{ stroke: theme.palette.divider }}
              tickLine={false}
            />

            {/* ✅ FIXED: YAxis Ticks adjust cleanly to maintain legibility */}
            <YAxis 
              tick={{ fill: theme.palette.text.secondary, fontSize: 12, fontWeight: 600 }}
              axisLine={{ stroke: theme.palette.divider }}
              tickLine={false}
              allowDecimals={false}
            />

            {/* ✅ FIXED: Customized Tooltip container to prevent white-out bugs in Dark Mode */}
            <Tooltip 
              cursor={{ fill: isDarkMode ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}
              contentStyle={{ 
                backgroundColor: theme.palette.background.paper, 
                borderColor: theme.palette.divider,
                borderRadius: "12px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                color: theme.palette.text.primary
              }}
              itemStyle={{ color: theme.palette.text.primary, fontWeight: 600 }}
            />

            {/* ✅ FIXED: Implemented custom cells so each priority bar renders with its distinctive alert color */}
            <Bar dataKey="tasks" radius={[6, 6, 0, 0]} maxBarSize={45}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={colors[entry.name] || theme.palette.primary.main} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default PriorityChart;
