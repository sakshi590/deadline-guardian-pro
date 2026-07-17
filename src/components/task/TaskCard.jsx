// src/components/task/TaskCard.jsx
import {
  Card,
  CardContent,
  Typography,
  Stack,
  IconButton,
  Checkbox,
  Box,
  alpha,
} from "@mui/material";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";

import PriorityChip from "./PriorityChip";

import { useTasks } from "../../context/TaskContext";
import { useUI } from "../../context/UIContext";

const TaskCard = ({ task }) => {
  const { toggleComplete, setTaskToDelete } = useTasks();
  const { openTaskDialog, openConfirmDialog } = useUI();

  // ✅ CRITICAL CRASH PROTECTION FIX: Prevents "Cannot read properties of undefined" loops 
  if (!task || typeof task !== "object") return null;

  return (
    <Card
      onClick={() => toggleComplete(task.id)}
      elevation={0}
      sx={{
        borderRadius: "24px",
        cursor: "pointer",
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        "&:hover": {
          transform: "translateY(-3px)",
          borderColor: (theme) => alpha(theme.palette.text.primary, 0.15),
          boxShadow: (theme) => theme.palette.mode === "dark" 
            ? "0 12px 32px rgba(0,0,0,0.4)" 
            : "0 12px 32px rgba(15, 23, 42, 0.03)",
        },
      }}
    >
      <CardContent 
        onClick={(e) => e.stopPropagation()} 
        sx={{ p: 3, "&:last-child": { pb: 3 } }}
      >
        {/* ================= HEADER SECTOR ================= */}
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Checkbox
            checked={!!task.completed} // Coerces truthy values safely
            onChange={() => toggleComplete(task.id)}
            sx={{ p: 0, color: "text.secondary", "&.Mui-checked": { color: "success.main" } }}
          />
          <PriorityChip priority={task.priority} />
        </Stack>

        {/* ================= CONTENT AREA ================= */}
        <Typography
          variant="h6"
          fontWeight={800}
          sx={{
            mt: 2,
            color: "text.primary",
            letterSpacing: "-0.01em",
            lineHeight: 1.4,
            textDecoration: task.completed ? "line-through" : "none",
            opacity: task.completed ? 0.45 : 1,
          }}
        >
          {task.title || "Untitled Task"}
        </Typography>

        <Typography
          variant="body2"
          sx={{ mt: 1, color: "text.secondary", lineHeight: 1.6, fontWeight: 500, opacity: task.completed ? 0.45 : 1 }}
        >
          {task.description || ""}
        </Typography>

        {/* ================= CALENDAR DATE FIELD ================= */}
        <Stack direction="row" spacing={1} sx={{ mt: 3, color: "text.secondary", opacity: task.completed ? 0.45 : 1, alignItems: "center" }}>
          <CalendarMonthRoundedIcon sx={{ fontSize: 18, color: "text.secondary" }} />
          <Typography variant="caption" sx={{ fontWeight: 600, fontSize: "0.8rem" }}>
            {task.dueDate || "No Due Date"}
          </Typography>
        </Stack>

        <Box sx={{ mt: 2.5, borderTop: "1px solid", borderColor: "divider" }} />

        {/* ================= ACTION ROW SECTOR ================= */}
        <Stack direction="row" sx={{ justifyContent: "flex-end", spacing: 1, mt: 1.5 }}>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              openTaskDialog(task, "edit");
            }}
            sx={{ 
              color: "primary.main",
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
              p: 1,
              "&:hover": { bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12) }
            }}
          >
            <EditRoundedIcon sx={{ fontSize: 18 }} />
          </IconButton>

          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setTaskToDelete(task.id);
              openConfirmDialog();
            }}
            sx={{ 
              color: "error.main",
              bgcolor: (theme) => alpha(theme.palette.error.main, 0.05),
              p: 1,
              "&:hover": { bgcolor: (theme) => alpha(theme.palette.error.main, 0.12) }
            }}
          >
            <DeleteRoundedIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
