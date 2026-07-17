// src/components/ai/VoiceButton.jsx
import { Fab, Tooltip, Box, alpha } from "@mui/material";
import { useTheme } from "@mui/material/styles"; 

import MicRoundedIcon from "@mui/icons-material/MicRounded";
import StopRoundedIcon from "@mui/icons-material/StopRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";

const VoiceButton = ({ state = "idle", onClick }) => {
  const theme = useTheme();

  // Maps statuses strictly to theme variables to support fluid cross-mode toggling safely
  const getColorKey = () => {
    switch (state) {
      case "listening": return "error.main";
      case "thinking": return "warning.main";
      case "speaking": return "success.main";
      default: return "primary.main";
    }
  };

  const getIcon = () => {
    switch (state) {
      case "listening": return <StopRoundedIcon sx={{ fontSize: 18 }} />;
      case "thinking": return <MicRoundedIcon sx={{ fontSize: 18, animation: "voicePulse 1s infinite" }} />;
      case "speaking": return <VolumeUpRoundedIcon sx={{ fontSize: 18 }} />;
      default: return <MicRoundedIcon sx={{ fontSize: 18 }} />;
    }
  };

  const getTooltip = () => {
    switch (state) {
      case "listening": return "Stop Listening";
      case "thinking": return "AI is Thinking";
      case "speaking": return "AI is Speaking";
      default: return "Start Voice Conversation";
    }
  };

  const activeColorKey = getColorKey();
  const currentPaletteBase = activeColorKey.split(".")[0];
  
  // ✅ FIXED: Fallback rule structure added to prevent runtime crashes if palette variables ever experience loading latency
  const activeHexValue = theme.palette[currentPaletteBase]?.main || theme.palette.primary.main;

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {/* ================= REFINED ADAPTIVE ANIMATIONS OVERLAY ================= */}
      <style>
        {`
          @keyframes voicePulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          @keyframes voiceGlow {
            0% { box-shadow: 0 0 0 0 ${alpha(activeHexValue, 0.4)}; }
            70% { box-shadow: 0 0 0 12px ${alpha(activeHexValue, 0)}; }
            100% { box-shadow: 0 0 0 0 ${alpha(activeHexValue, 0)}; }
          }
        `}
      </style>

      <Tooltip title={getTooltip()} arrow placement="top">
        <Fab
          onClick={(e) => {
            // Stop events from bubbling up to prevent accidental browser form submittal triggers
            if (e) {
              e.preventDefault();
              e.stopPropagation();
            }
            if (onClick) onClick(e);
          }}
          size="small"
          type="button" 
          sx={{
            bgcolor: activeColorKey,
            color: (theme) => theme.palette[currentPaletteBase]?.contrastText || "#FFF", 
            width: 44, 
            height: 44,
            minHeight: 44,
            borderRadius: "14px", 
            animation: state === "idle" ? "none" : "voiceGlow 1.8s infinite cubic-bezier(0.24, 0, 0.38, 1)",
            transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
            boxShadow: "none",
            "& .MuiSvgIcon-root": { display: "block" },
            "&:hover": {
              bgcolor: activeColorKey,
              transform: "translateY(-1px) scale(1.04)",
              boxShadow: (theme) => `0 4px 12px ${alpha(theme.palette[currentPaletteBase]?.main || theme.palette.primary.main, 0.25)}`,
            },
            "&:active": {
              transform: "translateY(0) scale(0.98)"
            }
          }}
        >
          {getIcon()}
        </Fab>
      </Tooltip>
    </Box>
  );
};

export default VoiceButton;
