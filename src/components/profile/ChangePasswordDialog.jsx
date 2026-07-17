// src/components/profile/ChangePasswordDialog.jsx
import { useState } from "react";
import toast from "react-hot-toast";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  alpha, 
} from "@mui/material";

import LockResetRoundedIcon from "@mui/icons-material/LockResetRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

import { useAuth } from "../../context/AuthContext";

const ChangePasswordDialog = ({ open, onClose }) => {
  const { changePassword } = useAuth(); 
  const [loading, setLoading] = useState(false);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearForm = () => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleClose = () => {
    clearForm();
    onClose();
  };

   const handleSave = async () => {
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      toast.error("Please fill all fields.");
      return;
    }

    // ✅ CHECK THIS LINE: It must be clean text exactly like this:
    if (formData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }


    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await changePassword(formData.currentPassword, formData.newPassword);
      toast.success("Password changed successfully.");
      handleClose();
    } catch (error) {
      toast.error(error.message || "Failed to change password.");
    } finally {
      setLoading(false);
    }
  };

  const dialogInputStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "14px", 
      transition: "all 0.2s ease-in-out",
      "& fieldset": {
        borderColor: (theme) => alpha(theme.palette.text.primary, 0.1),
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
      "&.Mui-focused": {
        color: "primary.main",
      },
    },
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
        <Stack spacing={1.5} sx={{ direction: "row", alignItems: "center" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06),
              color: "primary.main",
              width: 38,
              height: 38,
              borderRadius: "10px", 
              border: "1px solid",
              borderColor: (theme) => alpha(theme.palette.primary.main, 0.15),
            }}
          >
            <LockResetRoundedIcon sx={{ fontSize: 20 }} />
          </Box>
          <Typography variant="subtitle1" fontWeight={800} sx={{ color: "text.primary", letterSpacing: "-0.01em" }}>
            Change Password
          </Typography>
        </Stack>
      </DialogTitle>

      {/* ================= FORM CONTENT REGION ================= */}
      <DialogContent sx={{ px: 3, py: 1 }}>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 3, fontWeight: 500, lineHeight: 1.5 }}>
          Ensure your account stays protected by using a unique combination of characters.
        </Typography>

        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Current Password"
            name="currentPassword"
            placeholder="••••••••"
            type={showOldPassword ? "text" : "password"}
            value={formData.currentPassword}
            onChange={handleChange}
            sx={dialogInputStyles}
            disabled={loading}
            slotProps={{
              inputLabel: { shrink: true },
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowOldPassword((prev) => !prev)}
                      sx={{ color: "text.secondary" }}
                    >
                      {showOldPassword ? <VisibilityOffRoundedIcon sx={{ fontSize: 18 }} /> : <VisibilityRoundedIcon sx={{ fontSize: 18 }} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            }}
          />

          <TextField
            fullWidth
            label="New Password"
            name="newPassword"
            placeholder="••••••••"
            type={showNewPassword ? "text" : "password"}
            value={formData.newPassword}
            onChange={handleChange}
            sx={dialogInputStyles}
            disabled={loading}
            slotProps={{
              inputLabel: { shrink: true },
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowNewPassword((prev) => !prev)}
                      sx={{ color: "text.secondary" }}
                    >
                      {showNewPassword ? <VisibilityOffRoundedIcon sx={{ fontSize: 18 }} /> : <VisibilityRoundedIcon sx={{ fontSize: 18 }} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            }}
          />

          <TextField
            fullWidth
            label="Confirm New Password"
            name="confirmPassword"
            placeholder="••••••••"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            sx={dialogInputStyles}
            disabled={loading}
            slotProps={{
              inputLabel: { shrink: true },
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      sx={{ color: "text.secondary" }}
                    >
                      {showConfirmPassword ? <VisibilityOffRoundedIcon sx={{ fontSize: 18 }} /> : <VisibilityRoundedIcon sx={{ fontSize: 18 }} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            }}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, pt: 2, gap: 1 }}>
        <Button 
          onClick={handleClose} 
          disabled={loading}
          sx={{ borderRadius: "24px", textTransform: "none", fontWeight: 700, color: "text.secondary" }}
        >
          Cancel
        </Button>
        <Button 
          variant="contained" 
          onClick={handleSave} 
          disabled={loading}
          sx={{ borderRadius: "24px", textTransform: "none", fontWeight: 700, px: 3 }}
        >
          {loading ? "Updating..." : "Update Password"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordDialog;
