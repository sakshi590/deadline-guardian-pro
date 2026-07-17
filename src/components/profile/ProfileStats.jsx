// src/components/profile/ProfileStats.jsx
import {
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  alpha, 
} from "@mui/material";

import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";

import { useTasks } from "../../context/TaskContext";

const StatCard = ({ title, value, icon, colorKey }) => (
  <Card
    elevation={0} 
    sx={{
      borderRadius: "24px", 
      bgcolor: "background.paper", 
      border: "1px solid",
      borderColor: "divider", 
      boxShadow: (theme) => theme.palette.mode === "dark" 
        ? "0 10px 30px rgba(0, 0, 0, 0.3)" 
        : "0 10px 30px rgba(0, 0, 0, 0.01)",
      height: "100%",
    }}
  >
    <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
      {/* ✅ FIXED: Shifted inline alignment attribute tokens to safe sx container properties */}
      <Stack 
        sx={{ 
          flexDirection: "row", 
          justifyContent: "space-between", 
          alignItems: "center" 
        }}
      >
        {/* ✅ FIXED: Shifted inline alignment attribute tokens to safe sx container properties */}
        <Stack spacing={0.5} sx={{ minWidth: 0, flex: 1, flexDirection: "column" }}>
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", fontWeight: 700, textTransform: "uppercase", fontSize: "0.725rem", letterSpacing: "0.05em" }} 
          >
            {title}
          </Typography>

          <Typography variant="h4" fontWeight={800} sx={{ color: "text.primary", letterSpacing: "-0.02em" }}> 
            {value}
          </Typography>
        </Stack>

        {/* ================= REFINED DYNAMIC CONTAINER BADGE ================= */}
        <Stack
          sx={{
            width: 44,
            height: 44,
            borderRadius: "10px", 
            bgcolor: (theme) => {
              const p = colorKey.split(".");
              return alpha(theme.palette[p[0]][p[1] || "main"], 0.08);
            },
            color: colorKey,
            border: "1px solid",
            borderColor: (theme) => {
              const p = colorKey.split(".");
              return alpha(theme.palette[p[0]][p[1] || "main"], 0.16);
            },
            justifyContent: "center",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          {icon}
        </Stack>
      </Stack>
    </CardContent>
  </Card>
);

const ProfileStats = () => {
  const { tasks = [] } = useTasks() || {};

  const totalTasks = tasks.length || 0; 
  const completedTasks = tasks.filter((t) => t.completed || t.status === "Completed").length || 0;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
  const aiScore = Math.min(100, completionRate + 10);

  return (
    // ✅ FIXED: Handled responsive grid layouts safely by extracting naked boolean parameters
    <Grid container spacing={3.5}>
      <Grid xs={12} sm={6} lg={3}>
        <StatCard title="Total Tasks" value={totalTasks} colorKey="primary.main" icon={<AssignmentRoundedIcon sx={{ fontSize: 20 }} />} /> 
      </Grid>
      <Grid xs={12} sm={6} lg={3}>
        <StatCard title="Completed" value={completedTasks} colorKey="success.main" icon={<AssignmentTurnedInRoundedIcon sx={{ fontSize: 20 }} />} />
      </Grid>
      <Grid xs={12} sm={6} lg={3}>
        <StatCard title="Pending" value={pendingTasks} colorKey="warning.main" icon={<PendingActionsRoundedIcon sx={{ fontSize: 20 }} />} />
      </Grid>
      <Grid xs={12} sm={6} lg={3}>
        <StatCard title="AI Score" value={`${aiScore}%`} colorKey="secondary.main" icon={<PsychologyRoundedIcon sx={{ fontSize: 20 }} />} />
      </Grid>
    </Grid>
  );
};

export default ProfileStats;
