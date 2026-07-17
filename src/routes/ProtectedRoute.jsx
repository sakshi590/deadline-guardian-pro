// src/routes/ProtectedRoute.jsx

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { loading, isAuthenticated } = useAuth();

  const location = useLocation();

  // Show loader while checking authentication
  if (loading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#F8FAFC",
        }}
      >
        <CircularProgress size={45} />
      </Box>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  // User authenticated
  return <Outlet />;
};

export default ProtectedRoute;