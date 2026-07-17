// src/components/calendar/CalendarToolbar.jsx
import {
  Box,
  Button,
  ButtonGroup,
  Paper,
  Stack,
  Typography,
  alpha, // ✅ FIXED: Imported alpha helper for theme-resilient focus highlights
} from "@mui/material";

import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import TodayRoundedIcon from "@mui/icons-material/TodayRounded";

const CalendarToolbar = ({
  label,
  onNavigate,
  onView,
  view,
}) => {

  // Reusable button styles matching your premium Light SaaS capsule buttons
  const baseButtonStyles = {
    textTransform: "none",
    fontWeight: 700,
    fontSize: "0.875rem",
    borderRadius: "24px", // ✅ UPDATED: Smooth pill curve look
    py: 1,
    px: 2.5,
    transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 3.5,
        borderRadius: "20px", // Standardized to match your rounded layout curves family
        border: "1px solid",
        borderColor: "divider", // Theme adaptive separation frame line
        bgcolor: "background.paper", // Responsive layer surface background backing
        boxShadow: (theme) => theme.palette.mode === "dark" 
          ? "0 4px 20px rgba(0,0,0,0.3)" 
          : "0 4px 12px rgba(15, 23, 42, 0.01)",
      }}
    >
      <Stack
        direction={{
          xs: "column",
          lg: "row", // Shifted to 'lg' breakpoint to protect button group layouts from crowding
        }}
        spacing={2.5}
        justifyContent="space-between"
        alignItems="center"
      >
        {/* ================= NAVIGATION CONTROLS ================= */}
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ width: { xs: "100%", md: "auto" }, justifyContent: "center" }}
        >
          <Button
            variant="outlined"
            onClick={() => onNavigate("PREV")}
            startIcon={<ChevronLeftRoundedIcon />}
            sx={{
              ...baseButtonStyles,
              color: "text.secondary",
              borderColor: "divider",
              "&:hover": { bgcolor: "action.hover", color: "text.primary", borderColor: (theme) => alpha(theme.palette.text.primary, 0.2) }
            }}
          >
            Previous
          </Button>

          <Button
            variant="contained"
            onClick={() => onNavigate("TODAY")}
            startIcon={<TodayRoundedIcon />}
            sx={{
              ...baseButtonStyles,
              bgcolor: "primary.main",
              color: "primary.contrastText",
              "&:hover": { bgcolor: "primary.dark" }
            }}
          >
            Today
          </Button>

          <Button
            variant="outlined"
            onClick={() => onNavigate("NEXT")}
            endIcon={<ChevronRightRoundedIcon />}
            sx={{
              ...baseButtonStyles,
              color: "text.secondary",
              borderColor: "divider",
              "&:hover": { bgcolor: "action.hover", color: "text.primary", borderColor: (theme) => alpha(theme.palette.text.primary, 0.2) }
            }}
          >
            Next
          </Button>
        </Stack>

        {/* ================= TIMELINE CENTER LABEL ================= */}
        <Typography
          variant="h5"
          fontWeight={800} // Upgraded weight for premium brand harmony profile
          sx={{ 
            color: "text.primary", // ✅ UPDATED: Adapts cleanly to dark/light variants
            letterSpacing: "-0.02em",
            fontSize: { xs: "1.25rem", md: "1.5rem" }
          }}
        >
          {label}
        </Typography>

        {/* ================= VIEW BUTTON SELECTION GROUP ================= */}
        <ButtonGroup 
          variant="outlined"
          sx={{
            "& .MuiButtonGroup-grouped": {
              borderRadius: "24px", // Forces capsule curves inside group clusters safely
              borderWidth: "1px !important",
              borderColor: "divider",
              mx: "2px !important", // Split styling gaps for modern SaaS alignment
              px: 2.5,
              py: 1,
              textTransform: "none",
              fontWeight: 700,
              fontSize: "0.875rem",
              color: "text.secondary",
              transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
              "&:hover": {
                bgcolor: "action.hover",
                color: "text.primary",
                borderColor: (theme) => alpha(theme.palette.text.primary, 0.2),
              }
            },
            // ✅ UPDATED: Dynamic context active state highlight parsing engine
            "& .MuiButtonGroup-groupedContained": {
              bgcolor: "primary.main !important",
              color: "primary.contrastText !important",
              borderColor: "primary.main !important",
              boxShadow: (theme) => `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`,
              "&:hover": {
                bgcolor: "primary.dark !important",
              }
            }
          }}
        >
          <Button
            variant={view === "month" ? "contained" : "outlined"}
            onClick={() => onView("month")}
          >
            Month
          </Button>

          <Button
            variant={view === "week" ? "contained" : "outlined"}
            onClick={() => onView("week")}
          >
            Week
          </Button>

          <Button
            variant={view === "day" ? "contained" : "outlined"}
            onClick={() => onView("day")}
          >
            Day
          </Button>

          <Button
            variant={view === "agenda" ? "contained" : "outlined"}
            onClick={() => onView("agenda")}
          >
            Agenda
          </Button>
        </ButtonGroup>
      </Stack>
    </Paper>
  );
};

export default CalendarToolbar;
