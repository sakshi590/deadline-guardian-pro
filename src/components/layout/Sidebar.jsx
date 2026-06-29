// src/components/layout/Sidebar.jsx

import { NavLink } from "react-router-dom";

import {
  Box,
  Drawer,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Tooltip,
} from "@mui/material";

import {
  Dashboard,
  Assignment,
  CalendarMonth,
  Analytics,
  SmartToy,
  Person,
  Settings,
} from "@mui/icons-material";

import { useUI } from "../../context/UIContext";

const drawerWidth = 270;
const collapsedWidth = 80;

const menuItems = [
  {
    title: "Dashboard",
    icon: <Dashboard />,
    path: "/dashboard",
  },
  {
    title: "Tasks",
    icon: <Assignment />,
    path: "/tasks",
  },
  {
    title: "Calendar",
    icon: <CalendarMonth />,
    path: "/calendar",
  },
  {
    title: "Analytics",
    icon: <Analytics />,
    path: "/analytics",
  },
  {
    title: "AI Assistant",
    icon: <SmartToy />,
    path: "/ai",
  },
  {
    title: "Profile",
    icon: <Person />,
    path: "/profile",
  },
  {
    title: "Settings",
    icon: <Settings />,
    path: "/settings",
  },
];

const Sidebar = () => {
  const {
    sidebarOpen,
    mobileOpen,
    toggleMobileDrawer,
  } = useUI();

  const drawerContent = (
    <>

      <Toolbar
        sx={{
          justifyContent: "center",
          py: 2,
        }}
      >

        <Avatar
          sx={{
            bgcolor: "primary.main",
            width: 50,
            height: 50,
            mr: sidebarOpen ? 2 : 0,
          }}
        >
          DG
        </Avatar>

        {sidebarOpen && (
          <Box>

            <Typography
              variant="h6"
              fontWeight={700}
            >
              Deadline
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              Guardian Pro
            </Typography>

          </Box>
        )}

      </Toolbar>

      <Divider />

      <List
        sx={{
          mt: 2,
        }}
      >
                {menuItems.map((item) => (
          <Tooltip
            key={item.title}
            title={sidebarOpen ? "" : item.title}
            placement="right"
          >
            <ListItemButton
              component={NavLink}
              to={item.path}
              sx={{
                mx: 1,
                mb: 1,
                minHeight: 52,
                borderRadius: 3,
                justifyContent: sidebarOpen ? "initial" : "center",

                "&.active": {
                  bgcolor: "primary.main",
                  color: "#fff",

                  "& .MuiListItemIcon-root": {
                    color: "#fff",
                  },

                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                },

                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: sidebarOpen ? 2 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>

              {sidebarOpen && (
                <ListItemText primary={item.title} />
              )}
            </ListItemButton>
          </Tooltip>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Divider />

      <Box
        sx={{
          p: 2,
          textAlign: "center",
        }}
      >
        {sidebarOpen ? (
          <>
            <Typography
              variant="subtitle2"
              fontWeight={700}
            >
              Deadline Guardian Pro
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              AI Powered Productivity
            </Typography>
          </>
        ) : (
          <Typography
            variant="caption"
            color="text.secondary"
          >
            v1.0
          </Typography>
        )}
      </Box>
    </>
  );

  return (
    <>
      {/* Mobile Drawer */}

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={toggleMobileDrawer}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: {
            xs: "block",
            md: "none",
          },

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            borderRight: 0,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer */}

      <Drawer
        variant="permanent"
        sx={{
          display: {
            xs: "none",
            md: "block",
          },

          width: sidebarOpen
            ? drawerWidth
            : collapsedWidth,

          flexShrink: 0,

          "& .MuiDrawer-paper": {
            width: sidebarOpen
              ? drawerWidth
              : collapsedWidth,

            transition: "all .3s ease",

            overflowX: "hidden",

            borderRight: "1px solid",

            borderColor: "divider",

            bgcolor: "background.paper",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;