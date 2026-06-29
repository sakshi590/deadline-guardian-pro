import dayjs from "dayjs";

export const getCalendarEvents = (tasks = []) => {
  return tasks
    .filter((task) => task.dueDate)
    .map((task) => {
      const date = dayjs(task.dueDate).toDate();

      return {
        id: task.id,

        title: task.title,

        start: date,
        end: date,

        allDay: true,

        resource: task, // ✅ IMPORTANT: full task attached

        color:
          task.priority === "High"
            ? "#ef4444"
            : task.priority === "Medium"
            ? "#f59e0b"
            : "#22c55e",
      };
    });
};