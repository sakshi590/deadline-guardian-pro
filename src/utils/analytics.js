// src/utils/analytics.js

/**
 * Calculates the percentage of tasks successfully completed.
 * Safely returns a 0 placeholder if the dataset array is empty.
 */
export const getCompletionRate = (tasks = []) => {
  const cleanTasks = Array.isArray(tasks) ? tasks : [];
  if (cleanTasks.length === 0) return 0;

  const completed = cleanTasks.filter(t => t && t.completed).length;
  return Math.round((completed / cleanTasks.length) * 100);
};

/**
 * Groups total user tasks together by category labels.
 * Transforms records smoothly into Recharts pie-segment datasets.
 */
export const getCategoryStats = (tasks = []) => {
  const cleanTasks = Array.isArray(tasks) ? tasks : [];
  const map = {};

  cleanTasks.forEach(task => {
    if (!task) return;
    const cat = task.category || "General";
    map[cat] = (map[cat] || 0) + 1;
  });

  return Object.entries(map).map(([name, value]) => ({
    name,
    value,
  }));
};

/**
 * Builds a strict priority segmentation metrics list.
 * Safely aggregates tasks across all execution backlogs.
 */
export const getPriorityStats = (tasks = []) => {
  const cleanTasks = Array.isArray(tasks) ? tasks : [];
  
  return [
    {
      name: "High",
      value: cleanTasks.filter(t => t && t.priority === "High").length,
    },
    {
      name: "Medium",
      value: cleanTasks.filter(t => t && t.priority === "Medium").length,
    },
    {
      name: "Low",
      value: cleanTasks.filter(t => t && t.priority === "Low").length,
    },
  ];
};

/**
 * Aggregates task creation volume patterns across a 7-day timeline.
 * Chronologically sorts charts to keep trend vector pathways running smoothly.
 */
export const getWeeklyTrend = (tasks = []) => {
  const cleanTasks = Array.isArray(tasks) ? tasks : [];
  const days = {};

  cleanTasks.forEach(task => {
    if (!task) return;

    // ✅ FIXED: Checks if task.createdAt is a Firestore ServerTimestamp object or a string token.
    // Safely handles the brief millisecond null window when tasks first sync with the cloud.
    let rawDate = task.createdAt;
    if (rawDate && typeof rawDate.toDate === "function") {
      rawDate = rawDate.toDate(); // Handles native Firestore timestamp conversion
    }

    // Fall back to current time if database synchronization is still in progress
    const dateObj = rawDate ? new Date(rawDate) : new Date();
    
    // Check for an invalid date value before converting to ISO format
    if (!isNaN(dateObj.getTime())) {
      const dateStr = dateObj.toISOString().split("T")[0];
      days[dateStr] = (days[dateStr] || 0) + 1;
    }
  });

  // ✅ FIXED: Transforms the entries object map and chronologically sorts dates asc
  // to prevent Recharts vectors from awkwardly cutting across graph containers.
  return Object.entries(days)
    .map(([date, count]) => ({
      date,
      count,
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
};
