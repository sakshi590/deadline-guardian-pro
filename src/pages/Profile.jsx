// src/pages/Profile.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
  alpha, 
} from "@mui/material";

import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import LockResetRoundedIcon from "@mui/icons-material/LockResetRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

import { useAuth } from "../context/AuthContext";

import ProfileHeader from "../components/profile/ProfileHeader";
import AvatarUploader from "../components/profile/AvatarUploader";
import ProfileInfoCard from "../components/profile/ProfileInfoCard";
import ProfileStats from "../components/profile/ProfileStats";
import ChangePasswordDialog from "../components/profile/ChangePasswordDialog";
import DeleteAccountDialog from "../components/profile/DeleteAccountDialog";

const MotionPaper = motion.create ? motion.create(Paper) : motion(Paper);

const Profile = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully.");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed.");
    }
  };

  const panelCardStyles = {
    p: { xs: 3, md: 4 },
    borderRadius: "24px", 
    bgcolor: "background.paper", 
    border: "1px solid",
    borderColor: "divider", 
    boxShadow: (theme) => theme.palette.mode === "dark" 
      ? "0 10px 30px rgba(0, 0, 0, 0.3)" 
      : "0 10px 30px rgba(0, 0, 0, 0.01)",
    height: "100%",
  };

  const actionButtonStyles = {
    py: 1.4,
    borderRadius: "24px", 
    textTransform: "none",
    fontWeight: 700,
    fontSize: "0.95rem",
    boxShadow: "none",
    transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: "1400px", mx: "auto" }}>
      <Grid container spacing={3.5}>
        {/* Banner Section */}
        {/* ✅ FIXED: Removed the invalid boolean 'item' attribute prop to prevent console logging pollution */}
        <Grid xs={12}>
          <ProfileHeader />
        </Grid>

        {/* Avatar Card */}
        {/* ✅ FIXED: Removed the invalid boolean 'item' attribute prop to prevent console logging pollution */}
        <Grid xs={12} md={4}>
          <MotionPaper
            elevation={0}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            sx={panelCardStyles}
          >
            <AvatarUploader />
          </MotionPaper>
        </Grid>

        {/* Form Information Card */}
        {/* ✅ FIXED: Removed the invalid boolean 'item' attribute prop to prevent console logging pollution */}
        <Grid xs={12} md={8}>
          <ProfileInfoCard />
        </Grid>

        {/* Stats Section */}
        {/* ✅ FIXED: Removed the invalid boolean 'item' attribute prop to prevent console logging pollution */}
        <Grid xs={12}>
          <ProfileStats />
        </Grid>

        {/* Security Segment */}
        {/* ✅ FIXED: Removed the invalid boolean 'item' attribute prop to prevent console logging pollution */}
        <Grid xs={12} md={6}>
          <MotionPaper elevation={0} sx={panelCardStyles}>
            <Typography variant="h6" fontWeight={800} sx={{ color: "text.primary", mb: 0.5, letterSpacing: "-0.01em" }}>
              Security Settings
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 3.5, fontWeight: 500 }}>
              Manage authorization protocols and update system access codes.
            </Typography>

            <Divider sx={{ mb: 4, borderColor: "divider" }} />

            <Button
              fullWidth
              variant="contained"
              startIcon={<LockResetRoundedIcon sx={{ fontSize: 18 }} />}
              onClick={() => setPasswordDialogOpen(true)}
              sx={{
                ...actionButtonStyles,
                bgcolor: "primary.main", 
                color: "primary.contrastText",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              }}
            >
              Change Password
            </Button>
          </MotionPaper>
        </Grid>

        {/* Account Termination Segment */}
        {/* ✅ FIXED: Removed the invalid boolean 'item' attribute prop to prevent console logging pollution */}
        <Grid xs={12} md={6}>
          <MotionPaper elevation={0} sx={panelCardStyles}>
            <Typography variant="h6" fontWeight={800} sx={{ color: "text.primary", mb: 0.5, letterSpacing: "-0.01em" }}>
              Account Management
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 3.5, fontWeight: 500 }}>
              Control global application state lifecycles or wipe database profiles.
            </Typography>

            <Divider sx={{ mb: 4, borderColor: "divider" }} />

            {/* ✅ FIXED: Handled layout arrangement properties via theme-safe sx styling parameters */}
            <Stack spacing={2} sx={{ flexDirection: "column" }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<LogoutRoundedIcon sx={{ fontSize: 18 }} />}
                onClick={handleLogout}
                sx={{
                  ...actionButtonStyles,
                  color: "primary.main",
                  borderColor: "primary.main",
                  borderWidth: "1.5px",
                  "&:hover": {
                    borderWidth: "1.5px",
                    borderColor: "primary.dark",
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
                  },
                }}
              >
                Sign Out of System
              </Button>

              <Button
                fullWidth
                variant="contained"
                startIcon={<DeleteForeverRoundedIcon sx={{ fontSize: 18 }} />}
                onClick={() => setDeleteDialogOpen(true)}
                sx={{
                  ...actionButtonStyles,
                  bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
                  color: "error.main",
                  border: "1px solid",
                  borderColor: (theme) => alpha(theme.palette.error.main, 0.2),
                  "&:hover": {
                    bgcolor: "error.main",
                    color: "error.contrastText",
                  },
                }}
              >
                Terminate Permanent Profile
              </Button>
            </Stack>
          </MotionPaper>
        </Grid>
      </Grid>

      <ChangePasswordDialog open={passwordDialogOpen} onClose={() => setPasswordDialogOpen(false)} />
      <DeleteAccountDialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} />
    </Box>
  );
};

export default Profile;
