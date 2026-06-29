// src/components/layout/Navbar.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";

import {
  Menu as MenuIcon,
  Search,
  NotificationsNone,
  DarkMode,
  LightMode,
  Person,
  Logout,
  Settings,
} from "@mui/icons-material";

import { useThemeContext } from "../../context/ThemeContext";
import { useUI } from "../../context/UIContext";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { toggleTheme, isDark } = useThemeContext();

  const {
    toggleSidebar,
    toggleMobileDrawer,
  } = useUI();

  const { user, logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backdropFilter: "blur(14px)",
        bgcolor: (theme) =>
          alpha(theme.palette.background.paper, 0.8),
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar>

        {/* Mobile Menu */}

        <IconButton
          color="inherit"
          edge="start"
          sx={{ mr: 1, display: { md: "none" } }}
          onClick={toggleMobileDrawer}
        >
          <MenuIcon />
        </IconButton>

        {/* Desktop Menu */}

        <IconButton
          color="inherit"
          edge="start"
          sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          onClick={toggleSidebar}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo */}

        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "primary.main",
            mr: 4,
            whiteSpace: "nowrap",
          }}
        >
          Deadline Guardian
        </Typography>

        {/* Search */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            px: 2,
            py: 0.5,
            borderRadius: 3,
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, 0.08),
            width: {
              xs: 150,
              sm: 250,
              md: 350,
            },
          }}
        >
          <Search color="action" />

          <InputBase
            placeholder="Search tasks..."
            sx={{
              ml: 1,
              width: "100%",
            }}
          />
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* Theme */}

        <Tooltip title="Toggle Theme">

          <IconButton onClick={toggleTheme}>

            {isDark ? (
              <LightMode />
            ) : (
              <DarkMode />
            )}

          </IconButton>

        </Tooltip>

        {/* Notification */}

        <Tooltip title="Notifications">

          <IconButton>

            <Badge
              badgeContent={5}
              color="error"
            >
              <NotificationsNone />
            </Badge>

          </IconButton>

        </Tooltip>

        {/* Avatar */}

        <IconButton
          onClick={handleMenuOpen}
        >
          <Avatar
            sx={{
              bgcolor: "primary.main",
            }}
          >
            {user?.name
              ? user.name[0].toUpperCase()
              : "U"}
          </Avatar>
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >

          <MenuItem
            onClick={() => {
              navigate("/profile");
              handleClose();
            }}
          >
            <Person sx={{ mr: 1 }} />
            Profile
          </MenuItem>

          <MenuItem
            onClick={() => {
              navigate("/settings");
              handleClose();
            }}
          >
            <Settings sx={{ mr: 1 }} />
            Settings
          </MenuItem>

          <Divider />

          <MenuItem
            onClick={handleLogout}
          >
            <Logout sx={{ mr: 1 }} />
            Logout
          </MenuItem>

        </Menu>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;