// src/components/calendar/CalendarToolbar.jsx

import {
  Box,
  Button,
  ButtonGroup,
  Paper,
  Stack,
  Typography,
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
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 3,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{
          xs: "stretch",
          md: "center",
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
        >
          <Button
            variant="outlined"
            onClick={() => onNavigate("PREV")}
            startIcon={<ChevronLeftRoundedIcon />}
          >
            Previous
          </Button>

          <Button
            variant="contained"
            onClick={() => onNavigate("TODAY")}
            startIcon={<TodayRoundedIcon />}
          >
            Today
          </Button>

          <Button
            variant="outlined"
            onClick={() => onNavigate("NEXT")}
            endIcon={<ChevronRightRoundedIcon />}
          >
            Next
          </Button>
        </Stack>

        <Typography
          variant="h5"
          fontWeight={700}
          textAlign="center"
        >
          {label}
        </Typography>

        <ButtonGroup>
          <Button
            variant={
              view === "month"
                ? "contained"
                : "outlined"
            }
            onClick={() => onView("month")}
          >
            Month
          </Button>

          <Button
            variant={
              view === "week"
                ? "contained"
                : "outlined"
            }
            onClick={() => onView("week")}
          >
            Week
          </Button>

          <Button
            variant={
              view === "day"
                ? "contained"
                : "outlined"
            }
            onClick={() => onView("day")}
          >
            Day
          </Button>

          <Button
            variant={
              view === "agenda"
                ? "contained"
                : "outlined"
            }
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