// src/pages/Tasks.jsx

import { useMemo, useState } from "react";

import {
  Box,
  Fab,
  Stack,
  Typography,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";

import SearchBar from "../components/task/SearchBar";
import TaskFilter from "../components/task/TaskFilter";
import TaskList from "../components/task/TaskList";
import TaskDialog from "../components/task/TaskDialog";

import { useTasks } from "../context/TaskContext";
import { useUI } from "../context/UIContext";

const Tasks = () => {
  const { tasks } = useTasks();
  const { openTaskDialog } = useUI();

  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    priority: "All",
    status: "All",
    category: "All",
  });

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        task.description
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesPriority =
        filters.priority === "All" ||
        task.priority === filters.priority;

      const matchesStatus =
        filters.status === "All" ||
        task.status === filters.status;

      const matchesCategory =
        filters.category === "All" ||
        task.category === filters.category;

      return (
        matchesSearch &&
        matchesPriority &&
        matchesStatus &&
        matchesCategory
      );
    });
  }, [tasks, search, filters]);

  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight={700}
        mb={3}
      >
        My Tasks
      </Typography>

      <Stack spacing={3}>
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

      <Fab
        color="primary"
        onClick={() => openTaskDialog()}
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          boxShadow: 8,
        }}
      >
        <AddRoundedIcon />
      </Fab>

      <TaskDialog />
    </Box>
  );
};

export default Tasks;