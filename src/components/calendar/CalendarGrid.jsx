// src/components/calendar/CalendarGrid.jsx
import { Card, CardContent, Grid, Typography, Box, alpha } from "@mui/material";
import CalendarCell from "./CalendarCell";
import useCalendar from "./hooks/useCalendar";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function CalendarGrid() {
  const { calendarDays } = useCalendar();

  return (
    <Card
      elevation={0} // Changed from elevation 3 to a modern flat SaaS layout profile
      sx={{
        borderRadius: "24px", // Matches your exact capsule curve layout family
        border: "1px solid",
        borderColor: "divider", // Theme adaptive separation outline trace line
        bgcolor: "background.paper", // Seamless light / dark card backing surface
        boxShadow: (theme) => theme.palette.mode === "dark" 
          ? "0 10px 30px rgba(0,0,0,0.3)" 
          : "0 10px 30px rgba(15, 23, 42, 0.02)",
      }}
    >
      <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
        
        {/* ================= WEEKDAY HEADER TRACK ROW ================= */}
        {/* ✅ FIXED RESPONSIVE BOUNDS: Configured native 7-column grid fractions to prevent row breaks */}
        <Grid container spacing={1.5} sx={{ mb: 2, borderBottom: "1px solid", borderColor: "divider", pb: 1.5 }}>
          {weekDays.map((day) => (
            <Grid
              key={day}
              item // Restores standard column grid cell integrity
              xs={1.714} // Perfect structural fraction allocation mapping for seven weekdays (12 / 7)
            >
              <Typography
                align="center"
                variant="caption"
                sx={{ 
                  color: "text.secondary", // ✅ UPDATED: High contrast adaptive text tokens
                  fontWeight: 800, 
                  textTransform: "uppercase", 
                  letterSpacing: "0.05em",
                  display: "block"
                }}
              >
                {day}
              </Typography>
            </Grid>
          ))}
        </Grid>

        {/* ================= INTERNAL CALENDAR CELL DATA MATRIX ================= */}
        <Grid container spacing={1.5}>
          {calendarDays.map((date, index) => (
            <Grid
              key={index}
              item
              xs={1.714} // Keeps cell layouts fully mapped to matching header column weights
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
