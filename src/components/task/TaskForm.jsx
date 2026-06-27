import { useState } from "react";
import {
  Paper,
  TextField,
  Button,
  Stack,
} from "@mui/material";

import { useTasks } from "../../context/TaskContext";

function TaskForm() {
  const { addTask } = useTasks();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "Medium",
    dueDate: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.title.trim()) return;

    addTask(formData);

    setFormData({
      title: "",
      description: "",
      category: "",
      priority: "Medium",
      dueDate: "",
    });
  };

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Task Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            required
          />

          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
          >
            Add Task
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}

export default TaskForm;