import {
  Box,
  Button,
  IconButton,
  Typography,
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
    >
      <Box display="flex" alignItems="center">
        <IconButton onClick={previousMonth}>
          <ChevronLeftIcon />
        </IconButton>

        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ mx: 2 }}
        >
          {monthName} {currentDate.getFullYear()}
        </Typography>

        <IconButton onClick={nextMonth}>
          <ChevronRightIcon />
        </IconButton>
      </Box>

      <Button onClick={goToToday}>
        Today
      </Button>
    </Box>
  );
}

export default CalendarHeader;