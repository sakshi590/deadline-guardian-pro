// src/components/task/TaskForm.jsx
import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Button,
  alpha,
} from "@mui/material";

import { useTasks } from "../../context/TaskContext";
import { useUI } from "../../context/UIContext";

const priorities = ["High", "Medium", "Low"];
const categories = ["General", "Study", "Work", "Personal", "Meeting", "Project", "Assignment"];

const initialState = {
  title: "",
  description: "",
  category: "General",
  priority: "Medium",
  dueDate: "",
};

const TaskForm = ({ task, onSuccess }) => {
  const { addTask, updateTask } = useTasks();
  const { closeTaskDialog } = useUI();

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

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

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const validate = () => {
    const temp = {};
    if (!formData.title.trim()) temp.title = "Title is required";
    if (!formData.dueDate) temp.dueDate = "Please select a due date";
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Stop page from refreshing
    if (!validate()) return;

    if (task && task.id) {
      updateTask(task.id, formData);
    } else {
      addTask(formData);
    }

    setFormData(initialState);
    if (onSuccess) onSuccess();
    else closeTaskDialog();
  };

  const formFieldStyles = {
    "& .MuiOutlinedInput-root": {
      color: "text.primary",
      borderRadius: "14px",
      bgcolor: "background.paper",
      transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
      "& fieldset": { borderColor: "divider", borderWidth: "1px" },
      "&:hover fieldset": { borderColor: (theme) => alpha(theme.palette.text.primary, 0.2) },
      "&.Mui-focused fieldset": { borderColor: "primary.main", borderWidth: "2px" },
      "&.Mui-focused": { boxShadow: (theme) => `0 0 0 4px ${alpha(theme.palette.primary.main, 0.08)}` },
    },
    "& .MuiInputLabel-root": { color: "text.secondary", fontWeight: 600, fontSize: "0.9rem", "&.Mui-focused": { color: "primary.main" } },
    "& .MuiFormHelperText-root": { fontWeight: 600, mt: 0.75, mx: 1.5 }
  };

  const dropdownMenuProps = {
    MenuProps: {
      PaperProps: {
        sx: {
          borderRadius: "16px",
          border: "1px solid",
          borderColor: "divider",
          boxShadow: (theme) => theme.palette.mode === "dark" ? "0 8px 24px rgba(0,0,0,0.4)" : "0 8px 24px rgba(15,23,42,0.04)"
        }
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Grid container spacing={3}>
        {/* TITLE */}
        <Grid item xs={12}>
          <TextField
            label="Task Title"
            name="title"
            placeholder="What needs to be done?"
            fullWidth
            value={formData.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
            sx={formFieldStyles}
          />
        </Grid>

        {/* DESCRIPTION */}
        <Grid item xs={12}>
          <TextField
            label="Description"
            name="description"
            placeholder="Add task notes..."
            multiline
            rows={4}
            fullWidth
            value={formData.description}
            onChange={handleChange}
            sx={formFieldStyles}
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
            sx={formFieldStyles}
            SelectProps={dropdownMenuProps}
          >
            {categories.map((item) => (
              <MenuItem key={item} value={item} sx={{ fontWeight: 500, fontSize: "0.9rem", color: "text.primary" }}>
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
            sx={formFieldStyles}
            SelectProps={dropdownMenuProps}
          >
            {priorities.map((item) => (
              <MenuItem key={item} value={item} sx={{ fontWeight: 500, fontSize: "0.9rem", color: "text.primary" }}>
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
            sx={{ ...formFieldStyles, "& input": { color: "text.primary" } }}
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid>

        {/* ================= FIXED ACTION ROW SECTOR ================= */}
        {/* Buttons are nested inside the form to avoid any remote submit button failures */}
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="outlined"
              onClick={closeTaskDialog}
              sx={{
                borderRadius: "24px",
                textTransform: "none",
                fontWeight: 700,
                fontSize: "0.9rem",
                px: 3.5,
                py: 1,
                color: "text.secondary",
                borderColor: "divider",
                "&:hover": { bgcolor: "action.hover", color: "text.primary" }
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit" // Directly submits the form element container natively
              sx={{
                borderRadius: "24px",
                textTransform: "none",
                fontWeight: 700,
                fontSize: "0.9rem",
                px: 4,
                py: 1,
                boxShadow: "none"
              }}
            >
              {task ? "Save Changes" : "Create Task"}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaskForm;
