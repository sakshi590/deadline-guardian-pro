import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  getAIPriorityScore,
} from "../utils/aiTaskEngine";
const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("deadline_guardian_tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ============================
  // SAVE TO LOCAL STORAGE
  // ============================
  useEffect(() => {
    localStorage.setItem(
      "deadline_guardian_tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  // ============================
  // CREATE TASK
  // ============================
  const addTask = (task) => {
    try {
      setLoading(true);

      const newTask = {
        id: crypto.randomUUID(),

        title: task.title,
        description: task.description || "",

        category: task.category || "General",
        priority: task.priority || "Medium",

        // ✅ FIXED: consistent status system
        status: task.status || "Pending",

        dueDate: task.dueDate || "",
        reminder: task.reminder || "",

        estimatedHours: Number(task.estimatedHours) || 1,

        tags: Array.isArray(task.tags)
          ? task.tags
          : typeof task.tags === "string"
          ? task.tags.split(",").map((t) => t.trim()).filter(Boolean)
          : [],

        completed: false,

        aiPriorityScore: 0,
        aiReason: "",

        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        aiPriorityScore: getAIPriorityScore(task),
aiReason: "",
      };

      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // UPDATE TASK
  // ============================
  const updateTask = (id, updatedTask) => {
  setTasks((prev) =>
    prev.map((task) =>
      task.id === id
        ? {
            ...task,
            ...updatedTask,
            aiPriorityScore: getAIPriorityScore({
              ...task,
              ...updatedTask,
            }),
            updatedAt: new Date().toISOString(),
          }
        : task
    )
  );
};
  // ============================
  // DELETE TASK
  // ============================
  const deleteTask = (id) => {
    setTasks((prev) =>
      prev.filter((task) => task.id !== id)
    );
  };

  // ============================
  // TOGGLE COMPLETE (FIXED)
  // ============================
  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,

              // ✅ keep status consistent everywhere
              status: !task.completed
                ? "Completed"
                : "Pending",

              updatedAt: new Date().toISOString(),
            }
          : task
      )
    );
  };

  // ============================
  // HELPERS
  // ============================
  const getTaskById = (id) =>
    tasks.find((task) => task.id === id);

  const getUpcomingTasks = () =>
    [...tasks]
      .filter(
        (task) =>
          !task.completed && task.dueDate
      )
      .sort(
        (a, b) =>
          new Date(a.dueDate) -
          new Date(b.dueDate)
      );

  // ============================
  // DASHBOARD STATS
  // ============================
  const totalTasks = useMemo(
    () => tasks.length,
    [tasks]
  );

  const completedTasks = useMemo(
    () =>
      tasks.filter((task) => task.completed)
        .length,
    [tasks]
  );

  const pendingTasks = useMemo(
    () =>
      tasks.filter((task) => !task.completed)
        .length,
    [tasks]
  );

  const overdueTasks = useMemo(() => {
    const today = new Date();

    return tasks.filter(
      (task) =>
        !task.completed &&
        task.dueDate &&
        new Date(task.dueDate) < today
    ).length;
  }, [tasks]);

  const todayTasks = useMemo(() => {
    const today = new Date()
      .toISOString()
      .split("T")[0];

    return tasks.filter(
      (task) => task.dueDate === today
    ).length;
  }, [tasks]);

  // ============================
  // CONTEXT VALUE
  // ============================
  const value = {
    tasks,
    loading,
    error,

    addTask,
    updateTask,
    deleteTask,
    toggleComplete,

    totalTasks,
    completedTasks,
    pendingTasks,
    overdueTasks,
    todayTasks,

    getTaskById,
    getUpcomingTasks,
  };
  
  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};