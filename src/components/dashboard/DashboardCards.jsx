import { Grid } from "@mui/material";
import DashboardCard from "./DashboardCard";

const cards = [
  {
    title: "Total Tasks",
    value: 12,
    color: "#1976d2",
  },
  {
    title: "Completed",
    value: 8,
    color: "#2e7d32",
  },
  {
    title: "Pending",
    value: 4,
    color: "#ed6c02",
  },
  {
    title: "Due Today",
    value: 2,
    color: "#d32f2f",
  },
];

function DashboardCards() {
  return (
    <Grid container spacing={3}>
      {cards.map((card) => (
        <Grid item xs={12} sm={6} md={3} key={card.title}>
          <DashboardCard
            title={card.title}
            value={card.value}
            color={card.color}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default DashboardCards;