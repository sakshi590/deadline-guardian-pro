// src/pages/Tasks.jsx
import { useState } from "react";
import {
  Box,
  Fab,
  Stack,
  Typography,
  alpha,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";

import SearchBar from "../components/task/SearchBar";
import TaskFilter from "../components/task/TaskFilter";
import TaskList from "../components/task/TaskList";
import TaskDialog from "../components/task/TaskDialog";

// ✅ OVERLAYS INSTANTIATION IMPORTS (GlobalSnackbar removed completely to fix compiler crash)
import ConfirmDeleteDialog from "../components/task/ConfirmDeleteDialog";

// HOOKS ENGINE UPGRADES
import { useTasks } from "../context/TaskContext";
import { useUI } from "../context/UIContext";
import useTaskFilter from "../components/task/hooks/useTaskFilter";

const Tasks = () => {
  const { tasks } = useTasks();
  const { openTaskDialog } = useUI();

  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    priority: "All",
    status: "All",
    category: "All",
    sortBy: "dueDate",     
    sortOrder: "asc"
  });

  // Runs tasks through your custom query hook
  const filteredTasks = useTaskFilter(tasks, {
    search: search,
    priority: filters.priority,
    category: filters.category,
    status: filters.status,
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
  });

  return (
    <Box sx={{ maxWidth: "1400px", mx: "auto", position: "relative" }}>
      {/* ================= WORKSPACE PAGE HEADER ================= */}
      <Typography
        variant="h4"
        fontWeight={800}
        sx={{ 
          color: "text.primary",
          letterSpacing: "-0.025em", 
          mb: 4.5 
        }}
      >
        My Tasks
      </Typography>

      {/* ================= COMPONENT CONTROLLERS MATRIX ================= */}
      <Stack spacing={3.5}>
        <SearchBar
          value={search}
          onChange={setSearch}
        />

        <TaskFilter
          filters={filters}
          setFilters={setFilters}
        />

        <TaskList tasks={filteredTasks} />
      </Stack>

      {/* ================= THEME-ADAPTIVE FLOATING ACTION TRIGGER ================= */}
      <Fab
        color="primary"
        onClick={() => openTaskDialog(null, "create")} 
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
          bgcolor: "primary.main",
          color: "primary.contrastText",
          borderRadius: "16px",
          boxShadow: (theme) => theme.palette.mode === "dark" 
            ? `0 12px 32px rgba(0,0,0,0.5), 0 0 16px ${alpha(theme.palette.primary.main, 0.25)}` 
            : `0 12px 32px ${alpha(theme.palette.primary.main, 0.25)}`,
          transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
          "&:hover": {
            bgcolor: "primary.dark",
            transform: "translateY(-3px)",
            boxShadow: (theme) => theme.palette.mode === "dark" 
              ? `0 16px 40px rgba(0,0,0,0.6), 0 0 24px ${alpha(theme.palette.primary.main, 0.4)}` 
              : `0 16px 40px ${alpha(theme.palette.primary.main, 0.4)}`,
          },
          "&:active": {
            transform: "translateY(-1px)",
          }
        }}
      >
        <AddRoundedIcon sx={{ fontSize: 26 }} />
      </Fab>

      {/* ======================================================== */}
      {/* GLOBAL APPLICATION PORTAL WRAPPERS */}
      {/* ======================================================== */}
      <TaskDialog />
      
      {/* ✅ MOUNTED: Intercepts delete button actions to guard against data loss */}
      <ConfirmDeleteDialog />
    </Box>
  );
};

export default Tasks;
