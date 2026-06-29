// src/components/task/TaskList.jsx

import {
  Grid,
  Typography,
  Box,
} from "@mui/material";

import TaskCard from "./TaskCard";
import EmptyState from "../common/EmptyState";

const TaskList = ({ tasks = [] }) => {
  if (!tasks.length) {
    return (
      <EmptyState
        title="No Tasks Found"
        description="Create your first task to get started."
      />
    );
  }

  return (
    <Box mt={2}>
      <Grid container spacing={3}>
        {tasks.map((task) => (
          <Grid
            key={task.id}
            size={{ xs: 12, sm: 6, lg: 4 }}
          >
            <TaskCard task={task} />
          </Grid>
        ))}
      </Grid>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          mt: 3,
          textAlign: "center",
        }}
      >
        Total Tasks: {tasks.length}
      </Typography>
    </Box>
  );
};

export default TaskList;