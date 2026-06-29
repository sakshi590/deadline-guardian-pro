import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Button,
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
      maxWidth="md"
      scroll="paper"
      PaperProps={{
        sx: {
          borderRadius: 4,
          overflow: "hidden",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          py: 2,
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          {taskMode === "edit"
            ? "Edit Task"
            : "Create New Task"}
        </Typography>

        <IconButton onClick={closeTaskDialog}>
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ pt: 3 }}>
        <TaskForm
          task={
            taskMode === "edit"
              ? selectedTask
              : null
          }
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          variant="outlined"
          onClick={closeTaskDialog}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDialog;