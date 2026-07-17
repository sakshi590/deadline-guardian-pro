// src/routes/AppRoutes.jsx

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";

// Layout
import Layout from "../components/layout/Layout";

// Public Pages
import Welcome from "../pages/Welcome";
import Login from "../pages/Login";
import Register from "../pages/Register";

// Protected Pages
import Dashboard from "../pages/Dashboard";
import Tasks from "../pages/Tasks";
import Calendar from "../pages/Calendar";
import Analytics from "../pages/Analytics";
import AIAssistant from "../pages/AIAssistant";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";

// Other Pages
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  const { isAuthenticated } = useAuth() || {};

  return (
    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}
      {/* ✅ SECURITY ENHANCEMENT: Keeps authentication state separate from route configuration parameters */}
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Welcome />}
      />

      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />}
      />

      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />}
      />

      {/* ================= PROTECTED ROUTES ================= */}
      {/* 🔒 THE SECURITY VAULT: Explicitly captures and blocks any manual URL tampering or unauthorized address bar entries */}
      <Route element={<ProtectedRoute />}>
        
        <Route element={<Layout />}>
          
          {/* ✅ PROTECTED PATH MATRIX: Manual parameter manipulation here instantly triggers your Outlet guard */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/ai" element={<AIAssistant />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          
        </Route>

      </Route>

      {/* ================= NOT FOUND & WILDCARD SHIELD ================= */}
      {/* 🛑 MALICIOUS ROUTE SHIELD: If a user types garbage paths into the URL text box bar, 
          this cleanly catches the exception and falls back gracefully */}
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
    </Routes>
  );
};

export default AppRoutes;
