import { Box, Typography } from "@mui/material";
import DashboardCards from "../components/dashboard/DashboardCards";
import TaskForm from "../components/task/TaskForm";

function Dashboard() {
  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        Dashboard
      </Typography>

      <DashboardCards />

      <TaskForm />
    </Box>
  );
}

export default Dashboard;