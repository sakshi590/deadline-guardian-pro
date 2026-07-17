// src/components/analytics/PriorityChart.jsx
import { Paper, Typography, Box, alpha } from "@mui/material";
import { useTheme } from "@mui/material/styles"; // ✅ FIXED: Access active design tokens directly

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

// Semantic color dictionary adaptive mappings [High = Error Red, Medium = Amber Warning, Low = Success Green]
const LIGHT_COLORS = { High: "#EF4444", Medium: "#F59E0B", Low: "#10B981" };
const DARK_COLORS = { High: "#F87171", Medium: "#FBBF24", Low: "#34D399" };

const PriorityChart = ({ data = [] }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const colors = isDarkMode ? DARK_COLORS : LIGHT_COLORS;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3.5,
        borderRadius: "24px", // Matches your exact capsule curve layout family
        border: "1px solid",
        borderColor: "divider", // Theme adaptive separation outline trace line
        bgcolor: "background.paper", // Seamless light / dark card backing surface
        // Clean dynamic SaaS backdrop gradient that darkens smoothly across themes
        background: (theme) => theme.palette.mode === "dark"
          ? `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.default, 0.4)} 100%)`
          : `linear-gradient(180deg, #FFFFFF 0%, ${theme.palette.background.default} 100%)`,
        boxShadow: isDarkMode ? "0 10px 30px rgba(0,0,0,0.3)" : "0 10px 30px rgba(15, 23, 42, 0.01)"
      }}
    >
      {/* ================= SECTION HEADERS SECTOR ================= */}
      <Typography
        variant="subtitle1"
        fontWeight={800} // Upgraded weight for premium brand harmony profile
        sx={{ color: "text.primary", letterSpacing: "-0.01em" }}
      >
        Priority Distribution
      </Typography>

      <Typography
        variant="body2"
        sx={{ color: "text.secondary", mb: 4, fontWeight: 500 }} // ✅ UPDATED: Adaptive typography tokens
      >
        Tasks grouped by priority
      </Typography>

      {/* ================= BAR CHART GRAPH LAYER ================= */}
      <Box
        sx={{
          width: "100%",
          height: 390,
        }}
      >
        {data.length === 0 ? (
          <Box sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Typography sx={{ color: "text.secondary", fontWeight: 600, fontSize: "0.95rem" }}>
              No priority distribution analytics metrics available yet
            </Typography>
          </Box>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 20,
                left: -20, // Negative offset clears spacing constraints gracefully
                bottom: 10,
              }}
            >
              {/* ✅ FIXED: Grid track bars adapt color mappings safely across theme toggles */}
              <CartesianGrid
                strokeDasharray="4 4"
                vertical={false}
                stroke={theme.palette.divider}
              />

              {/* ✅ FIXED: XAxis Ticks and fonts map to secondary typography hooks directly */}
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: theme.palette.text.secondary,
                  fontSize: 13,
                  fontWeight: 700,
                }}
              />

              {/* ✅ FIXED: YAxis parameters adapt contrast weights cleanly */}
              <YAxis
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: theme.palette.text.secondary,
                  fontSize: 13,
                  fontWeight: 700,
                }}
              />

              {/* ✅ FIXED: Customized Tooltip frame to manage dark mode theme flips cleanly without bleeding */}
              <Tooltip
                cursor={{
                  fill: isDarkMode ? "rgba(255,255,255,0.02)" : "rgba(15,23,42,0.01)",
                }}
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  borderColor: theme.palette.divider,
                  borderRadius: "12px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                  color: theme.palette.text.primary,
                  border: "1px solid"
                }}
                itemStyle={{ color: theme.palette.text.primary, fontWeight: 700 }}
              />

              {/* Modernized Column Columns Structure */}
              <Bar
                dataKey="value"
                radius={[8, 8, 0, 0]}
                barSize={55}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[entry.name] || theme.palette.primary.main}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </Box>
    </Paper>
  );
};

export default PriorityChart;
