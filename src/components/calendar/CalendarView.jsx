import { useMemo } from "react";
import dayjs from "dayjs";

import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  getOverloadedDays,
} from "../../utils/aiTaskEngine";
import { Paper, Stack, Chip } from "@mui/material";

import { useTasks } from "../../context/TaskContext";
import { useUI } from "../../context/UIContext";
import { getCalendarEvents } from "../../utils/calendarEvents";

const localizer = dayjsLocalizer(dayjs);

const CalendarView = () => {
  const { tasks, updateTask } = useTasks(); // ✅ FIXED (inside component)
  const { openTaskDialog } = useUI();

  const events = useMemo(
    () => getCalendarEvents(tasks),
    [tasks]
  );

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: event.color,
        borderRadius: "8px",
        border: "none",
        color: "#fff",
        padding: "3px 6px",
        fontWeight: 600,
      },
    };
  };

  // 📌 Create task on empty slot click
  const handleSelectSlot = (slotInfo) => {
  openTaskDialog(
    {
      dueDate: slotInfo.start.toISOString().split("T")[0],
    },
    "create" // ✅ IMPORTANT
  );
};
  const overloadedDays = useMemo(
  () => getOverloadedDays(tasks),
  [tasks]
);
  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
      {/* Legend */}
      <Stack direction="row" spacing={2} mb={3}>
        <Chip label="High" sx={{ bgcolor: "#ef4444", color: "#fff" }} />
        <Chip label="Medium" sx={{ bgcolor: "#f59e0b", color: "#fff" }} />
        <Chip label="Low" sx={{ bgcolor: "#22c55e", color: "#fff" }} />
      </Stack>

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

        style={{ height: "75vh" }}

        // 📌 Open task on click
       onSelectEvent={(event) => {
  openTaskDialog(event.resource, "edit");
}}

        // 📌 Drag & drop (ONLY works if addon is installed)
        draggableAccessor={() => true}
        onEventDrop={({ event, start }) => {
          const updatedTask = {
            ...event.resource,
            dueDate: new Date(start).toISOString().split("T")[0],
          };

          updateTask(event.id, updatedTask);
        }}
        dayPropGetter={(date) => {
  const formatted = dayjs(date).format("YYYY-MM-DD");

  if (overloadedDays.includes(formatted)) {
    return {
      style: {
        backgroundColor: "#fff1f2",
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