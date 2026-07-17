// src/components/auth/RegisterForm.jsx (Part 1 of 2)
import { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  TextField,
  Avatar,
  IconButton,
  InputAdornment,
  Link,
  Divider,
  alpha,
} from "@mui/material";
import toast from "react-hot-toast"; // Upgraded from native block alert components to clean framework notifications

import PhotoCameraRoundedIcon from "@mui/icons-material/PhotoCameraRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

import GradientButton from "./GradientButton";
import GoogleButton from "./GoogleButton";

const RegisterForm = ({
  onRegister,
  onGoogleRegister,
  onLogin,
  loading = false,
}) => {
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      toast.error("Please fill all required registration fields.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    onRegister?.({
      name,
      email,
      password,
      avatar,
    });
  };

  // ✅ UPDATED: Shifted strictly to semantic platform input configurations to support fluid theme transitions
  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      color: "text.primary",
      borderRadius: "14px", // Standardised curves look matching layout family input shapes
      bgcolor: "background.default", // Fluid baseline input layer background canvas fill
      transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
      "& fieldset": {
        borderColor: "divider",
        borderWidth: "1px",
      },
      "&:hover fieldset": {
        borderColor: (theme) => alpha(theme.palette.text.primary, 0.2),
      },
      "&.Mui-focused fieldset": {
        borderColor: "primary.main", // Active focal tracking violet highlight
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
// src/components/auth/RegisterForm.jsx (Part 2 of 2)
  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      {/* ================= HEADER SECTOR ================= */}
      <Typography
        variant="h4"
        align="center"
        fontWeight={800}
        mb={1}
        sx={{
          color: "text.primary", // ✅ UPDATED: Stark adaptive title contrast text
          letterSpacing: "-0.025em",
          fontSize: { xs: "1.75rem", md: "2.25rem" },
        }}
      >
        Create Account <span style={{ fontSize: "1.6rem" }}>🚀</span>
      </Typography>

      <Typography
        align="center"
        mb={4}
        sx={{ color: "text.secondary", fontSize: "0.925rem", fontWeight: 500 }}
      >
        Join Deadline Guardian Pro and let AI organize your productivity.
      </Typography>

      {/* ================= INTEGRATED AVATAR UPLOAD HUB ================= */}
      <Stack alignItems="center" mb={2}>
        <Box sx={{ position: "relative" }}>
          <Avatar
            src={avatar}
            sx={{
              width: 96,
              height: 96,
              border: "2px solid",
              borderColor: "divider", // ✅ UPDATED: Adaptive border layer tracks mode flips automatically
              background: "background.default",
              boxShadow: (theme) => theme.palette.mode === "dark" 
                ? "0 8px 24px rgba(0, 0, 0, 0.4)" 
                : `0 8px 24px ${alpha(theme.palette.text.primary, 0.04)}`,
            }}
          />
          <IconButton
            component="label"
            disabled={loading}
            sx={{
              position: "absolute",
              bottom: -2,
              right: -2,
              bgcolor: "primary.main", // ✅ UPDATED: Dynamic brand color token injection
              color: "primary.contrastText",
              p: 1,
              boxShadow: (theme) => `0 4px 12px ${alpha(theme.palette.primary.main, 0.35)}`,
              transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
              "&:hover": {
                bgcolor: "primary.dark",
                transform: "scale(1.05)",
              },
            }}
          >
            <PhotoCameraRoundedIcon sx={{ fontSize: 18 }} />
            <input hidden accept="image/*" type="file" onChange={handleAvatar} />
          </IconButton>
        </Box>
      </Stack>

      {/* ================= INPUT MATRIX LIST FIELDS ================= */}
      <TextField
        fullWidth
        label="Full Name"
        placeholder="Sakshi Thorat"
        margin="normal"
        value={name}
        disabled={loading}
        onChange={(e) => setName(e.target.value)}
        sx={inputStyles}
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        fullWidth
        label="Email Address"
        type="email"
        placeholder="name@example.com"
        margin="normal"
        value={email}
        disabled={loading}
        onChange={(e) => setEmail(e.target.value)}
        sx={inputStyles}
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        fullWidth
        label="Password"
        margin="normal"
        placeholder="Create a strong password"
        disabled={loading}
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={inputStyles}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                onClick={() => setShowPassword(!showPassword)}
                sx={{ color: "text.secondary", "&:hover": { color: "text.primary" } }}
              >
                {showPassword ? (
                  <VisibilityOffRoundedIcon sx={{ fontSize: 18 }} />
                ) : (
                  <VisibilityRoundedIcon sx={{ fontSize: 18 }} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField
        fullWidth
        label="Confirm Password"
        margin="normal"
        placeholder="Repeat your password"
        disabled={loading}
        type={showConfirmPassword ? "text" : "password"}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        sx={inputStyles}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                sx={{ color: "text.secondary", "&:hover": { color: "text.primary" } }}
              >
                {showConfirmPassword ? (
                  <VisibilityOffRoundedIcon sx={{ fontSize: 18 }} />
                ) : (
                  <VisibilityRoundedIcon sx={{ fontSize: 18 }} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* ================= SUBMIT ACTION BUTTON ================= */}
      <Box sx={{ mt: 3.5, mb: 1 }}>
        <GradientButton type="submit" fullWidth disabled={loading}>
          {loading ? "Creating Account..." : "Create Account"}
        </GradientButton>
      </Box>

      {/* ================= DIVIDER MATRIX TRACK ================= */}
      <Divider
        sx={{
          my: 3.5,
          borderColor: "divider",
          "&::before, &::after": { borderColor: "divider" },
        }}
      >
        <Typography
          variant="caption"
          sx={{ color: "text.disabled", fontWeight: 700, fontSize: "0.725rem", letterSpacing: "0.05em" }}
        >
          OR CONTINUE WITH
        </Typography>
      </Divider>

      {/* ================= SOCIAL BUTTON ================= */}
      <GoogleButton fullWidth disabled={loading} onClick={onGoogleRegister} />

      {/* ================= REDIRECT TOGGLE LINK ================= */}
      <Stack direction="row" justifyContent="center" spacing={0.5} mt={4}>
        <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500 }}>
          Already have an account?
        </Typography>

        <Link
          component="button"
          type="button"
          underline="none"
          onClick={onLogin}
          sx={{
            fontWeight: 700,
            fontSize: "0.875rem",
            color: "primary.main",
            transition: "all 0.2s ease",
            "&:hover": {
              color: "primary.dark",
            },
          }}
        >
          Sign In
        </Link>
      </Stack>
    </Box>
  );
};

export default RegisterForm;
