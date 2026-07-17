// src/components/task/TaskDialog.jsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { useUI } from "../../context/UIContext";
import TaskForm from "./TaskForm";

const TaskDialog = () => {
  const {
    taskDialogOpen,
    closeTaskDialog,
    selectedTask,
    taskMode,
  } = useUI();

  return (
    <Dialog
      open={taskDialogOpen}
      onClose={closeTaskDialog}
      fullWidth
      maxWidth="sm"
      scroll="paper"
      disableEnforceFocus
      closeAfterTransition
      PaperProps={{
        sx: {
          borderRadius: "24px",
          overflow: "hidden",
          bgcolor: "background.paper",
          backgroundImage: "none",
          border: "1px solid",
          borderColor: "divider",
          boxShadow: (theme) => theme.palette.mode === "dark" 
            ? "0 24px 70px rgba(0, 0, 0, 0.7)" 
            : "0 24px 70px rgba(15, 23, 42, 0.08)",
        },
      }}
    >
      {/* ================= MODAL HEADER SECTOR ================= */}
      <DialogTitle
        component="div"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          py: 2.5,
          px: 3,
          bgcolor: "background.paper",
        }}
      >
        <Typography 
          variant="h5" 
          fontWeight={800}
          sx={{ color: "text.primary", letterSpacing: "-0.02em" }}
        >
          {taskMode === "edit" ? "Edit Task" : "Create New Task"}
        </Typography>

        <IconButton 
          onClick={closeTaskDialog}
          sx={{ 
            color: "text.secondary",
            "&:hover": { bgcolor: "action.hover", color: "text.primary" }
          }}
        >
          <CloseRoundedIcon sx={{ fontSize: 22 }} />
        </IconButton>
      </DialogTitle>

      <Divider sx={{ borderColor: "divider" }} />

      {/* ================= FORM BODY REGION ================= */}
      <DialogContent sx={{ p: 3, bgcolor: "background.paper" }}>
        {/* ✅ FIXED: Safely passes selected task dataset object or null parameters down to form controls */}
        <TaskForm
          task={taskMode === "edit" ? selectedTask : null}
          onSuccess={closeTaskDialog}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TaskDialog;
