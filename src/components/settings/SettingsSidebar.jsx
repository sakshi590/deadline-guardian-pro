// src/components/settings/SettingsSidebar.jsx

import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";

import {
  Palette,
  Notifications,
} from "@mui/icons-material";

// ✅ FIXED: Trimmed down the options array to focus exclusively on main wired features
const menus = [
  {
    title: "Appearance",
    icon: <Palette />,
  },
  {
    title: "Notifications",
    icon: <Notifications />,
  },
];

const SettingsSidebar = ({ selected, setSelected }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        width: 280,
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
        bgcolor: "background.paper",
      }}
    >
      <List sx={{ p: 1 }}>
        {menus.map((menu) => (
          <ListItemButton
            key={menu.title}
            selected={selected === menu.title}
            onClick={() => setSelected(menu.title)}
            sx={{
              borderRadius: 3,
              mb: 0.5,
              py: 1.2,
              "&.Mui-selected": {
                bgcolor: "primary.main",
                color: "#fff",
                "& .MuiListItemIcon-root": {
                  color: "#fff",
                },
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 40,
                color: "text.secondary",
              }}
            >
              {menu.icon}
            </ListItemIcon>

            <ListItemText
              primary={menu.title}
              primaryTypographyProps={{
                fontWeight: 600,
                fontSize: "0.95rem",
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Paper>
  );
};

export default SettingsSidebar;
