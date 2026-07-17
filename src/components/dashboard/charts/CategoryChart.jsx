// src/components/analytics/CategoryChart.jsx
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
import { useTheme } from "@mui/material/styles"; // ✅ FIXED: Imported theme hook to pass colors directly into Recharts components [2]

import { useTasks } from "../../../context/TaskContext";

// Upgraded to match your premium high-density SaaS brand colors [Indigo, Emerald, Amber, Rose, Cyan]
const LIGHT_COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EC4899", "#0EA5E9"];
const DARK_COLORS = ["#818CF8", "#34D399", "#FBBF24", "#F472B6", "#38BDF8"];

function CategoryChart() {
  const { tasks } = useTasks();
  const theme = useTheme(); // Access the current active theme context [2]
  const isDarkMode = theme.palette.mode === "dark";
  const activeColors = isDarkMode ? DARK_COLORS : LIGHT_COLORS;

  const categories = {};

  tasks.forEach((task) => {
    const category = task.category || "Other";
    categories[category] = (categories[category] || 0) + 1;
  });

  const data = Object.keys(categories).map((key) => ({
    name: key,
    value: categories[key],
  }));

  return (
    <Card 
      elevation={0} // Standardized to flat SaaS card style family
      sx={{ 
        borderRadius: "24px", // Matches your exact capsule curve layout family
        border: "1px solid",
        borderColor: "divider", // Responsive border trace lines
        bgcolor: "background.paper", // Seamless dark/light card backing
        boxShadow: isDarkMode ? "0 10px 30px rgba(0,0,0,0.3)" : "0 10px 30px rgba(0,0,0,0.01)"
      }}
    >
      <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
        <Typography
          variant="subtitle1"
          fontWeight={800}
          sx={{ color: "text.primary", mb: 3.5, letterSpacing: "-0.01em" }}
        >
          Tasks by Category
        </Typography>

        {data.length === 0 ? (
          <Box sx={{ height: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Typography sx={{ color: "text.secondary", fontWeight: 600, fontSize: "0.95rem" }}>
              No task category analytics available yet
            </Typography>
          </Box>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                outerRadius={90}
                innerRadius={60} // Converted from standard flat Pie into a modern premium Donut Chart
                paddingAngle={4}
                stroke={theme.palette.background.paper} // Ensures border gaps blend cleanly into parent backgrounds
                strokeWidth={2}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={activeColors[index % activeColors.length]}
                  />
                ))}
              </Pie>

              {/* ✅ FIXED: Customized Tooltip content mapping styles to handle dark theme flips cleanly [2] */}
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: theme.palette.background.paper, 
                  borderColor: theme.palette.divider,
                  borderRadius: "12px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                  color: theme.palette.text.primary
                }}
                itemStyle={{ color: theme.palette.text.primary, fontWeight: 600 }}
              />

              {/* ✅ FIXED: Styled Legends to stay readable regardless of layout mode shifts [2] */}
              <Legend 
                wrapperStyle={{ paddingTop: "20px" }}
                formatter={(value) => (
                  <span style={{ color: theme.palette.text.secondary, fontWeight: 600, fontSize: "0.85rem" }}>
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

// Simple fallback box checker mapping to prevent any native structural compilation breaks
function Box({ children, sx = {} }) {
  return <div style={{ display: "flex", width: "100%", ...sx }}>{children}</div>;
}

export default CategoryChart;
