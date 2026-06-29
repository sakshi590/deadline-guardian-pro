// src/components/dashboard/DashboardCards.jsx

import { Grid, Card, CardContent, Typography, Stack } from "@mui/material";

import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import { useTasks } from "../../context/TaskContext";

const DashboardCards = () => {
  const { tasks } = useTasks();

  const total = tasks.length;

  const completed = tasks.filter((t) => t.status === "Completed").length;

  const pending = tasks.filter((t) => t.status === "Pending").length;

  const overdue = tasks.filter((t) => {
    if (!t.dueDate) return false;
    if (t.status === "Completed") return false;

    return new Date(t.dueDate) < new Date();
  }).length;

  const cards = [
    {
      title: "Total Tasks",
      value: total,
      icon: <AssignmentTurnedInIcon />,
      color: "#6366F1",
    },
    {
      title: "Completed",
      value: completed,
      icon: <CheckCircleIcon />,
      color: "#22C55E",
    },
    {
      title: "Pending",
      value: pending,
      icon: <PendingActionsIcon />,
      color: "#F59E0B",
    },
    {
      title: "Overdue",
      value: overdue,
      icon: <WarningAmberIcon />,
      color: "#EF4444",
    },
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((card) => (
        <Grid item xs={12} sm={6} md={3} key={card.title}>
          <Card
            elevation={3}
            sx={{
              borderRadius: 4,
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: 6,
              },
            }}
          >
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <div>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {card.title}
                  </Typography>

                  <Typography
                    variant="h4"
                    fontWeight={700}
                    mt={1}
                  >
                    {card.value}
                  </Typography>
                </div>

                <div
                  style={{
                    color: card.color,
                    fontSize: "2rem",
                  }}
                >
                  {card.icon}
                </div>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardCards;