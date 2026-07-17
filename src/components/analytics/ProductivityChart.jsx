// src/components/analytics/ProductivityChart.jsx
import { Paper, Typography, Box, alpha } from "@mui/material";
import { useTheme } from "@mui/material/styles"; // ✅ FIXED: Access active design variables directly

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const ProductivityChart = ({ data = [] }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Paper
      elevation={0} // Standardised to flat family look matching your other analytics charts
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
      {/* ================= SECTION HEADER METRICS ================= */}
      <Typography
        variant="subtitle1"
        fontWeight={800} // Upgraded weight for premium brand harmony profile
        sx={{ color: "text.primary", letterSpacing: "-0.01em" }}
      >
        Weekly Productivity
      </Typography>

      <Typography
        variant="body2"
        sx={{ color: "text.secondary", mb: 4, fontWeight: 500 }} // ✅ UPDATED: Adaptive typography tokens
      >
        Tasks completed over the last 7 days.
      </Typography>

      {/* ================= RECHARTS LINE GRAPH LAYER ================= */}
      <Box
        sx={{
          width: "100%",
          height: 400, // Balanced height boundary for dashboard proportions
        }}
      >
        {data.length === 0 ? (
          <Box sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Typography sx={{ color: "text.secondary", fontWeight: 600, fontSize: "0.95rem" }}>
              No productivity trend metrics captured over this timeline
            </Typography>
          </Box>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 20,
                right: 25,
                left: -20, // Negative offset clears spacing constraints gracefully
                bottom: 10,
              }}
            >
              {/* ✅ FIXED: Grid track dividers adapt color mappings safely across theme toggles */}
              <CartesianGrid 
                strokeDasharray="4 4" 
                vertical={false}
                stroke={theme.palette.divider}
              />

              {/* ✅ FIXED: XAxis Ticks and fonts map to secondary typography hooks directly */}
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: theme.palette.text.secondary,
                  fontSize: 12,
                  fontWeight: 700,
                }}
                dy={10}
              />

              {/* ✅ FIXED: YAxis parameters adapt contrast weights cleanly */}
              <YAxis 
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
                tick={{
                  fill: theme.palette.text.secondary,
                  fontSize: 12,
                  fontWeight: 700,
                }}
              />

              {/* ✅ FIXED: Customized Tooltip frame to manage dark mode theme flips cleanly without bleeding */}
              <Tooltip 
                cursor={{ stroke: theme.palette.divider, strokeWidth: 1 }}
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

              {/* Upgraded Modern Line Vector Element */}
              <Line
                type="monotone"
                dataKey="count"
                stroke={theme.palette.primary.main} // ✅ UPDATED: Responsive brand accent color routing
                strokeWidth={3.5}
                dot={{
                  r: 5,
                  fill: theme.palette.background.paper,
                  stroke: theme.palette.primary.main,
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 8,
                  fill: theme.palette.primary.main,
                  stroke: theme.palette.background.paper,
                  strokeWidth: 2,
                  style: { filter: `drop-shadow(0 4px 8px ${alpha(theme.palette.primary.main, 0.4)})` }
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </Box>
    </Paper>
  );
};

export default ProductivityChart;
