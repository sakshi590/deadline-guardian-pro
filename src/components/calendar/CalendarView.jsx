import { useMemo } from "react";
import dayjs from "dayjs";

import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getOverloadedDays } from "../../utils/aiTaskEngine";
import { Paper, Stack, Chip, alpha } from "@mui/material";
import { useTheme } from "@mui/material/styles"; 

import { useTasks } from "../../context/TaskContext";
import { useUI } from "../../context/UIContext";
import { getCalendarEvents } from "../../utils/calendarEvents";

const localizer = dayjsLocalizer(dayjs);

const CalendarView = () => {
  const { tasks = [], updateTask } = useTasks() || {}; // Guard against initial empty database loads safely
  const { openTaskDialog } = useUI();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const events = useMemo(
    () => getCalendarEvents(tasks),
    [tasks]
  );

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: event.color,
        borderRadius: "6px",
        border: "none",
        color: "#FFFFFF", 
        padding: "3px 8px",
        fontWeight: 700,
        fontSize: "0.775rem",
      },
    };
  };

  const handleSelectSlot = (slotInfo) => {
    // ✅ OPTIMIZATION: Uses a local time extraction layout to guarantee date accuracy across timezone offsets
    const targetDate = dayjs(slotInfo.start).format("YYYY-MM-DD");
    openTaskDialog(
      {
        dueDate: targetDate,
      },
      "create"
    );
  };

  const overloadedDays = useMemo(
    () => getOverloadedDays(tasks),
    [tasks]
  );

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3, 
        borderRadius: "24px", 
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        boxShadow: isDarkMode ? "0 10px 30px rgba(0,0,0,0.3)" : "0 10px 30px rgba(15, 23, 42, 0.02)",

        // =========================================================
        // COMPREHENSIVE REACT-BIG-CALENDAR THEME OVERRIDES
        // =========================================================
        "& .rbc-calendar": {
          color: "text.primary",
          fontFamily: "inherit"
        },
        "& .rbc-header": {
          color: "text.secondary",
          fontWeight: 700,
          borderBottom: "1px solid",
          borderColor: "divider",
          pb: 1,
          fontSize: "0.85rem",
          textTransform: "uppercase",
          letterSpacing: "0.02em"
        },
        "& .rbc-month-view, & .rbc-time-view, & .rbc-agenda-view": {
          border: "1px solid",
          borderColor: "divider",
          borderRadius: "12px",
          overflow: "hidden",
          bgcolor: "background.paper"
        },
        "& .rbc-month-row, & .rbc-day-bg, & .rbc-time-header-content, & .rbc-time-content": {
          borderColor: "divider"
        },
        "& .rbc-off-range-bg": {
          bgcolor: isDarkMode ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.02)"
        },
        "& .rbc-day-slot .rbc-time-slot": {
          borderTop: "1px solid",
          borderColor: "divider"
        },
        "& .rbc-toolbar": {
          display: "none" 
        },
        "& .rbc-show-more": {
          color: "primary.main",
          fontWeight: 700,
          fontSize: "0.75rem",
          bgcolor: "transparent"
        }
      }}
    >
      {/* ================= ADAPTIVE CHIP LEGEND ================= */}
      {/* ✅ FIXED: Transferred the flexWrap parameters to the theme-safe sx style wrapper block */}
      <Stack 
        direction="row" 
        spacing={1.5} 
        mb={3.5} 
        sx={{ flexWrap: "wrap", gap: 1.5 }}
      >
        <Chip 
          label="High Priority" 
          size="small"
          sx={{ 
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.08), 
            color: "error.main", 
            border: "1px solid",
            borderColor: (theme) => alpha(theme.palette.error.main, 0.2),
            fontWeight: 700,
            borderRadius: "8px",
            fontSize: "0.7rem",
            textTransform: "uppercase"
          }} 
        />
        <Chip 
          label="Medium Priority" 
          size="small"
          sx={{ 
            bgcolor: (theme) => alpha(theme.palette.warning.main, 0.08), 
            color: "warning.main", 
            border: "1px solid",
            borderColor: (theme) => alpha(theme.palette.warning.main, 0.2),
            fontWeight: 700,
            borderRadius: "8px",
            fontSize: "0.7rem",
            textTransform: "uppercase"
          }} 
        />
        <Chip 
          label="Low Priority" 
          size="small"
          sx={{ 
            bgcolor: (theme) => alpha(theme.palette.success.main, 0.08), 
            color: "success.main", 
            border: "1px solid",
            borderColor: (theme) => alpha(theme.palette.success.main, 0.2),
            fontWeight: 700,
            borderRadius: "8px",
            fontSize: "0.7rem",
            textTransform: "uppercase"
          }} 
        />
      </Stack>

      {/* ================= CORE INTERACTIVE CALENDAR ENGINE ================= */}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        popup
        resizable
        selectable
        onSelectSlot={handleSelectSlot}
        views={["month", "week", "day", "agenda"]}
        defaultView="month"
        eventPropGetter={eventStyleGetter}
        style={{ height: "70vh" }}
        onSelectEvent={(event) => {
          if (event && event.resource) {
            openTaskDialog(event.resource, "edit");
          }
        }}
        draggableAccessor={() => true}
        onEventDrop={({ event, start }) => {
          if (!event || !event.resource) return;
          const updatedTask = {
            ...event.resource,
            dueDate: dayjs(start).format("YYYY-MM-DD"),
          };
          updateTask(event.id, updatedTask);
        }}
        dayPropGetter={(date) => {
          const formatted = dayjs(date).format("YYYY-MM-DD");

          if (Array.isArray(overloadedDays) && overloadedDays.includes(formatted)) {
            return {
              style: {
                backgroundColor: alpha(theme.palette.error.main, isDarkMode ? 0.12 : 0.04), 
                transition: "background-color 0.2s ease"
              },
            };
          }
          return {};
        }}
      />
    </Paper>
  );
};

export default CalendarView;