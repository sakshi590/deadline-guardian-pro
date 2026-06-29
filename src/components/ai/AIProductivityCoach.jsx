import { useState } from "react";

import {
  Paper,
  Typography,
  Button,
} from "@mui/material";

import { useTasks } from "../../context/TaskContext";
import { askGemini } from "../../services/geminiService";

function AIProductivityCoach() {

  const { tasks } = useTasks();

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState("");

  const getAdvice = async () => {

    setLoading(true);

    const prompt = `
You are a productivity coach.

Here are my tasks:

${JSON.stringify(tasks)}

Analyze my productivity.

Give:

Strengths

Weaknesses

Suggestions

Motivation
`;

    const response = await askGemini(prompt);

    setResult(response);

    setLoading(false);

  };

  return (

    <Paper sx={{p:3}}>

      <Typography
        variant="h6"
        sx={{mb:2}}
      >
        AI Productivity Coach
      </Typography>

      <Button
        variant="contained"
        onClick={getAdvice}
      >
        {loading
          ? "Thinking..."
          : "Get Advice"}
      </Button>

      <Typography
        sx={{
          mt:3,
          whiteSpace:"pre-wrap"
        }}
      >
        {result}
      </Typography>

    </Paper>

  );

}

export default AIProductivityCoach;