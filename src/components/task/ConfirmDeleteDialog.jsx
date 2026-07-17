// src/components/task/ConfirmDeleteDialog.jsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

import { useUI } from "../../context/UIContext";
import { useTasks } from "../../context/TaskContext";

const ConfirmDeleteDialog = () => {
  const { confirmDialogOpen, closeConfirmDialog } = useUI();
  const { taskToDelete, deleteTask } = useTasks();

  const handleConfirmDelete = async () => {
    await deleteTask(taskToDelete); // Performs the Firestore removal
    closeConfirmDialog(); // Closes the modal safely
  };

  return (
    <Dialog
      open={confirmDialogOpen}
      onClose={closeConfirmDialog}
      disableEnforceFocus
      closeAfterTransition
      PaperProps={{
        sx: {
          borderRadius: "24px",
          p: 1.5,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          boxShadow: (theme) => theme.palette.mode === "dark" 
            ? "0 24px 70px rgba(0, 0, 0, 0.7)" 
            : "0 24px 70px rgba(15, 23, 42, 0.08)",
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 800, fontSize: "1.25rem", color: "text.primary" }}>
        Delete Task permanently?
      </DialogTitle>
      
      <DialogContent>
        <DialogContentText sx={{ fontWeight: 500, fontSize: "0.95rem", color: "text.secondary" }}>
          Are you sure you want to delete this task? This action is permanent and cannot be undone.
        </DialogContentText>
      </DialogContent>
      
      <DialogActions sx={{ gap: 1, px: 3, pb: 2 }}>
        <Button 
          onClick={closeConfirmDialog}
          sx={{ borderRadius: "24px", textTransform: "none", fontWeight: 700, color: "text.secondary" }}
        >
          Cancel
        </Button>
        <Button 
          variant="contained"
          color="error"
          onClick={handleConfirmDelete}
          sx={{ borderRadius: "24px", textTransform: "none", fontWeight: 700, boxShadow: "none" }}
          autoFocus
        >
          Delete Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
