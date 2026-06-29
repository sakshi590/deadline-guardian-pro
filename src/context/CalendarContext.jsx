import { createContext, useContext, useMemo, useState } from "react";
import { useTasks } from "./TaskContext";

const CalendarContext = createContext();

export function CalendarProvider({ children }) {
  const { tasks } = useTasks();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const today = new Date();

  const previousMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1
      )
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        1
      )
    );
  };

  const goToToday = () => {
    const now = new Date();
    setCurrentDate(now);
    setSelectedDate(now);
  };

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);

    const lastDay = new Date(year, month + 1, 0);

    const start = firstDay.getDay();

    const days = [];

    for (let i = 0; i < start; i++) {
      days.push(null);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  }, [currentDate]);

  const selectedTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (!task.dueDate) return false;

      return (
        new Date(task.dueDate).toDateString() ===
        selectedDate.toDateString()
      );
    });
  }, [tasks, selectedDate]);

  return (
    <CalendarContext.Provider
      value={{
        currentDate,
        selectedDate,
        today,
        calendarDays,
        selectedTasks,
        setSelectedDate,
        previousMonth,
        nextMonth,
        goToToday,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar() {
  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error(
      "useCalendar must be used inside CalendarProvider"
    );
  }

  return context;
}