// src/components/common/ConfirmDialog.jsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  Stack,
  alpha,
} from "@mui/material";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";

function ConfirmDialog({
  open,
  title = "Confirm",
  message = "Are you sure?",
  onCancel,
  onConfirm,
}) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          bgcolor: "background.paper", // ✅ UPDATED: Seamless light/dark overlay card background surface
          backgroundImage: "none",
          borderRadius: "24px", // Matches your exact capsule curve layout family
          border: "1px solid",
          borderColor: "divider", // Theme adaptive separation frame line
          boxShadow: (theme) => theme.palette.mode === "dark" 
            ? "0 24px 70px rgba(0,0,0,0.6)" 
            : "0 24px 70px rgba(15, 23, 42, 0.08)",
          p: 1,
        }
      }}
    >
      {/* ================= HEADER SECTOR ================= */}
      <DialogTitle sx={{ pb: 1, pt: 3, px: 3 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: (theme) => alpha(theme.palette.error.main, 0.08), // Soft dynamic pastel alert tint replaces raw hex colors
              color: "error.main",
              width: 38,
              height: 38,
              borderRadius: "10px", // Squircle container badge
              border: "1px solid",
              borderColor: (theme) => alpha(theme.palette.error.main, 0.15),
            }}
          >
            <ErrorOutlineRoundedIcon sx={{ fontSize: 20 }} />
          </Box>
          <Typography variant="subtitle1" fontWeight={800} sx={{ color: "text.primary", letterSpacing: "-0.01em" }}>
            {title}
          </Typography>
        </Stack>
      </DialogTitle>

      {/* ================= INFORMATIVE CONTAINER ================= */}
      <DialogContent sx={{ px: 3, py: 1 }}>
        <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6, fontWeight: 500 }}>
          {message}
        </Typography>
      </DialogContent>

      {/* ================= PILL-SHAPED ACTION FOOTER BUTTONS ================= */}
      <DialogActions sx={{ px: 3, pb: 3, pt: 2, gap: 1 }}>
        <Button 
          onClick={onCancel}
          sx={{
            color: "text.secondary",
            textTransform: "none",
            fontWeight: 700,
            borderRadius: "24px", // Matches your rounded capsule layout family
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
          disableElevation
          onClick={onConfirm}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            borderRadius: "24px", // Perfect pill shaped layout action trigger button alignment
            fontSize: "0.875rem",
            px: 4,
            py: 1.1,
            bgcolor: "error.main",
            color: "error.contrastText",
            transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
            "&:hover": {
              bgcolor: "error.dark",
              transform: "translateY(-1px)",
              boxShadow: (theme) => `0 4px 12px ${alpha(theme.palette.error.main, 0.2)}`
            },
            "&:active": {
              transform: "translateY(0)"
            }
          }}
        >
          Confirm Action
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
