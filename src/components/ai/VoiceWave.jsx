// src/components/ai/VoiceWave.jsx
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles"; 

const VoiceWave = ({ active = false, color }) => {
  const theme = useTheme();

  // Dynamically falls back to the current active theme color token instead of a static hex string
  const activeWaveColor = color || theme.palette.primary.main;

  return (
    <>
      <style>
        {`
          @keyframes bounceWave {
            0%, 100% { transform: scaleY(0.25); }
            50% { transform: scaleY(1); }
          }
        `}
      </style>

      {/* Main Structural Flex Wrapper */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "6px",
          height: 40,
          width: "100%",
          my: 1.5
        }}
      >
        {[1, 2, 3, 4, 5].map((bar) => (
          <Box
            key={bar}
            sx={{
              width: 4,
              height: 28, 
              bgcolor: activeWaveColor, 
              borderRadius: "4px", 
              transformOrigin: "center",
              animation: active ? `bounceWave 0.75s ease-in-out infinite` : "none",
              animationDelay: `${bar * 0.12}s`, 
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              transform: active ? "none" : "scaleY(0.25)",
              opacity: active ? 1 : 0.45
            }}
          />
        ))}
      </Box>
    </>
  );
};

export default VoiceWave;
