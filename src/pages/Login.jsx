// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

import AuthLayout from "../components/auth/AuthLayout";
import LoginForm from "../components/auth/LoginForm";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginWithGoogle, resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  
  // ✅ THE CHASSIS FIX: State flag toggle to control view modes seamlessly without prompts
  const [isResetMode, setIsResetMode] = useState(false);

  const from = location.state?.from?.pathname || "/dashboard";

  /* ==========================================
      Login Logic
  ========================================== */
  const handleLogin = async ({ email, password, rememberMe }) => {
    setLoading(true);
    try {
      await login({ email, password, rememberMe });
      
      // Cache account indexes locally to back up security thresholds seamlessly
      window.localStorage.setItem("deadline_guardian_email", email.trim().toLowerCase());
      
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Authentication Error:", error);
      toast.error(error.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  /* ==========================================
      Google Login Logic
  ========================================== */
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      toast.success("Welcome!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  /* ==========================================
      Register Redirection
  ========================================== */
  const handleRegister = () => {
    navigate("/register");
  };

  /* ==========================================
      Forgot Password Logic (Clean Execution)
  ========================================== */
  const handleForgotPassword = async (email) => {
    if (!email || !email.trim()) {
      toast.error("Please provide your registered email address.");
      return;
    }

    setLoading(true);
    try {
      // ✅ THE PROMPT ELIMINATION: Processes input value dynamically straight from the form field text state
      await resetPassword(email.trim());
      setIsResetMode(false); // Snap back to standard login card state on link dispatch
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ width: "100%", display: "flex", flex: 1 }}
      >
        <AuthLayout>
          {/* ✅ FIXED: Wired state indicators to switch layouts seamlessly */}
          <LoginForm
            loading={loading}
            isResetMode={isResetMode}
            setIsResetMode={setIsResetMode}
            onLogin={handleLogin}
            onGoogleLogin={handleGoogleLogin}
            onRegister={handleRegister}
            onForgotPassword={handleForgotPassword}
          />
        </AuthLayout>
      </motion.div>
    </AnimatePresence>
  );
};

export default Login;
