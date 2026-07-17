// src/utils/calendarEvents.js
import dayjs from "dayjs";

export const getCalendarEvents = (tasks = []) => {
  if (!Array.isArray(tasks)) return [];

  // ✅ THE REAL-TIME TIMELINE BOUNDARY
  // Captures today's date dynamically to crosscheck historical deadlines
  const todayStr = dayjs().format("YYYY-MM-DD");

  return tasks
    .filter((task) => task && task.dueDate)
    .map((task) => {
      const date = dayjs(task.dueDate).toDate();

      // Normalize string variables to prevent casing mismatched skips
      const currentStatus = String(task.status || "").trim().toLowerCase();
      const isCompleted = task.completed === true || currentStatus === "completed" || currentStatus === "done";
      
      // 🚨 THE CRITICAL OVERDUE EQUATION:
      // If a task is unfinished AND its dueDate string is less than today's string representation, flag it!
      const isOverdue = !isCompleted && task.dueDate < todayStr;

      // Base Priority Color Mapping
      let eventColor = "#22c55e"; // Low Priority (Green)
      if (task.priority === "High") eventColor = "#ef4444";     // High Priority (Red)
      if (task.priority === "Medium") eventColor = "#f59e0b";   // Medium Priority (Amber)

      // 🚨 THE OVERRIDE: If the task has expired, force its visual color to a solid warning crimson
      if (isOverdue) {
        eventColor = "#dc2626"; 
      }

      return {
        id: task.id,
        // Appends an explicit real-time visual warning label directly to the calendar grid block strings
        title: isOverdue ? `⚠️ [OVERDUE] ${task.title}` : task.title,
        start: date,
        end: date,
        allDay: true,
        resource: task, // ✅ IMPORTANT: full task attached
        color: eventColor,
        isOverdue,
        isCompleted
      };
    });
};
