// src/components/calendar/CalendarHeader.jsx
import {
  Box,
  Button,
  IconButton,
  Typography,
  alpha,
} from "@mui/material";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import useCalendar from "./hooks/useCalendar";

function CalendarHeader() {
  const {
    currentDate,
    previousMonth,
    nextMonth,
    goToToday,
  } = useCalendar();

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
  });

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
      gap={2}
      sx={{ mb: 3.5, pl: 0.5 }} // Added balanced spacer offsets matching your Dashboard headers layout [4]
    >
      {/* ================= NAVIGATION CONTROLS ================= */}
      <Box display="flex" alignItems="center">
        <IconButton 
          onClick={previousMonth}
          sx={{ 
            color: "text.secondary", 
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            p: 1,
            "&:hover": { bgcolor: "action.hover", color: "text.primary" }
          }}
        >
          <ChevronLeftIcon sx={{ fontSize: 20 }} />
        </IconButton>

        {/* ✅ FIXED TYPOGRAPHY CONTRAST */}
        <Typography
          variant="h5"
          fontWeight={800} // Upgraded weight for premium brand harmony profile
          sx={{ 
            mx: 2.5, 
            color: "text.primary", // Shifts cleanly from deep charcoal slate to pure white text
            letterSpacing: "-0.02em" 
          }}
        >
          {monthName} {currentDate.getFullYear()}
        </Typography>

        <IconButton 
          onClick={nextMonth}
          sx={{ 
            color: "text.secondary", 
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            p: 1,
            "&:hover": { bgcolor: "action.hover", color: "text.primary" }
          }}
        >
          <ChevronRightIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </Box>

      {/* ================= CAPSULE CTA TRIGGER BUTTON ================= */}
      <Button 
        variant="outlined" // Upgraded to outlined for clean SaaS layout uniformity [1]
        onClick={goToToday}
        sx={{
          borderRadius: "24px", // ✅ UPDATED: Smooth pill capsule curve family look [1]
          textTransform: "none",
          fontWeight: 700,
          fontSize: "0.9rem",
          px: 3,
          py: 1,
          color: "primary.main",
          borderColor: "primary.main",
          borderWidth: "1.5px",
          transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          "&:hover": {
            borderWidth: "1.5px",
            borderColor: "primary.dark",
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
            transform: "translateY(-1px)"
          },
          "&:active": {
            transform: "translateY(0)"
          }
        }}
      >
        Today
      </Button>
    </Box>
  );
}

export default CalendarHeader;
