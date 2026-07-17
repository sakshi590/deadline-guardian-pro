// src/components/ai/AIKPICards.jsx
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Avatar,
  Box,
  alpha
} from "@mui/material";

// Official stable subpath import - guarantees clean compilation across Vite
import Grid from "@mui/material/Grid2"; 

import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

const AIKPICards = ({ summary }) => {
  const formatWorkload = (val) => {
    if (val === undefined || val === null || val === "--") return "--";
    return typeof val === "number" || !isNaN(val) ? `${val} hrs` : val;
  };

  // Semantic color dictionaries for layout mapping
  const cards = [
    {
      title: "AI Score",
      value: summary?.productivityScore ?? "--",
      subtitle: "Overall Productivity",
      colorKey: "primary.main",
      icon: <PsychologyRoundedIcon sx={{ fontSize: 20 }} />,
    },
    {
      title: "Tasks",
      value: summary?.updatedTasks ?? "--",
      subtitle: "Tasks Analyzed",
      colorKey: "success.main",
      icon: <AssignmentRoundedIcon sx={{ fontSize: 20 }} />,
    },
    {
      title: "Risks",
      value: summary?.riskyTasks ?? "--",
      subtitle: "Need Attention",
      colorKey: "error.main",
      icon: <WarningAmberRoundedIcon sx={{ fontSize: 20 }} />,
    },
    {
      title: "Workload",
      value: formatWorkload(summary?.workload),
      subtitle: "Estimated Time",
      colorKey: "warning.main",
      icon: <AccessTimeRoundedIcon sx={{ fontSize: 20 }} />,
    },
  ];

  return (
    <Grid container spacing={3.5}>
      {cards.map((card) => (
        <Grid
          key={card.title}
          xs={12}
          sm={6}
          lg={3}
        >
          <Card
            elevation={0} 
            sx={{
              height: "100%",
              borderRadius: "20px", 
              bgcolor: "background.paper", 
              border: "1px solid",
              borderColor: "divider", 
              boxShadow: (theme) => theme.palette.mode === "dark" ? "0 4px 12px rgba(0,0,0,0.3)" : "0 4px 12px rgba(15,23,42,0.01)",
              transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
              "& Bird-root": { minWidth: 0 },
              "&:hover": {
                transform: "translateY(-3px)", 
                borderColor: (theme) => alpha(theme.palette.text.primary, 0.15),
                boxShadow: (theme) => theme.palette.mode === "dark" 
                  ? "0 8px 24px rgba(0,0,0,0.4)" 
                  : "0 8px 24px rgba(15, 23, 42, 0.03)",
              },
            }}
          >
            <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
              {/* ✅ FIXED: Shifted inline alignment attribute tokens to safe sx container properties */}
              <Stack
                spacing={2}
                sx={{
                  direction: "row",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <Stack spacing={0.5} sx={{ minWidth: 0, flex: 1 }}>
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.725rem" }} 
                    noWrap
                  >
                    {card.title}
                  </Typography>

                  <Typography
                    variant="h4"
                    fontWeight={800}
                    sx={{
                      fontSize: { xs: "1.75rem", md: "2.125rem" },
                      lineHeight: 1.2,
                      color: "text.primary", 
                      letterSpacing: "-0.02em",
                      my: 0.25
                    }}
                  >
                    {card.value}
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary", fontWeight: 600, display: "block" }}
                    noWrap
                  >
                    {card.subtitle}
                  </Typography>
                </Stack>

                <Avatar
                  sx={{
                    bgcolor: (theme) => {
                      const p = card.colorKey.split(".");
                      return alpha(theme.palette[p[0]].main, 0.08);
                    },
                    color: card.colorKey,
                    width: 44,
                    height: 44,
                    borderRadius: "10px", 
                    border: "1px solid",
                    borderColor: (theme) => {
                      const p = card.colorKey.split(".");
                      return alpha(theme.palette[p[0]].main, 0.15);
                    },
                    boxShadow: "none",
                    flexShrink: 0,
                  }}
                >
                  {card.icon}
                </Avatar>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default AIKPICards;
