// src/components/task/TaskFilter.jsx

import {
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

const priorities = [
  "All",
  "High",
  "Medium",
  "Low",
];

const statuses = [
  "All",
  "Pending",
  "In Progress",
  "Completed",
];

const categories = [
  "All",
  "General",
  "Study",
  "Work",
  "Personal",
  "Meeting",
  "Project",
  "Assignment",
];

const TaskFilter = ({
  filters,
  setFilters,
}) => {
  const handleChange = (field) => (event) => {
    setFilters({
      ...filters,
      [field]: event.target.value,
    });
  };

  const resetFilters = () => {
    setFilters({
      priority: "All",
      status: "All",
      category: "All",
    });
  };

  return (
    <Stack
      direction={{
        xs: "column",
        md: "row",
      }}
      spacing={2}
      sx={{ mb: 3 }}
    >
      <FormControl fullWidth>
        <InputLabel>Priority</InputLabel>

        <Select
          value={filters.priority}
          label="Priority"
          onChange={handleChange("priority")}
        >
          {priorities.map((item) => (
            <MenuItem
              key={item}
              value={item}
            >
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>

        <Select
          value={filters.status}
          label="Status"
          onChange={handleChange("status")}
        >
          {statuses.map((item) => (
            <MenuItem
              key={item}
              value={item}
            >
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>

        <Select
          value={filters.category}
          label="Category"
          onChange={handleChange("category")}
        >
          {categories.map((item) => (
            <MenuItem
              key={item}
              value={item}
            >
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="outlined"
        onClick={resetFilters}
        sx={{
          minWidth: 140,
          height: 56,
        }}
      >
        Reset
      </Button>
    </Stack>
  );
};

export default TaskFilter;