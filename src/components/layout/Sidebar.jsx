import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useUI } from "../../context/UIContext";
import { NavLink } from "react-router-dom";
import { navigationItems } from "../../constants/navigation";

function Sidebar() {
  const { sidebarOpen } = useUI();
  const drawerWidth = sidebarOpen ? 240 : 70;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        transition: "width 0.3s ease", // Animates the outer container bounds
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          overflowX: "hidden",
          transition: "width 0.3s ease", // Animates the internal sheet panel
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />

      <List>
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <ListItem key={item.title} disablePadding>
              <ListItemButton
                component={NavLink}
                to={item.path}
                sx={{
                  mx: 1,
                  my: 0.5,
                  borderRadius: 2,
                  justifyContent: sidebarOpen ? "initial" : "center",
                  "&.active": {
                    bgcolor: "primary.main",
                    color: "white",
                    "& .MuiListItemIcon-root": {
                      color: "white",
                    },
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
                  <Icon />
                </ListItemIcon>

                {sidebarOpen && <ListItemText primary={item.title} />}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}

export default Sidebar;
