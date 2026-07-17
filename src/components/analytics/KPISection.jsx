// src/components/analytics/KPISection.jsx
import Grid from "@mui/material/Grid";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import KPICard from "./KPICard";

const KPISection = ({
  tasks,
  completed,
  pending,
  completionRate,
}) => {
  return (
    // ✅ FIXED: Standardised layout grids column parameters without using the legacy boolean item attributes
    <Grid container spacing={3.5}>
      <Grid xs={12} sm={6} lg={3}>
        <KPICard
          title="Total Tasks"
          value={tasks}
          subtitle="All created tasks"
          color="primary.main" 
          icon={<AssignmentRoundedIcon sx={{ fontSize: 24 }} />} 
        />
      </Grid>

      <Grid xs={12} sm={6} lg={3}>
        <KPICard
          title="Completed"
          value={completed}
          subtitle="Finished successfully"
          color="success.main" 
          icon={<CheckCircleRoundedIcon sx={{ fontSize: 24 }} />}
        />
      </Grid>

      <Grid xs={12} sm={6} lg={3}>
        <KPICard
          title="Pending"
          value={pending}
          subtitle="Still remaining"
          color="warning.main" 
          icon={<PendingActionsRoundedIcon sx={{ fontSize: 24 }} />}
        />
      </Grid>

      <Grid xs={12} sm={6} lg={3}>
        <KPICard
          title="Completion"
          value={`${completionRate}%`}
          subtitle="Overall productivity"
          color="error.main" 
          icon={<TrendingUpRoundedIcon sx={{ fontSize: 24 }} />}
        />
      </Grid>
    </Grid>
  );
};

export default KPISection;
