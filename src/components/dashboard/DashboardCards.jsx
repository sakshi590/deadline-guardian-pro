// src/components/dashboard/DashboardCards.jsx
import { Grid, Card, CardContent, Typography, Stack, Box, alpha } from "@mui/material";

import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import { useTasks } from "../../context/TaskContext";

const DashboardCards = () => {
  // ✅ FIXED: Extracted pre-calculated user-isolated counters directly from context to prevent mock fallbacks
  const { 
    totalTasks = 0, 
    completedTasks = 0, 
    pendingTasks = 0, 
    overdueTasks = 0 
  } = useTasks() || {};

  const cards = [
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: <AssignmentTurnedInIcon sx={{ fontSize: 18 }} />,
      colorKey: "primary.main",
    },
    {
      title: "Completed",
      value: completedTasks,
      icon: <CheckCircleIcon sx={{ fontSize: 18 }} />,
      colorKey: "success.main",
    },
    {
      title: "Pending",
      value: pendingTasks,
      icon: <PendingActionsIcon sx={{ fontSize: 18 }} />,
      colorKey: "warning.main",
    },
    {
      title: "Overdue",
      value: overdueTasks,
      icon: <WarningAmberIcon sx={{ fontSize: 18 }} />,
      colorKey: "error.main",
    },
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((card) => (
        <Grid xs={12} sm={6} md={3} key={card.title}>
          <Card
            elevation={0}
            sx={{
              borderRadius: "20px",
              bgcolor: "background.paper", 
              border: "1px solid",
              borderColor: "divider", 
              boxShadow: (theme) => theme.palette.mode === "dark" ? "0 4px 12px rgba(0,0,0,0.3)" : "0 4px 12px rgba(0, 0, 0, 0.01)",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                transform: "translateY(-3px)",
                borderColor: (theme) => alpha(theme.palette.text.primary, 0.2), 
                boxShadow: (theme) => theme.palette.mode === "dark" ? "0 8px 24px rgba(0,0,0,0.4)" : "0 8px 24px rgba(15, 23, 42, 0.03)",
              },
            }}
          >
            <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
              <Stack
                direction="row"
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Stack spacing={0.5}>
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.725rem" }} 
                  >
                    {card.title}
                  </Typography>

                  <Typography
                    variant="h4"
                    fontWeight={800}
                    sx={{ color: "text.primary", letterSpacing: "-0.02em" }} 
                  >
                    {card.value}
                  </Typography>
                </Stack>

                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: (theme) => {
                      const paletteColor = card.colorKey.split(".")[0];
                      return alpha(theme.palette[paletteColor].main, 0.08);
                    },
                    color: card.colorKey,
                    border: "1px solid",
                    borderColor: (theme) => {
                      const paletteColor = card.colorKey.split(".")[0];
                      return alpha(theme.palette[paletteColor].main, 0.15);
                    },
                  }}
                >
                  {card.icon}
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardCards;
