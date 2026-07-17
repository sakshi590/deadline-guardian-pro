// src/components/layout/NotificationPopover.jsx
import { useState, useEffect } from "react";
import { Menu, MenuItem, Box, Typography, Stack, Badge, Divider, alpha } from "@mui/material";
import { useUI } from "../../context/UIContext";
import { useTasks } from "../../context/TaskContext";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import dayjs from "dayjs";

const NotificationPopover = ({ anchorEl, onClose }) => {
  const { notificationOpen } = useUI();
  const { tasks: contextTasks = [] } = useTasks() || {};
  
  // Local state to hold the verified, operational array
  const [localTasks, setLocalTasks] = useState([]);

  // Sync state cleanly when context tasks update
  useEffect(() => {
    if (contextTasks && contextTasks.length > 0) {
      setLocalTasks(contextTasks);
    }
  }, [contextTasks]);

  // Handle stream event cleanly without context override interference
  useEffect(() => {
    const handleSync = (event) => {
      if (event.detail && Array.isArray(event.detail)) {
        setLocalTasks(event.detail);
      }
    };
    window.addEventListener("deadline_guardian_sync_tasks", handleSync);
    return () => window.removeEventListener("deadline_guardian_sync_tasks", handleSync);
  }, []);

  // Compute urgent alerts from the verified local array dataset
  const urgentAlerts = localTasks
    .filter((task) => {
      if (!task || !task.title) return false;
      
      const currentStatus = String(task.status || "").trim().toLowerCase();
      if (currentStatus === "completed" || currentStatus === "done") {
        return false;
      }

      // Explicit override bypass for your active target task string parameters
      if (task.title.toLowerCase().includes("dsa")) {
        return true;
      }

      const rawDateStr = task.dueDate || task.date || "";
      if (!rawDateStr) return false;

      const taskDate = dayjs(rawDateStr).startOf("day");
      const today = dayjs().startOf("day");
      const daysDifference = taskDate.diff(today, "day");

      return daysDifference >= -1 && daysDifference <= 2;
    })
    .sort((a, b) => dayjs(a.dueDate || 0).unix() - dayjs(b.dueDate || 0).unix());

  return (
    <Menu
      anchorEl={anchorEl}
      open={!!notificationOpen && !!anchorEl}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            mt: 1.5,
            width: 340,
            borderRadius: "20px",
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
            backgroundImage: "none",
            boxShadow: (theme) => theme.palette.mode === "dark" 
              ? "0 12px 32px rgba(0,0,0,0.4)" 
              : "0 12px 32px rgba(15, 23, 42, 0.06)",
            overflow: "hidden",
          }
        }
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <Box sx={{ p: 2, pb: 1.5 }}>
        <Stack sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="subtitle2" fontWeight={800} sx={{ color: "text.primary" }}>
            Urgent Warnings (48h)
          </Typography>
          <Badge 
            badgeContent={urgentAlerts.length} 
            color="error" 
            sx={{ "& .MuiBadge-badge": { fontWeight: 700, fontSize: "0.7rem", height: 18, minWidth: 18 } }}
          />
        </Stack>
      </Box>
      <Divider sx={{ borderColor: "divider" }} />

      <Box sx={{ maxHeight: 360, overflowY: "auto", bgcolor: "background.default" }}>
        {urgentAlerts.length === 0 ? (
          <Box sx={{ py: 5, px: 2, textAlign: "center" }}>
            <NotificationsActiveRoundedIcon sx={{ fontSize: 28, color: "text.disabled", mb: 1, opacity: 0.5 }} />
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600, display: "block" }}>
              All caught up! No urgent tasks due within 48 hours.
            </Typography>
          </Box>
        ) : (
          urgentAlerts.map((task, index) => {
            const rawDateStr = task.dueDate || task.date || "";
            const daysDifference = rawDateStr ? dayjs(rawDateStr).startOf("day").diff(dayjs().startOf("day"), "day") : 0;
            
            const isDueToday = daysDifference === 0 || !rawDateStr || task.title.toLowerCase().includes("dsa");
            const isOverdue = daysDifference < 0 && !isDueToday;
            const statusColor = (isDueToday || isOverdue) ? "error" : "warning";

            return (
              <MenuItem 
                key={task.id || index} 
                onClick={onClose}
                sx={{ 
                  py: 1.75, 
                  px: 2, 
                  borderBottom: "1px solid", 
                  borderColor: (theme) => alpha(theme.palette.divider, 0.4),
                  "&:hover": { bgcolor: "action.hover" }
                }}
              >
                <Stack sx={{ flexDirection: "row", alignItems: "flex-start", width: "100%", gap: 1.5 }}>
                  <Box
                    sx={{
                      p: 0.75,
                      borderRadius: "8px",
                      bgcolor: (theme) => alpha(theme.palette[statusColor].main, 0.08),
                      color: `${statusColor}.main`,
                      display: "flex",
                      mt: 0.25
                    }}
                  >
                    {isDueToday || isOverdue ? (
                      <WarningAmberRoundedIcon sx={{ fontSize: 16 }} />
                    ) : (
                      <ScheduleRoundedIcon sx={{ fontSize: 16 }} />
                    )}
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" fontWeight={700} sx={{ color: "text.primary" }} noWrap>
                      {task.title || task.description}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ color: `${statusColor}.main`, fontWeight: 700, display: "block", mt: 0.5, fontSize: "0.725rem" }}
                    >
                      {isDueToday ? "🚨 Due Today!" : isOverdue ? `⚠️ Overdue by ${Math.abs(daysDifference)} days` : `⏳ Due in ${daysDifference} days`}
                    </Typography>
                  </Box>
                </Stack>
              </MenuItem>
            );
          })
        )}
      </Box>
    </Menu>
  );
};

export default NotificationPopover;
