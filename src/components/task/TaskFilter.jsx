// src/components/task/TaskFilter.jsx
import {
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  OutlinedInput,
  alpha,
} from "@mui/material";

const priorities = ["All", "High", "Medium", "Low"];
const statuses = ["All", "Pending", "In Progress", "Completed"];
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

const TaskFilter = ({ filters, setFilters }) => {
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

  // Reusable selector styling system to match your premium Light SaaS inputs
  const selectMenuStyles = {
    "& .MuiOutlinedInput-root": {
      color: "text.primary",
      borderRadius: "24px", // ✅ UPDATED: Smooth capsule curve family look
      bgcolor: "background.paper",
      transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
      "& fieldset": {
        borderColor: "divider",
        borderWidth: "1px",
      },
      "&:hover fieldset": {
        borderColor: (theme) => alpha(theme.palette.text.primary, 0.2),
      },
      "&.Mui-focused fieldset": {
        borderColor: "primary.main",
        borderWidth: "2px",
      },
      "&.Mui-focused": {
        boxShadow: (theme) => `0 0 0 4px ${alpha(theme.palette.primary.main, 0.08)}`,
      },
    },
    "& .MuiInputLabel-root": {
      color: "text.secondary",
      fontWeight: 600,
      fontSize: "0.9rem",
      px: 1, // Safe padding offset for rounded corners
      "&.Mui-focused": {
        color: "primary.main",
      },
    },
  };

  return (
    <Stack
      direction={{
        xs: "column",
        md: "row",
      }}
      spacing={2}
      sx={{ mb: 1 }}
    >
      <FormControl fullWidth sx={selectMenuStyles}>
        <InputLabel shrink id="priority-select-label">Priority</InputLabel>
        <Select
          labelId="priority-select-label"
          value={filters.priority}
          // ✅ FIXED: Injected explicit OutlinedInput element to cleanly host the notched label alignment without cutting border lines
          input={<OutlinedInput label="Priority" notched />}
          onChange={handleChange("priority")}
          MenuProps={{
            PaperProps: {
              sx: {
                borderRadius: "16px",
                border: "1px solid",
                borderColor: "divider",
                boxShadow: (theme) => theme.palette.mode === "dark" ? "0 8px 24px rgba(0,0,0,0.4)" : "0 8px 24px rgba(15,23,42,0.04)"
              }
            }
          }}
        >
          {priorities.map((item) => (
            <MenuItem key={item} value={item} sx={{ fontWeight: 500, fontSize: "0.9rem", color: "text.primary" }}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={selectMenuStyles}>
        <InputLabel shrink id="status-select-label">Status</InputLabel>
        <Select
          labelId="status-select-label"
          value={filters.status}
          // ✅ FIXED: Injected explicit OutlinedInput element to cleanly host the notched label alignment without cutting border lines
          input={<OutlinedInput label="Status" notched />}
          onChange={handleChange("status")}
          MenuProps={{
            PaperProps: {
              sx: {
                borderRadius: "16px",
                border: "1px solid",
                borderColor: "divider",
                boxShadow: (theme) => theme.palette.mode === "dark" ? "0 8px 24px rgba(0,0,0,0.4)" : "0 8px 24px rgba(15,23,42,0.04)"
              }
            }
          }}
        >
          {statuses.map((item) => (
            <MenuItem key={item} value={item} sx={{ fontWeight: 500, fontSize: "0.9rem", color: "text.primary" }}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={selectMenuStyles}>
        <InputLabel shrink id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          value={filters.category}
          // ✅ FIXED: Injected explicit OutlinedInput element to cleanly host the notched label alignment without cutting border lines
          input={<OutlinedInput label="Category" notched />}
          onChange={handleChange("category")}
          MenuProps={{
            PaperProps: {
              sx: {
                borderRadius: "16px",
                border: "1px solid",
                borderColor: "divider",
                boxShadow: (theme) => theme.palette.mode === "dark" ? "0 8px 24px rgba(0,0,0,0.4)" : "0 8px 24px rgba(15,23,42,0.04)"
              }
            }
          }}
        >
          {categories.map((item) => (
            <MenuItem key={item} value={item} sx={{ fontWeight: 500, fontSize: "0.9rem", color: "text.primary" }}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* ================= CAPSULE RESET TRIGGER ================= */}
      <Button
        variant="outlined"
        onClick={resetFilters}
        sx={{
          minWidth: 140,
          height: 56,
          borderRadius: "24px", // ✅ UPDATED: Smooth pill button alignment
          textTransform: "none",
          fontWeight: 700,
          fontSize: "0.925rem",
          color: "text.secondary",
          borderColor: "divider",
          borderWidth: "1px",
          transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          "&:hover": {
            bgcolor: "action.hover",
            borderColor: (theme) => alpha(theme.palette.text.primary, 0.2),
            color: "text.primary",
            borderWidth: "1px",
          },
        }}
      >
        Reset Filters
      </Button>
    </Stack>
  );
};

export default TaskFilter;
