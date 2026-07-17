// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

import AuthLayout from "../components/auth/AuthLayout";
import RegisterForm from "../components/auth/RegisterForm";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register, loginWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);

  /* ==========================================
      Register Logic
  ========================================== */
  const handleRegister = async ({ name, email, password, avatar }) => {
    setLoading(true);
    try {
      await register({ name, email, password, avatar });
      toast.success("Account created successfully!");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Authentication Error:", error);
      toast.error(error.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  /* ==========================================
      Google Register Logic
  ========================================== */
  const handleGoogleRegister = async () => {
    setLoading(true);

    try {
      await loginWithGoogle();

      toast.success("Welcome!");

      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  /* ==========================================
      Login Redirection
  ========================================== */
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ width: "100%", display: "flex", flex: 1 }} // Enhanced flex wrapper constraint to prevent alignment shifting
      >
        <AuthLayout>
          <RegisterForm
            loading={loading}
            onRegister={handleRegister}
            onGoogleRegister={handleGoogleRegister}
            onLogin={handleLogin}
          />
        </AuthLayout>
      </motion.div>
    </AnimatePresence>
  );
};

export default Register;
