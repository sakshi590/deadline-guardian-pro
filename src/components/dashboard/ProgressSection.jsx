// src/components/dashboard/ProgressSection.jsx
import { Card, CardContent, Typography, Box, Stack, alpha } from "@mui/material";
import { useTasks } from "../../context/TaskContext";
import ProductivityScore from "./ProductivityScore";

const ProgressSection = () => {
  const { tasks = [] } = useTasks() || {}; // Guard against initial empty database loads safely

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  // Dynamic formula to calculate an AI productivity index out of 100
  const productivityScoreCalculated = total === 0 ? 0 : Math.min(100, Math.round((completed / total) * 100) + 10);

  return (
    <Card
      elevation={0} 
      sx={{
        borderRadius: "24px", 
        border: "1px solid",
        borderColor: "divider", 
        bgcolor: "background.paper", 
        height: "100%",
        boxShadow: (theme) => theme.palette.mode === "dark" ? "0 10px 30px rgba(0,0,0,0.3)" : "0 10px 30px rgba(0, 0, 0, 0.01)",
      }}
    >
      <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
        <Typography variant="subtitle1" fontWeight={800} sx={{ color: "text.primary", mb: 3.5, letterSpacing: "-0.01em" }}>
          Productivity Progress
        </Typography>

        <Stack
          spacing={3}
          sx={{
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {/* ================= REFINED DYNAMIC CONIC PROGRESS HUB ================= */}
          <Box
            sx={{
              width: 140,
              height: 140,
              borderRadius: "50%",
              background: (theme) => `conic-gradient(
                ${theme.palette.success.main} ${progress * 3.6}deg,
                ${theme.palette.mode === 'dark' ? alpha(theme.palette.divider, 0.5) : '#F1F5F9'} 0deg
              )`, 
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              boxShadow: (theme) => theme.palette.mode === "dark" ? "inset 0 2px 8px rgba(0, 0, 0, 0.4)" : "inset 0 2px 8px rgba(0, 0, 0, 0.04)"
            }}
          >
            <Box
              sx={{
                width: 112,
                height: 112,
                borderRadius: "50%",
                bgcolor: "background.paper", 
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                boxShadow: (theme) => theme.palette.mode === "dark" ? "0 4px 14px rgba(0,0,0,0.4)" : "0 4px 14px rgba(15, 23, 42, 0.04)"
              }}
            >
              <Typography variant="h4" fontWeight={800} sx={{ color: "text.primary", letterSpacing: "-0.02em" }}>
                {progress}%
              </Typography>

              <Typography
                variant="caption"
                sx={{ color: "text.secondary", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.03em", mt: 0.25, fontSize: "0.65rem" }}
              >
                Completed
              </Typography>
            </Box>
          </Box>

          {/* ================= STABILIZED METRICS ROW ================= */}
          <Stack direction="row" spacing={5} sx={{ width: "100%", justifyContent: "center" }}>
            {/* ✅ FIXED: Shifted inline alignment attribute tokens to safe sx container properties */}
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6" fontWeight={800} sx={{ color: "success.main" }}>
                {completed}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600 }}>
                Done
              </Typography>
            </Box>

            {/* Vertically centered inner structural panel boundary line */}
            <Box sx={{ width: "1px", height: "32px", bgcolor: "divider", alignSelf: "center" }} />

            {/* ✅ FIXED: Shifted inline alignment attribute tokens to safe sx container properties */}
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6" fontWeight={800} sx={{ color: "primary.main" }}>
                {total - completed}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600 }}>
                Remaining
              </Typography>
            </Box>
          </Stack>
        </Stack>

        {/* Integrated Productivity Score child model block view */}
        <ProductivityScore score={productivityScoreCalculated} />
      </CardContent>
    </Card>
  );
};

export default ProgressSection;
