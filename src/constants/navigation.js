import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";

export const navigationItems = [
  {
    title: "Dashboard",
    path: "/",
    icon: DashboardIcon,
  },
  {
    title: "Tasks",
    path: "/tasks",
    icon: AssignmentIcon,
  },
  {
    title: "Calendar",
    path: "/calendar",
    icon: CalendarMonthIcon,
  },
  {
    title: "AI Assistant",
    path: "/ai",
    icon: SmartToyIcon,
  },
  {
    title: "Profile",
    path: "/profile",
    icon: PersonIcon,
  },
];
