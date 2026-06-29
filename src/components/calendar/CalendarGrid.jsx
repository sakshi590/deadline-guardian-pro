import { Card, CardContent, Grid, Typography } from "@mui/material";
import CalendarCell from "./CalendarCell";
import useCalendar from "./hooks/useCalendar";

const weekDays = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

function CalendarGrid() {
  const { calendarDays } = useCalendar();

  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 4,
      }}
    >
      <CardContent>

        {/* Week Header */}

        <Grid container spacing={1} sx={{ mb: 1 }}>
          {weekDays.map((day) => (
            <Grid
              key={day}
              size={{ xs: 12 / 7 }}
            >
              <Typography
                align="center"
                fontWeight={700}
              >
                {day}
              </Typography>
            </Grid>
          ))}
        </Grid>

        {/* Calendar */}

        <Grid container spacing={1}>
          {calendarDays.map((date, index) => (
            <Grid
              key={index}
              size={{ xs: 12 / 7 }}
            >
              <CalendarCell date={date} />
            </Grid>
          ))}
        </Grid>

      </CardContent>
    </Card>
  );
}

export default CalendarGrid;