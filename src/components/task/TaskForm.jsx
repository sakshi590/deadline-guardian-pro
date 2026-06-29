import { useEffect, useState } from "react";

import {
  Box,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Button,
} from "@mui/material";

import { useTasks } from "../../context/TaskContext";
import { useUI } from "../../context/UIContext";

const priorities = ["High", "Medium", "Low"];

const categories = [
  "General",
  "Study",
  "Work",
  "Personal",
  "Meeting",
  "Project",
  "Assignment",
];

const initialState = {
  title: "",
  description: "",
  category: "General",
  priority: "Medium",
  dueDate: "",
};

const TaskForm = ({ task }) => {
  const { addTask, updateTask } = useTasks();
  const { closeTaskDialog } = useUI();

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  // ============================
  // LOAD TASK INTO FORM
  // ============================
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        category: task.category || "General",
        priority: task.priority || "Medium",
        dueDate: task.dueDate || "",
      });
    } else {
      setFormData(initialState);
    }
  }, [task]);

  // ============================
  // HANDLE INPUT CHANGE
  // ============================
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // ============================
  // VALIDATION
  // ============================
  const validate = () => {
    const temp = {};

    if (!formData.title.trim()) {
      temp.title = "Title is required";
    }

    if (!formData.dueDate) {
      temp.dueDate = "Please select a due date";
    }

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };

  // ============================
  // SUBMIT (FIXED UPDATE LOGIC)
  // ============================
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) return;

    if (task) {
      // ✅ FIX: preserve old task data safely
      updateTask(task.id, {
        ...task,
        ...formData,
      });
    } else {
      addTask(formData);
    }

    setFormData(initialState);
    closeTaskDialog();
  };

  // ============================
  // UI
  // ============================
  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        {/* TITLE */}
        <Grid item xs={12}>
          <TextField
            label="Task Title"
            name="title"
            fullWidth
            value={formData.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
          />
        </Grid>

        {/* DESCRIPTION */}
        <Grid item xs={12}>
          <TextField
            label="Description"
            name="description"
            multiline
            rows={4}
            fullWidth
            value={formData.description}
            onChange={handleChange}
          />
        </Grid>

        {/* CATEGORY */}
        <Grid item xs={12} md={6}>
          <TextField
            select
            fullWidth
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {categories.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* PRIORITY */}
        <Grid item xs={12} md={6}>
          <TextField
            select
            fullWidth
            label="Priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            {priorities.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* DUE DATE */}
        <Grid item xs={12}>
          <TextField
            type="date"
            fullWidth
            label="Due Date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            error={!!errors.dueDate}
            helperText={errors.dueDate}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        {/* ACTIONS */}
        <Grid item xs={12}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-end"
          >
            <Button
              variant="outlined"
              onClick={closeTaskDialog}
            >
              Cancel
            </Button>

            <Button variant="contained" type="submit">
              {task ? "Update Task" : "Create Task"}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaskForm;