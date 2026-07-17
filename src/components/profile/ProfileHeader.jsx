// src/components/profile/ProfileHeader.jsx
import {
  Avatar,
  Box,
  Button,
  Chip,
  LinearProgress,
  Paper,
  Stack,
  Typography,
  alpha, 
} from "@mui/material";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";

import { useAuth } from "../../context/AuthContext";

const ProfileHeader = ({ onEdit }) => {
  const { user } = useAuth();
  const profileCompletion = 90;

  // Safe string normalization extractor to pull initials flawlessly
  const initials =
    user?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "SGT";

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "24px", 
        overflow: "hidden",
        bgcolor: "background.paper", 
        border: "1px solid",
        borderColor: "divider", 
        boxShadow: (theme) => theme.palette.mode === "dark" 
          ? "0 10px 30px rgba(0, 0, 0, 0.3)" 
          : "0 10px 30px rgba(15, 23, 42, 0.01)",
      }}
    >
      {/* Dynamic Purple Header Background Block */}
      <Box sx={{ height: 140, background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)` }} />

      {/* ✅ FIXED: Restructured spacing blocks to completely resolve text overlaps */}
      <Box sx={{ px: { xs: 3, md: 4 }, pb: 4, pt: 0, position: "relative", zIndex: 2 }}>
        
        {/* Isolated Floating Avatar Squircle Placement Row */}
        <Box sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-start" }, mt: "-60px", mb: 2 }}>
          <Avatar
            src={user?.avatar}
            sx={{
              width: 110,
              height: 110,
              border: "4px solid",
              borderColor: "background.paper", 
              outline: "1px solid rgba(255, 255, 255, 0.2)",
              background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
              fontSize: 34,
              fontWeight: 800,
              color: "primary.contrastText",
              boxShadow: "0 12px 28px rgba(0, 0, 0, 0.15)",
            }}
          >
            {!user?.avatar && initials}
          </Avatar>
        </Box>

        {/* Core Profile Identity Details Grid Node Layer */}
        <Stack
          spacing={3}
          sx={{
            direction: { xs: "column", md: "row" },
            alignItems: { xs: "center", md: "flex-start" },
            justifyContent: "space-between",
            width: "100%"
          }}
        >
          {/* LEFT AREA: Personal Details */}
          <Stack spacing={1.5} sx={{ direction: "column", textAlign: { xs: "center", md: "left" }, minWidth: 0, flex: 1 }}>
            {/* Title Badge Matrix */}
            <Stack 
              spacing={1.5} 
              sx={{ 
                direction: { xs: "column", sm: "row" }, 
                alignItems: "center"
              }}
            >
              <Typography 
                variant="h5" 
                fontWeight={800} 
                sx={{ 
                  color: "text.primary", 
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2
                }}
              >
                {user?.name || "Sakshi Ganesh Thorat"}
              </Typography>
              
              <Chip
                icon={<WorkspacePremiumRoundedIcon sx={{ fontSize: "14px !important", color: "primary.main !important" }} />}
                label="Gemini AI Connected"
                sx={{
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08), 
                  color: "primary.main",
                  fontWeight: 700,
                  fontSize: "0.7rem",
                  height: "24px",
                  border: "1px solid",
                  borderColor: (theme) => alpha(theme.palette.primary.main, 0.2),
                  textTransform: "uppercase",
                  letterSpacing: "0.02em"
                }}
              />
            </Stack>

            {/* Email Contact Block */}
            <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 600, mt: 0.5 }}>
              {user?.email || "thoratsakshi093@gmail.com"}
            </Typography>

            {/* Technical Sub-Role Chip Indicator */}
            <Typography variant="caption" sx={{ color: "primary.main", fontWeight: 800, letterSpacing: "0.05em", textTransform: "uppercase", fontSize: "0.725rem", mt: 0.25 }}>
              Software Developer
            </Typography>
          </Stack>

          {/* RIGHT AREA: Completion Status + Actions */}
          <Stack 
            spacing={3} 
            sx={{ 
              alignItems: { xs: "center", md: "flex-end" }, 
              width: { xs: "100%", md: "280px" },
              mt: { xs: 1, md: 0 }
            }}
          >
            {/* Progress Completion Container Bar */}
            <Box width="100%">
              {/* ✅ FIXED: Reset colors to text.secondary to provide perfect contrast matching look */}
              <Stack sx={{ direction: "row", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
                  Profile Completion
                </Typography>
                <Typography variant="caption" sx={{ color: "text.primary", fontWeight: 800 }}>
                  {profileCompletion}%
                </Typography>
              </Stack>

              <LinearProgress
                variant="determinate"
                value={profileCompletion}
                sx={{
                  height: 6,
                  borderRadius: "10px",
                  bgcolor: (theme) => theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "#F1F5F9",
                  "& .MuiLinearProgress-bar": {
                    bgcolor: "primary.main",
                    borderRadius: "10px",
                  }
                }}
              />
            </Box>

            {/* Edit Trigger CTA button view panel */}
            <Button
              variant="contained"
              startIcon={<EditRoundedIcon sx={{ fontSize: 16 }} />}
              onClick={onEdit}
              sx={{
                width: { xs: "100%", sm: "auto" },
                py: 1.1,
                px: 3.5,
                borderRadius: "24px", 
                textTransform: "none",
                fontWeight: 700,
                fontSize: "0.875rem",
                bgcolor: "primary.main", 
                color: "primary.contrastText",
                boxShadow: "none",
                transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                "&:hover": {
                  bgcolor: "primary.dark",
                  transform: "translateY(-1px)"
                },
                "&:active": {
                  transform: "translateY(0)"
                }
              }}
            >
              Edit Profile
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
};

export default ProfileHeader;
