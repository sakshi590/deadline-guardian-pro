// src/pages/Calendar.jsx
import {
  Box,
  Typography,
} from "@mui/material";

import CalendarView from "../components/calendar/CalendarView";

const Calendar = () => {
  return (
    <Box sx={{ maxWidth: "1400px", mx: "auto" }}>
      {/* ================= CALENDAR WORKSPACE HEADER ================= */}
      <Typography
        variant="h4"
        fontWeight={800} // Upgraded weight for premium brand harmony profile
        sx={{
          color: "text.primary", // ✅ UPDATED: Shifts cleanly from dark slate into pure white text across theme flips
          letterSpacing: "-0.025em",
          mb: 4.5,
        }}
      >
        Calendar
      </Typography>

      {/* Main Internal Interactive Calendar Sheet View Container */}
      <CalendarView />
    </Box>
  );
};

export default Calendar;
