// src/utils/aiTaskEngine.js
import dayjs from "dayjs";

// ============================
// AI PRIORITY SCORING ENGINE
// ============================
export const getAIPriorityScore = (task) => {
  if (!task || typeof task !== "object") return 0;
  let score = 0;

  // Priority weight
  if (task.priority === "High") score += 50;
  if (task.priority === "Medium") score += 30;
  if (task.priority === "Low") score += 10;

  // Due date urgency
  if (task.dueDate) {
    // ✅ FIXED: Strips out the current runtime hour/minute timestamps via startOf("day")
    // This stops active tasks due later tonight from getting falsely flagged as overdue.
    const taskDate = dayjs(task.dueDate).startOf("day");
    const todayDate = dayjs().startOf("day");
    const daysLeft = taskDate.diff(todayDate, "day");

    if (daysLeft < 0) score += 100; // overdue
    else if (daysLeft === 0) score += 80; // due today
    else if (daysLeft <= 2) score += 60;
    else if (daysLeft <= 5) score += 30;
  }

  // Category boost
  if (task.category === "Work") score += 15;
  if (task.category === "Project") score += 20;

  return score;
};

// ============================
// AI RECOMMENDED DATE
// ============================
export const getRecommendedDate = (tasks = []) => {
  const cleanTasks = Array.isArray(tasks) ? tasks : [];
  const today = dayjs().startOf("day");

  // count tasks per day
  const loadMap = {};

  cleanTasks.forEach((t) => {
    if (!t || !t.dueDate) return;
    // Normalize format strings to maintain clean mapping matching arrays keys
    const date = dayjs(t.dueDate).format("YYYY-MM-DD");
    loadMap[date] = (loadMap[date] || 0) + 1;
  });

  // find best free day in next 7 days
  for (let i = 0; i < 7; i++) {
    const date = today.add(i, "day").format("YYYY-MM-DD");

    if (!loadMap[date] || loadMap[date] < 3) {
      return date;
    }
  }

  return today.add(1, "day").format("YYYY-MM-DD");
};

// ============================
// OVERLOAD DETECTION
// ============================
export const getOverloadedDays = (tasks = []) => {
  const cleanTasks = Array.isArray(tasks) ? tasks : [];
  const map = {};

  cleanTasks.forEach((t) => {
    if (!t || !t.dueDate) return;
    const date = dayjs(t.dueDate).format("YYYY-MM-DD");
    map[date] = (map[date] || 0) + 1;
  });

  return Object.keys(map).filter((date) => map[date] > 4);
};
