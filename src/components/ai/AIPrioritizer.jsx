import {
  Button,
  Paper,
  Typography,
} from "@mui/material";

import { useState } from "react";

import { useTasks } from "../../context/TaskContext";

import { askGemini } from "../../services/geminiService";

function AIPrioritizer() {
  const { tasks } = useTasks();

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleClick = async () => {
    setLoading(true);

    const prompt = `
You are a productivity assistant.

Prioritize these tasks:

${JSON.stringify(tasks)}

Return only a numbered priority list with a short reason.
`;

    const response = await askGemini(prompt);

    setResult(response);

    setLoading(false);
  };

  return (
    <Paper sx={{ p: 3 }}>

      <Typography
        variant="h6"
        sx={{ mb: 2 }}
      >
        AI Task Prioritizer
      </Typography>

      <Button
        variant="contained"
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? "Thinking..." : "Prioritize Tasks"}
      </Button>

      <Typography
        sx={{
          mt: 3,
          whiteSpace: "pre-wrap",
        }}
      >
        {result}
      </Typography>

    </Paper>
  );
}

export default AIPrioritizer;