import { useState } from "react";

import {
  Paper,
  Typography,
  Button,
} from "@mui/material";

import { useTasks } from "../../context/TaskContext";
import { askGemini } from "../../services/geminiService";

function AIRiskDetector() {

  const { tasks } = useTasks();

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const detectRisk = async () => {

    setLoading(true);

    const prompt = `
Analyze these tasks.

${JSON.stringify(tasks)}

Find:

Overdue Tasks

High Risk Tasks

Conflicting Deadlines

Productivity Risks

Return suggestions.
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
        AI Risk Detector
      </Typography>

      <Button
        variant="contained"
        onClick={detectRisk}
      >
        {loading
          ? "Analyzing..."
          : "Analyze Risks"}
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

export default AIRiskDetector;