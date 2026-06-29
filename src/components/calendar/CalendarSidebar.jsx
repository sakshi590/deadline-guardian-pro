import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import { useState } from "react";

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
        elevation={3}
        sx={{
          borderRadius: 4,
          height: "100%",
        }}
      >
        <CardContent>

          <Typography
            variant="h6"
            fontWeight={700}
            gutterBottom
          >
            Selected Date
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            mb={3}
          >
            <CalendarMonthIcon />

            <Typography>
              {selectedDate.toLocaleDateString()}
            </Typography>
          </Stack>

          <Divider sx={{ mb: 3 }} />

          {selectedTasks.length === 0 ? (
            <Typography color="text.secondary">
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
                  fontWeight={700}
                >
                  {task.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  mb={1}
                >
                  {task.description || "No description"}
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

                <Divider sx={{ mt: 2 }} />
              </Box>
            ))
          )}

          <Button
            fullWidth
            sx={{ mt: 2 }}
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
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