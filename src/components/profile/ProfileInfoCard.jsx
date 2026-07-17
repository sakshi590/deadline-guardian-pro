// src/components/profile/ProfileInfoCard.jsx
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
  alpha, 
} from "@mui/material";
import toast from "react-hot-toast"; 

import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

import { useAuth } from "../../context/AuthContext";

const ProfileInfoCard = () => {
  const { user, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    bio: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        college: user.college || "",
        bio: user.bio || "",
      });
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await updateProfile(formData);
      toast.success("Profile updated successfully."); 
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const infoInputStyles = {
    "& .MuiOutlinedInput-root": {
      color: "text.primary", 
      borderRadius: "14px", 
      bgcolor: "background.default", 
      transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
      "& fieldset": { borderColor: "divider", borderWidth: "1px" },
      "&:hover fieldset": { borderColor: (theme) => alpha(theme.palette.text.primary, 0.2) },
      "&.Mui-focused fieldset": {
        borderColor: "primary.main", 
        borderWidth: "2px",
      },
      "&.Mui-focused": {
        boxShadow: (theme) => `0 0 0 4px ${alpha(theme.palette.primary.main, 0.08)}`,
      },
      "&.Mui-disabled fieldset": { borderColor: "divider" },
      "&.Mui-disabled": { bgcolor: (theme) => theme.palette.mode === 'dark' ? "rgba(255,255,255,0.02)" : "action.hover", color: "text.disabled" }
    },
    "& .MuiInputLabel-root": {
      color: "text.secondary", 
      fontWeight: 600,
      fontSize: "0.9rem",
      "&.Mui-focused": { color: "primary.main" },
    },
  };

  return (
    <Card
      elevation={0} 
      sx={{
        borderRadius: "24px", 
        border: "1px solid",
        borderColor: "divider", 
        bgcolor: "background.paper", 
        height: "100%",
        boxShadow: (theme) => theme.palette.mode === "dark" 
          ? "0 10px 30px rgba(0, 0, 0, 0.3)" 
          : "0 10px 30px rgba(0, 0, 0, 0.02)",
      }}
    >
      <CardContent sx={{ p: { xs: 3, md: 4 }, "&:last-child": { pb: { xs: 3, md: 4 } } }}>
        {/* ================= HEADER SECTOR ================= */}
        {/* ✅ FIXED: Transferred raw layout properties into theme-safe sx style configurations */}
        <Stack spacing={1.5} sx={{ direction: "row", alignItems: "center", mb: 1 }}>
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
            <PersonRoundedIcon sx={{ fontSize: 20 }} />
          </Box>
          <Typography variant="subtitle1" fontWeight={800} sx={{ color: "text.primary", letterSpacing: "-0.01em" }}>
            Personal Information
          </Typography>
        </Stack>

        <Typography variant="body2" sx={{ color: "text.secondary", mb: 3, pl: 5, fontWeight: 500, lineHeight: 1.5 }}>
          Update your public profile configuration metrics and contact properties.
        </Typography>

        <Divider sx={{ mb: 4, borderColor: "divider" }} />

        {/* ================= DATA GRID LIST FIELDS ================= */}
        {/* ✅ FIXED: Handled responsive grid layouts safely by extracting naked boolean parameters */}
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <TextField fullWidth label="Full Name" name="name" value={formData.name} onChange={handleChange} disabled={loading} sx={infoInputStyles} slotProps={{ inputLabel: { shrink: true } }} />
          </Grid>
          <Grid xs={12} md={6}>
            <TextField fullWidth label="Email Address" name="email" value={formData.email} disabled sx={infoInputStyles} slotProps={{ inputLabel: { shrink: true } }} />
          </Grid>
          <Grid xs={12} md={6}>
            <TextField fullWidth label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" disabled={loading} sx={infoInputStyles} slotProps={{ inputLabel: { shrink: true } }} />
          </Grid>
          <Grid xs={12} md={6}>
            <TextField fullWidth label="College / Institution" name="college" value={formData.college} onChange={handleChange} disabled={loading} sx={infoInputStyles} slotProps={{ inputLabel: { shrink: true } }} />
          </Grid>
          <Grid xs={12}>
            <TextField fullWidth multiline minRows={4} label="Bio / Professional Summary" name="bio" value={formData.bio} onChange={handleChange} placeholder="Tell us about yourself..." disabled={loading} sx={infoInputStyles} slotProps={{ inputLabel: { shrink: true } }} />
          </Grid>
        </Grid>

        {/* ================= CAPSULE CTA TRIGGER BUTTON ================= */}
        <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            startIcon={<SaveRoundedIcon sx={{ fontSize: 18 }} />}
            onClick={handleSave}
            disabled={loading}
            sx={{
              py: 1.2,
              px: 4,
              borderRadius: "24px", 
              textTransform: "none",
              fontWeight: 700,
              fontSize: "0.9rem",
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
            {loading ? "Saving Changes..." : "Save Changes"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileInfoCard;
