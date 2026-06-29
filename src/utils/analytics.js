export const getCompletionRate = (tasks = []) => {
  if (tasks.length === 0) return 0;

  const completed = tasks.filter(t => t.completed).length;
  return Math.round((completed / tasks.length) * 100);
};

export const getCategoryStats = (tasks = []) => {
  const map = {};

  tasks.forEach(task => {
    const cat = task.category || "General";
    map[cat] = (map[cat] || 0) + 1;
  });

  return Object.entries(map).map(([name, value]) => ({
    name,
    value,
  }));
};

export const getPriorityStats = (tasks = []) => {
  return [
    {
      name: "High",
      value: tasks.filter(t => t.priority === "High").length,
    },
    {
      name: "Medium",
      value: tasks.filter(t => t.priority === "Medium").length,
    },
    {
      name: "Low",
      value: tasks.filter(t => t.priority === "Low").length,
    },
  ];
};

export const getWeeklyTrend = (tasks = []) => {
  const days = {};

  tasks.forEach(task => {
    const date = new Date(task.createdAt)
      .toISOString()
      .split("T")[0];

    days[date] = (days[date] || 0) + 1;
  });

  return Object.entries(days).map(([date, count]) => ({
    date,
    count,
  }));
};