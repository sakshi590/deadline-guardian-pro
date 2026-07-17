// src/components/auth/LoginForm.jsx
import { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  IconButton,
  InputAdornment,
  Divider,
  Link,
  alpha,
} from "@mui/material";
import toast from "react-hot-toast"; 

import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

import GradientButton from "./GradientButton";
import GoogleButton from "./GoogleButton";

const LoginForm = ({
  onLogin,
  onGoogleLogin,
  onRegister,
  onForgotPassword,
  isResetMode = false,       // ✅ FIXED: Acccepts view toggling parameters natively from parent page
  setIsResetMode,            // ✅ FIXED: Acccepts toggle functions to swap layouts smoothly
  loading = false,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    if (isResetMode) {
      // ✅ THE PROMPT FIX: Pipes text field input value straight to password service without alert boxes
      onForgotPassword?.(email.trim());
    } else {
      if (!password.trim()) {
        toast.error("Please provide your account password.");
        return;
      }
      onLogin?.({
        email: email.trim(),
        password,
        rememberMe,
      });
    }
  };

  // REUSABLE INPUT STYLING SYSTEM
  const inputStyles = {
    mb: 1,
    "& .MuiOutlinedInput-root": {
      color: "text.primary",
      borderRadius: "14px", 
      bgcolor: "background.default", 
      transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
      "& fieldset": {
        borderColor: "divider",
        borderWidth: "1px",
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
    <Box component="form" onSubmit={handleSubmit} noValidate>
      {/* ================= HEADER SECTOR ================= */}
      <Typography
        variant="h4"
        fontWeight={800}
        mb={1}
        sx={{
          textAlign: "center",
          color: "text.primary", 
          letterSpacing: "-0.025em",
          fontSize: { xs: "1.75rem", md: "2.25rem" },
        }}
      >
        {/* ✅ FIXED: Dynamic title updates in line with resetting states */}
        {isResetMode ? (
          <>Reset Password <span style={{ fontSize: "1.6rem" }}>✉️</span></>
        ) : (
          <>Welcome Back <span style={{ fontSize: "1.6rem" }}>👋</span></>
        )}
      </Typography>

      <Typography
        mb={4}
        sx={{ 
          textAlign: "center",
          color: "text.secondary", 
          fontSize: "0.925rem", 
          fontWeight: 500 
        }}
      >
        {/* ✅ FIXED: Dynamic description text overlays updates in line with resetting states */}
        {isResetMode 
          ? "Enter your email address to receive an isolated access reset link." 
          : "Sign in to continue using Deadline Guardian Pro."
        }
      </Typography>

      {/* ================= EMAIL INPUT ================= */}
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
        slotProps={{
          inputLabel: { shrink: true }
        }}
      />

      {/* ================= PASSWORD INPUT (COLLAPSIBLE) ================= */}
      {/* ✅ FIXED: Collapses password entry field away automatically when reset loops are triggered */}
      {!isResetMode && (
        <TextField
          fullWidth
          label="Password"
          placeholder="Enter your security access code"
          margin="normal"
          disabled={loading}
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={inputStyles}
          slotProps={{
            inputLabel: { shrink: true },
            input: {
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
            }
          }}
        />
      )}

      {/* ================= REMEMBER & FORGOT ================= */}
      <Stack
        mt={1.5}
        mb={3.5}
        sx={{
          direction: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row"
        }}
      >
        {/* Toggle check layout visibility context rules */}
        {!isResetMode ? (
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                sx={{
                  color: (theme) => alpha(theme.palette.text.primary, 0.2),
                  "&.Mui-checked": {
                    color: "primary.main",
                  },
                }}
              />
            }
            label="Remember Me"
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "0.875rem",
                color: "text.secondary",
                fontWeight: 600,
              },
            }}
          />
        ) : (
          <Box /> // Standard alignment spacer anchor node
        )}

        <Link
          component="button"
          underline="none"
          type="button"
          onClick={() => setIsResetMode?.(!isResetMode)} // ✅ FIXED: Swaps back-and-forth states seamlessly without alert prompts
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
          {isResetMode ? "Back to Sign In" : "Forgot Password?"}
        </Link>
      </Stack>

      {/* ================= SUBMIT ACTION BUTTON ================= */}
      <GradientButton type="submit" fullWidth disabled={loading}>
        {/* ✅ FIXED: Dynamic primary action CTA text changes in line with layout states */}
        {loading ? "Processing..." : isResetMode ? "Send Reset Link" : "Sign In"}
      </GradientButton>

      {/* ================= DIVIDER MATRIX TRACK ================= */}
      <Divider 
        sx={{ 
          my: 3.5,
          borderColor: "divider",
          "&::before, &::after": { borderColor: "divider" }
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
      <GoogleButton fullWidth disabled={loading} onClick={onGoogleLogin} />

      {/* ================= REDIRECT TOGGLE LINK ================= */}
      <Stack 
        spacing={0.5} 
        mt={4}
        sx={{ justifyContent: "center", flexDirection: "row", direction: "row" }}
      >
        <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500 }}>
          Don't have an account?
        </Typography>

        <Link
          component="button"
          type="button"
          underline="none"
          onClick={onRegister}
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
          Sign Up
        </Link>
      </Stack>
    </Box>
  );
};

export default LoginForm;
