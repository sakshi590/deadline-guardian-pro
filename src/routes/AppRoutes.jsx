// src/routes/AppRoutes.jsx

import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

// Layout
import Layout from "../components/layout/Layout";

// Pages
import Dashboard from "../pages/Dashboard";
import Tasks from "../pages/Tasks";
import Calendar from "../pages/Calendar";
import Analytics from "../pages/Analytics";
import AIAssistant from "../pages/AIAssistant";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Public Routes */}

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}

      <Route element={<ProtectedRoute />}>

        <Route element={<Layout />}>

          <Route index element={<Navigate to="/dashboard" replace />} />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/tasks"
            element={<Tasks />}
          />

          <Route
            path="/calendar"
            element={<Calendar />}
          />

          <Route
            path="/analytics"
            element={<Analytics />}
          />

          <Route
            path="/ai"
            element={<AIAssistant />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

        </Route>

      </Route>

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
};

export default AppRoutes;