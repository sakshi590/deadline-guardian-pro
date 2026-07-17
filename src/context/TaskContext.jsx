// src/context/TaskContext.jsx
import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { toast } from "react-hot-toast"; 
import * as taskService from "../services/taskService";
import { getAIPriorityScore } from "../utils/aiTaskEngine";
import dayjs from "dayjs";

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null); 

  // Keep track of tasks that have already fired alerts in this session to prevent spamming
  const [firedAlerts, setFiredAlerts] = useState(new Set());

  // 1. Sync tasks in real-time with Firebase Firestore
  useEffect(() => {
    if (!user) {
      setTasks([]);
      return;
    }
    
    setLoading(true);
    const unsubscribe = taskService.listenTasks(user.uid, (firebaseTasks) => {
      setTasks(firebaseTasks);
      setLoading(false);
    }, (err) => {
      setError(err.message);
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  // 2. ✅ THE REAL-TIME NOTIFICATION ENGINE LOOP:
  // Runs quietly in the background every 60 seconds to guard active task deadlines.
  useEffect(() => {
    if (!tasks || tasks.length === 0 || !user) return;

    const checkDeadlines = () => {
      // 🛡️ USER PREFERENCE GUARD SHIELD:
      // Extracts real-time cloud notification settings directly from your active Firebase profile
      const userSettings = user?.settings || {};
      
      const masterAlertsOn = userSettings.notifications !== false;
      const browserPushOn = userSettings.browserNotifications !== false;
      const morningRemindersOn = userSettings.reminderNotifications !== false;

      // 🚨 INTERCEPTOR GATE: If user mutes any preference configuration, gracefully halt the engine!
      if (!masterAlertsOn || !browserPushOn || !morningRemindersOn) {
        console.log("🔔 Real-time alerts loop paused via user settings document parameters.");
        return;
      }

      const todayStr = dayjs().format("YYYY-MM-DD");

      tasks.forEach((task) => {
        if (!task || !task.title || firedAlerts.has(task.id)) return;

        const currentStatus = String(task.status || "").trim().toLowerCase();
        if (currentStatus === "completed" || currentStatus === "done" || task.completed) return;

        const rawDateStr = task.dueDate || task.date || "";
        if (!rawDateStr) return;

        // Verify if the task is due exactly today
        if (rawDateStr === todayStr) {
          // Add to fired tracking set immediately to prevent duplicate alerts
          setFiredAlerts((prev) => new Set(prev).add(task.id));

          // 🔊 Play a premium notification sound effect asset cleanly from the Mixkit library
          try {
            const audio = new Audio("https://mixkit.co");
            audio.volume = 0.5;
            audio.play();
          } catch (e) {
            console.log("Audio play blocked by browser autoplay policy");
          }

          // 🚨 Push a high-priority, persistent real-time message card to the screen layout
          toast.custom(
            (t) => (
              <div
                style={{
                  animation: t.visible ? "fadeInUp 0.3s ease" : "fadeOutDown 0.3s ease",
                  background: "#0F172A",
                  color: "#FFF",
                  padding: "16px 20px",
                  borderRadius: "16px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                  border: "1px solid #EF4444",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  maxWidth: "380px",
                  width: "100%"
                }}
              >
                <div style={{ fontSize: "24px" }}>🚨</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: "0.9rem", color: "#EF4444" }}>
                    CRITICAL DEADLINE TODAY
                  </div>
                  <div style={{ fontWeight: 700, fontSize: "0.85rem", margin: "2px 0", color: "#F8FAFC" }}>
                    {task.title}
                  </div>
                  {task.description && (
                    <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                      {task.description}
                    </div>
                  )}
                </div>
              </div>
            ),
            { duration: 10000, position: "top-right" }
          );
        }
      });
    };

    // Run the check once immediately on load, then set up the 1-minute interval clock loop
    checkDeadlines();
    const intervalId = setInterval(checkDeadlines, 60000);

    return () => clearInterval(intervalId);
  }, [tasks, user, firedAlerts]);

  // Create a new task
  const addTask = useCallback(async (task) => {
    if (!user) return;
    try {
      setLoading(true);
      const cleanDueDate = task.dueDate ? dayjs(task.dueDate).format("YYYY-MM-DD") : "";

      await taskService.addTask(user.uid, {
        title: task.title,
        description: task.description || "",
        category: task.category || "General",
        priority: task.priority || "Medium",
        status: task.status || "Pending",
        dueDate: cleanDueDate,
        reminder: task.reminder || "",
        estimatedHours: Number(task.estimatedHours) || 1,
        tags: Array.isArray(task.tags) 
          ? task.tags 
          : typeof task.tags === "string" 
            ? task.tags.split(",").map((t) => t.trim()).filter(Boolean) 
            : [],
        completed: false,
        aiPriorityScore: getAIPriorityScore(task),
        aiReason: "",
      });
      toast.success("Task created successfully!");
    } catch (err) {
      setError(err.message);
      toast.error("Failed to create task");
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Update existing task
  const updateTask = useCallback(async (id, updatedTask) => {
    if (!user) return;
    try {
      setLoading(true);
      const cleanTags = Array.isArray(updatedTask.tags) ? updatedTask.tags : [];
      const cleanDueDate = updatedTask.dueDate ? dayjs(updatedTask.dueDate).format("YYYY-MM-DD") : "";

      await taskService.updateTask(user.uid, id, {
        ...updatedTask,
        dueDate: cleanDueDate,
        tags: cleanTags,
        aiPriorityScore: getAIPriorityScore(updatedTask),
      });
      toast.success("Changes saved to cloud!");
    } catch (err) {
      setError(err.message);
      toast.error("Failed to update task");
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Delete task record out of Firestore
  const deleteTask = useCallback(async (id) => {
    if (!user) return;
    try {
      setLoading(true);
      await taskService.deleteTask(user.uid, id);
      toast.error("Task deleted permanently.");
      setTaskToDelete(null);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to delete task");
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Toggle complete state safely
  const toggleComplete = useCallback(async (id) => {
    if (!user) return;
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    
    try {
      const targetState = !task.completed;
      const cleanDueDate = task.dueDate ? dayjs(task.dueDate).format("YYYY-MM-DD") : "";

      await taskService.updateTask(user.uid, id, {
        ...task,
        dueDate: cleanDueDate,
        completed: targetState,
        status: targetState ? "Completed" : "Pending",
      });
      toast.success(targetState ? "Task completed! 🎉" : "Task marked pending");
    } catch (err) {
      setError(err.message);
    }
  }, [user, tasks]);

  const getTaskById = useCallback((id) => tasks.find((task) => task.id === id), [tasks]);
  const getUpcomingTasks = useCallback(() => {
    return [...tasks]
      .filter((task) => {
        if (!task || !task.title) return false;
        const currentStatus = String(task.status || "").trim().toLowerCase();
        return currentStatus !== "completed" && currentStatus !== "done";
      })
      .sort((a, b) => dayjs(a.dueDate || 0).unix() - dayjs(b.dueDate || 0).unix());
  }, [tasks]);

  const totalTasks = tasks.length;
  const completedTasks = useMemo(() => tasks.filter((task) => task.completed).length, [tasks]);
  const pendingTasks = useMemo(() => tasks.filter((task) => !task.completed).length, [tasks]);
  
  const overdueTasks = useMemo(() => {
    const todayStr = dayjs().format("YYYY-MM-DD");
    return tasks.filter((task) => !task.completed && task.dueDate && task.dueDate < todayStr).length;
  }, [tasks]);

  const todayTasks = useMemo(() => {
    const todayStr = dayjs().format("YYYY-MM-DD");
    return tasks.filter((task) => task.dueDate === todayStr).length;
  }, [tasks]);

  const contextValue = useMemo(() => ({
    tasks, loading, error, addTask, updateTask, deleteTask, toggleComplete,
    totalTasks, completedTasks, pendingTasks, overdueTasks, todayTasks,
    getTaskById, getUpcomingTasks, taskToDelete, setTaskToDelete, 
  }), [
    tasks, loading, error, addTask, updateTask, deleteTask, toggleComplete,
    totalTasks, completedTasks, pendingTasks, overdueTasks, todayTasks,
    getTaskById, getUpcomingTasks, taskToDelete,
  ]);

  return <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>;
};
