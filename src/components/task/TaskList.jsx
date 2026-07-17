// src/components/task/TaskList.jsx
import {
  Grid,
  Typography,
  Box,
} from "@mui/material";

import TaskCard from "./TaskCard";
import EmptyState from "../common/EmptyState";

const TaskList = ({ tasks = [] }) => {
  const cleanTasks = Array.isArray(tasks) ? tasks : [];

  if (!cleanTasks.length) {
    return (
      <EmptyState
        title="No Tasks Found"
        description="Create your first task to get started."
      />
    );
  }

  return (
    <Box sx={{ mt: 2 }}>
      {/* ✅ FIXED: Removed the invalid boolean 'item' attribute prop to prevent console logging pollution */}
      <Grid container spacing={3.5}>
        {cleanTasks.map((task) => (
          <Grid
            key={task.id}
            xs={12} 
            sm={6} 
            lg={4}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <TaskCard task={task} />
          </Grid>
        ))}
      </Grid>

      {/* ================= ADAPTIVE SUMMARY TRACKER ================= */}
      <Typography
        variant="body2"
        sx={{
          mt: 4,
          textAlign: "center",
          color: "text.secondary",
          fontWeight: 600,
          fontSize: "0.85rem",
          letterSpacing: "0.02em"
        }}
      >
        Total Operational Tasks Monitored: {cleanTasks.length}
      </Typography>
    </Box>
  );
};

export default TaskList;
