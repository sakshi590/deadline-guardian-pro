// src/components/auth/GradientButton.jsx
import { Button, alpha } from "@mui/material";
import { useTheme } from "@mui/material/styles"; 
import { motion } from "framer-motion";

// ✅ FIXED: Safely maps the creation component depending on your exact local package engine version version
const MotionButton = typeof motion.create === "function" 
  ? motion.create(Button) 
  : motion.hasOwnProperty("create") 
    ? motion["create"](Button) 
    : motion(Button); 

const GradientButton = ({
  children,
  onClick,
  type = "button",
  fullWidth = false,
  startIcon,
  endIcon,
  disabled = false,
  size = "large",
  sx = {},
}) => {
  const theme = useTheme();

  return (
    <MotionButton
      type={type}
      fullWidth={fullWidth}
      size={size}
      variant="contained"
      disableElevation
      startIcon={startIcon}
      endIcon={endIcon}
      disabled={disabled}
      onClick={onClick}
      whileHover={{
        scale: disabled ? 1 : 1.015, 
      }}
      whileTap={{
        scale: disabled ? 1 : 0.98,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 15
      }}
      sx={{
        py: 1.5,
        px: 4,
        borderRadius: "24px", 
        textTransform: "none",
        fontWeight: 700,
        fontSize: "0.925rem",
        letterSpacing: "-0.01em",
        
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        color: "primary.contrastText",
        boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.25)}`,
        transition: "box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease, border-color 0.3s ease",
        
        "&::after": { 
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          padding: "1px",
          background: "linear-gradient(to bottom, rgba(255,255,255,0.18), transparent)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          pointerEvents: "none"
        },

        "&:hover": {
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          boxShadow: `0 12px 32px ${alpha(theme.palette.primary.main, 0.4)}`,
        },
        
        "&.Mui-disabled": {
          background: (theme) => theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.05)" : "action.disabledBackground",
          color: "text.disabled",
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "none",
        },
        ...sx,
      }}
    >
      {children}
    </MotionButton>
  );
};

export default GradientButton;
