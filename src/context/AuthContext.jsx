// src/context/AuthContext.jsx

import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import * as authService from "../services/authService";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ==========================================
        Firebase Session Listener
  ========================================== */
  useEffect(() => {
    const unsubscribe = authService.onUserChanged(async (firebaseUser) => {
      try {
        if (firebaseUser) {
          let fullUserData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "User",
            photoURL: firebaseUser.photoURL || "",
          };

          if (typeof authService.getUserProfileData === "function") {
            try {
              const firestoreData = await authService.getUserProfileData(firebaseUser.uid);
              if (firestoreData) {
                fullUserData = { ...fullUserData, ...firestoreData };
              }
            } catch (fsErr) {
              console.warn("Firestore profile fetch skipped, relying on core auth payload:", fsErr);
            }
          }

          setUser(fullUserData);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Auth initialization session tracking breakdown:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  /* ==========================================
        Login Actions (Memoized via useCallback)
  ========================================== */
  const login = useCallback(async ({ email, password }) => {
    if (!email || !password) {
      toast.error("Please fill in all login fields.");
      return;
    }
    
    // Cache account details to localStorage to instantly back up security prompts later
    window.localStorage.setItem("deadline_guardian_email", email.trim().toLowerCase());
    return await authService.login({ email, password });
  }, []);

  /* ==========================================
        Register Action (Hardened Overlap Block)
  ========================================== */
  const register = useCallback(async ({ name, email, password }) => {
    if (!name || !email || !password) {
      toast.error("Please fill in all registration fields.");
      return;
    }

    try {
      if (typeof authService.checkEmailAvailability === "function") {
        const isRegistered = await authService.checkEmailAvailability(email.trim());
        if (isRegistered) {
          toast.error("This email address is already registered. Please sign in instead.");
          return;
        }
      }

      const registeredUser = await authService.register({ name, email, password });
      
      // Auto cache email profile indexes to local disk
      window.localStorage.setItem("deadline_guardian_email", email.trim().toLowerCase());
      toast.success("Account created successfully! 🎉");
      return registeredUser;

    } catch (error) {
      console.error("Registration pipeline intercepted:", error.code || error.message);
      
      if (error.code === "auth/email-already-in-use" || error.message?.includes("already-in-use")) {
        toast.error("This email address is already registered. Please sign in instead.");
      } else {
        toast.error(error.message || "Registration failed. Verify your entry criteria.");
      }
      throw error;
    }
  }, []);

  /* ==========================================
        Google Login Action
  ========================================== */
  const loginWithGoogle = useCallback(async () => {
    return await authService.loginWithGoogle();
  }, []);

  /* ==========================================
        Logout Action
  ========================================== */
  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null); 
  }, []);

  /* ==========================================
        Update Profile Action
  ========================================== */
  const updateProfile = useCallback(async (data) => {
    const updated = await authService.updateUserProfile(data);
    setUser((prev) => (prev ? { ...prev, ...updated } : updated));
    return updated;
  }, []);

  /* ==========================================
        Change Password Action
  ========================================== */
  // ✅ FIXED: Expanded signatures mapping parameter hooks to successfully route both arguments to authService
  const changePassword = useCallback(async (currentPassword, newPassword) => {
    return await authService.changePassword(currentPassword, newPassword);
  }, []);

  /* ==========================================
        Forgot Password Action (Hardened Delivery Link)
  ========================================== */
  const resetPassword = useCallback(async (email) => {
    const cleanEmail = email?.trim();
    if (!cleanEmail) {
      toast.error("Please enter your registered email address first.");
      return;
    }

    try {
      const response = await authService.resetPassword(cleanEmail);
      
      // Keep track of reset index vectors to back up security prompts natively
      window.localStorage.setItem("deadline_guardian_email", cleanEmail.toLowerCase());
      
      toast.success("Password reset link sent! Check your inbox and spam folders. ✉️");
      return response;
    } catch (error) {
      console.error("Reset Email Dispatched Failure Logs:", error.code || error.message);
      
      if (error.code === "auth/user-not-found" || error.message?.includes("user-not-found")) {
        toast.error("No account exists with this email address.");
      } else {
        toast.error("Failed to send reset link. Verify your email layout format.");
      }
      throw error;
    }
  }, []);

  /* ==========================================
        Delete Account Action
  ========================================== */
  const deleteAccount = useCallback(async () => {
    await authService.removeAccount();
    setUser(null);
  }, []);

  /* ==========================================
        Performance Optimization Value Mapping
  ========================================== */
  const contextValue = useMemo(() => ({
    user,
    loading,
    login,
    register,
    loginWithGoogle,
    logout,
    updateProfile,
    changePassword,
    resetPassword,
    deleteAccount,
    isAuthenticated: !!user,
  }), [
    user,
    loading,
    login,
    register,
    loginWithGoogle,
    logout,
    updateProfile,
    changePassword,
    resetPassword,
    deleteAccount
  ]);

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }
  return context;
};

export default AuthContext;
