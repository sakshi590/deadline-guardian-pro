// src/pages/Calendar.jsx

import {
  Box,
  Typography,
} from "@mui/material";

import CalendarView from "../components/calendar/CalendarView";

const Calendar = () => {
  return (
    <Box>

      <Typography
        variant="h4"
        fontWeight={700}
        mb={3}
      >
        Calendar
      </Typography>

      <CalendarView />

    </Box>
  );
};

export default Calendar;