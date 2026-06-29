import dayjs from "dayjs";

// ============================
// AI PRIORITY SCORING ENGINE
// ============================
export const getAIPriorityScore = (task) => {
  let score = 0;

  // Priority weight
  if (task.priority === "High") score += 50;
  if (task.priority === "Medium") score += 30;
  if (task.priority === "Low") score += 10;

  // Due date urgency
  if (task.dueDate) {
    const daysLeft = dayjs(task.dueDate).diff(dayjs(), "day");

    if (daysLeft < 0) score += 100; // overdue
    else if (daysLeft === 0) score += 80;
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
  const today = dayjs();

  // count tasks per day
  const loadMap = {};

  tasks.forEach((t) => {
    if (!t.dueDate) return;

    const date = t.dueDate;
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
  const map = {};

  tasks.forEach((t) => {
    if (!t.dueDate) return;
    map[t.dueDate] = (map[t.dueDate] || 0) + 1;
  });

  return Object.keys(map).filter((date) => map[date] > 4);
};