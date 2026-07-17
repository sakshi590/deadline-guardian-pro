// src/components/calendar/CalendarSidebar.jsx
import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
  alpha,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import useCalendar from "./hooks/useCalendar";
import TaskChip from "./TaskChip";
import TaskDialog from "../task/TaskDialog";

function CalendarSidebar() {
  const {
    selectedDate,
    selectedTasks,
  } = useCalendar();

  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <Card
        elevation={0} // Standardised to flat family look matching CalendarGrid
        sx={{
          borderRadius: "24px", // Matches your exact capsule curve layout family
          border: "1px solid",
          borderColor: "divider", // Theme adaptive separation outline trace line
          bgcolor: "background.paper", // Seamless light / dark card backing surface
          height: "100%",
          boxShadow: (theme) => theme.palette.mode === "dark" 
            ? "0 10px 30px rgba(0,0,0,0.3)" 
            : "0 10px 30px rgba(15, 23, 42, 0.02)",
        }}
      >
        <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>

          <Typography
            variant="subtitle1"
            fontWeight={800} // Upgraded weight for premium brand harmony profile
            sx={{ color: "text.primary", mb: 1, letterSpacing: "-0.01em" }}
          >
            Selected Date
          </Typography>

          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{ mb: 3, color: "text.secondary" }}
          >
            <CalendarMonthIcon sx={{ fontSize: 20 }} />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {selectedDate.toLocaleDateString()}
            </Typography>
          </Stack>

          <Divider sx={{ mb: 3, borderColor: "divider" }} />

          {selectedTasks.length === 0 ? (
            <Typography sx={{ color: "text.secondary", fontWeight: 500, fontSize: "0.925rem", py: 4, textAlign: "center" }}>
              No tasks for this date.
            </Typography>
          ) : (
            selectedTasks.map((task) => (
              <Box
                key={task.id}
                sx={{
                  mb: 3,
                }}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight={700}
                  sx={{ color: "text.primary", mb: 0.5 }}
                >
                  {task.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", fontWeight: 500, mb: 1.5, lineHeight: 1.5 }}
                >
                  {task.description || "No description provided."}
                </Typography>

                <Stack
                  direction="row"
                  spacing={1}
                  flexWrap="wrap"
                >
                  <TaskChip
                    priority={task.priority}
                  />
                </Stack>

                <Divider sx={{ mt: 2.5, borderColor: "divider" }} />
              </Box>
            ))
          )}

          {/* ================= CAPSULE CTA TRIGGER BUTTON ================= */}
          <Button
            fullWidth
            variant="contained" // Upgraded to contained for clear SaaS action priority
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
            sx={{
              mt: 2,
              borderRadius: "24px", // ✅ UPDATED: Smooth pill capsule curve family look
              textTransform: "none",
              fontWeight: 700,
              fontSize: "0.9rem",
              py: 1.3,
              bgcolor: "primary.main",
              color: "primary.contrastText",
              boxShadow: "none",
              transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
              "&:hover": {
                bgcolor: "primary.dark",
                transform: "translateY(-1px)",
              },
              "&:active": {
                transform: "translateY(0)"
              }
            }}
          >
            Add Task
          </Button>

        </CardContent>
      </Card>

      <TaskDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      />
    </>
  );
}

export default CalendarSidebar;
