// src/components/auth/GoogleButton.jsx
import { Button, Box, Typography, alpha } from "@mui/material";

const GoogleButton = ({
  onClick,
  disabled = false,
  fullWidth = true,
}) => {
  return (
    <Button
      fullWidth={fullWidth}
      variant="outlined"
      disabled={disabled}
      onClick={onClick}
      sx={{
        py: 1.3, // Polished padding for premium button sizing harmony
        borderRadius: "24px", // ✅ UPDATED: Smooth pill capsule curve family look button alignment
        textTransform: "none",
        fontSize: "0.925rem",
        
        // ✅ UPDATED: Context-aware styling mappings replacing raw dark-mode absolute configurations
        color: "text.primary",
        borderColor: "divider",
        bgcolor: (theme) => theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.02)" : "background.paper",
        backdropFilter: "blur(8px)",
        transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",

        "&:hover": {
          bgcolor: "action.hover",
          borderColor: (theme) => alpha(theme.palette.text.primary, 0.2),
          transform: "translateY(-1px)",
          boxShadow: (theme) => theme.palette.mode === "dark"
            ? "0 4px 12px rgba(0, 0, 0, 0.3)"
            : `0 4px 12px ${alpha(theme.palette.text.primary, 0.03)}`,
        },

        "&.Mui-disabled": {
          bgcolor: (theme) => theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.01)" : "action.disabledBackground",
          borderColor: "divider",
          color: "text.disabled",
          opacity: 0.6,
        },
      }}
    >
      <Box
        component="img"
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google"
        sx={{
          width: 18,
          height: 18,
          mr: 1.5,
          flexShrink: 0
        }}
      />

      <Typography
        fontWeight={700} // Upgraded weight for premium brand harmony profile
        sx={{ fontSize: "inherit", letterSpacing: "-0.01em" }}
      >
        Continue with Google
      </Typography>
    </Button>
  );
};

export default GoogleButton;
