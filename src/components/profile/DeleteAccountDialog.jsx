// src/components/profile/DeleteAccountDialog.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  Box,
  alpha, 
} from "@mui/material";

import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

import { useAuth } from "../../context/AuthContext";

const DeleteAccountDialog = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { deleteAccount } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteAccount();
      toast.success("Account deleted successfully.");
      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to delete account.");
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: "background.paper", 
          backgroundImage: "none",
          borderRadius: "24px", 
          border: "1px solid",
          borderColor: "divider",
          boxShadow: (theme) => theme.palette.mode === "dark" 
            ? "0 24px 70px rgba(0,0,0,0.6)" 
            : "0 24px 70px rgba(15, 23, 42, 0.08)",
          p: 1,
        }
      }}
    >
      {/* ================= HEADER SECTOR ================= */}
      <DialogTitle sx={{ pb: 1, pt: 3, px: 3 }}>
        {/* ✅ FIXED: Transferred raw layout properties into theme-safe sx style configurations */}
        <Stack 
          spacing={1.5} 
          sx={{ 
            direction: "row", 
            alignItems: "center" 
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: (theme) => alpha(theme.palette.error.main, 0.08), 
              color: "error.main",
              width: 38,
              height: 38,
              borderRadius: "10px", 
              border: "1px solid",
              borderColor: (theme) => alpha(theme.palette.error.main, 0.15),
            }}
          >
            <WarningAmberRoundedIcon sx={{ fontSize: 20 }} />
          </Box>
          <Typography variant="subtitle1" fontWeight={800} sx={{ color: "text.primary", letterSpacing: "-0.01em" }}>
            Delete Account
          </Typography>
        </Stack>
      </DialogTitle>

      {/* ================= INFORMATIVE LAYOUT CONTAINER ================= */}
      <DialogContent sx={{ px: 3, py: 1 }}>
        <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6, mb: 2.5, fontWeight: 500 }}>
          This action is absolute and permanent. Once processed, it cannot be reversed.
        </Typography>

        <Box 
          sx={{ 
            bgcolor: (theme) => theme.palette.mode === "dark" ? alpha(theme.palette.error.main, 0.05) : alpha(theme.palette.error.main, 0.02),
            p: 2.5, 
            borderRadius: "16px", 
            border: "1px solid",
            borderColor: (theme) => alpha(theme.palette.error.main, 0.12),
            mb: 2.5
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "error.main", lineHeight: 1.6, fontWeight: 600 }} 
          >
            All your tasks, structural analytics summaries, system presets, and profile configurations will be completely removed from our servers.
          </Typography>
        </Box>

        <Typography variant="body2" sx={{ color: "text.primary", fontWeight: 700 }}>
          Are you completely sure you want to continue with profile termination?
        </Typography>
      </DialogContent>

      {/* ================= PILL-SHAPED ACTION FOOTER BUTTONS ================= */}
      <DialogActions sx={{ px: 3, pb: 3, pt: 2, gap: 1 }}>
        <Button
          onClick={onClose}
          disabled={loading}
          sx={{
            color: "text.secondary",
            textTransform: "none",
            fontWeight: 700,
            borderRadius: "24px", 
            fontSize: "0.875rem",
            px: 3,
            py: 1.1,
            "&:hover": {
              bgcolor: "action.hover",
              color: "text.primary",
            }
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleDelete}
          disabled={loading}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            borderRadius: "24px", 
            fontSize: "0.875rem",
            px: 4,
            py: 1.1,
            bgcolor: "error.main",
            color: "error.contrastText",
            boxShadow: "none",
            "&:hover": {
              bgcolor: "error.dark",
            },
            "&.Mui-disabled": {
              bgcolor: (theme) => theme.palette.mode === 'dark' ? "rgba(255,255,255,0.05)" : "#F1F5F9", 
              color: "text.disabled"
            }
          }}
        >
          {loading ? "Deleting..." : "Delete Account"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAccountDialog;
