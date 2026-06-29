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
    <Grid container spacing={3}>

      <Grid item xs={12} sm={6} lg={3}>
        <KPICard
          title="Total Tasks"
          value={tasks}
          subtitle="All created tasks"
          color="#4F46E5"
          icon={<AssignmentRoundedIcon fontSize="large" />}
        />
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
        <KPICard
          title="Completed"
          value={completed}
          subtitle="Finished successfully"
          color="#22C55E"
          icon={<CheckCircleRoundedIcon fontSize="large" />}
        />
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
        <KPICard
          title="Pending"
          value={pending}
          subtitle="Still remaining"
          color="#F59E0B"
          icon={<PendingActionsRoundedIcon fontSize="large" />}
        />
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
        <KPICard
          title="Completion"
          value={`${completionRate}%`}
          subtitle="Overall productivity"
          color="#EF4444"
          icon={<TrendingUpRoundedIcon fontSize="large" />}
        />
      </Grid>

    </Grid>
  );
};

export default KPISection;