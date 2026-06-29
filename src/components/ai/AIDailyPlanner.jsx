import { useState } from "react";
import {
  Paper,
  Typography,
  Button,
  TextField,
  Stack,
} from "@mui/material";

import { useTasks } from "../../context/TaskContext";
import { askGemini } from "../../services/geminiService";

function AIDailyPlanner() {
  const { tasks } = useTasks();

  const [hours, setHours] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const generatePlan = async () => {
    setLoading(true);

    const prompt = `
You are an AI productivity planner.

Available Hours Today:
${hours}

Tasks:
${JSON.stringify(tasks)}

Create a realistic schedule.

Return:
Time
Task
Reason
`;

    const response = await askGemini(prompt);

    setResult(response);

    setLoading(false);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Stack spacing={2}>
        <Typography variant="h6">
          AI Daily Planner
        </Typography>

        <TextField
          label="Available Hours Today"
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        />

        <Button
          variant="contained"
          onClick={generatePlan}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Plan"}
        </Button>

        <Typography
          sx={{
            whiteSpace: "pre-wrap",
          }}
        >
          {result}
        </Typography>
      </Stack>
    </Paper>
  );
}

export default AIDailyPlanner;