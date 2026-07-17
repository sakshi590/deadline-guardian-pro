// src/utils/aiPrompt.js

/**
 * Master Task Analysis Prompt
 * Used by the 'Analyze Tasks' button to hydrate the entire dashboard at once.
 */
export const buildTaskAnalysisPrompt = (tasks) => {
  const safeTasks = Array.isArray(tasks) ? tasks : [];

  return `You are Deadline Guardian AI, an elite productivity engineering model.
Analyze the user's task array to prioritize items, assess risk timelines, structure today's itinerary, and generate habit coaching metrics.

User Task Data:
${JSON.stringify(safeTasks, null, 2)}

[CRITICAL INSTRUCTION]
Your response must be a single, raw, minified JSON object matching the exact structure below. 
Do not wrap the output in markdown code blocks like \`\`\`json. Do not include introductory text, explanations, or trailing commentary. Start directly with "{" and end with "}".

Required JSON Output Schema Structure:
{
  "summary": {
    "productivityScore": 85, 
    "updatedTasks": 12,
    "riskyTasks": 2,
    "workload": 24
  },
  "highestPriority": [
    "Task Title A - Short priority reason sentence.",
    "Task Title B - Short priority reason sentence."
  ],
  "risks": [
    {
      "id": "original_task_id_here",
      "title": "Task Title here",
      "dueDate": "YYYY-MM-DD",
      "risk": "High"
    }
  ],
  "planner": [
    {
      "id": "original_task_id_here",
      "time": "09:00 AM",
      "task": "Task execution title block"
    }
  ],
  "recommendations": [
    "Actionable strategy sentence 1",
    "Actionable strategy sentence 2"
  ],
  "coach": {
    "score": 85,
    "strengths": ["Identified work habit strength 1", "Strength 2"],
    "suggestions": ["Specific habit correction 1", "Correction 2"],
    "motivation": "A short, high-energy motivational punchline."
  }
}`;
};

/**
 * Daily Planner Incremental Prompt
 * Tailored exclusively for generating an itinerary while safely updating global metrics.
 */
export const buildPlannerPrompt = (tasks) => {
  const safeTasks = Array.isArray(tasks) ? tasks : [];

  return `You are Deadline Guardian AI. Generate a time-blocked schedule for today using the provided tasks.
Tasks:
${JSON.stringify(safeTasks, null, 2)}

Return a raw JSON object matching this schema. Do not wrap in markdown fences. Start directly with "{" and end with "}":
{
  "summary": {
    "workload": 18
  },
  "planner": [
    { "time": "09:00 AM", "task": "Review daily project goals" },
    { "time": "11:30 AM", "task": "Complete high priority tickets" }
  ],
  "recommendations": [
    "Prioritize your time-blocked items during peak focus hours.",
    "Take short 5-minute breathers between deep execution segments."
  ]
}`;
};

/**
 * Risk Detector Incremental Prompt
 * Focuses strictly on predicting deadlines and bottleneck risks.
 */
export const buildRiskPrompt = (tasks) => {
  const safeTasks = Array.isArray(tasks) ? tasks : [];

  return `You are Deadline Guardian AI. Analyze these tasks to locate timeline vulnerabilities and overdue patterns.
Tasks:
${JSON.stringify(safeTasks, null, 2)}

Return a raw JSON object matching this schema. Do not wrap in markdown fences. Start directly with "{" and end with "}":
{
  "summary": {
    "riskyTasks": 3
  },
  "risks": [
    { "title": "Database Migration", "dueDate": "Tomorrow", "risk": "High" }
  ],
  "recommendations": [
    "Delegate or break down high-risk bottleneck elements immediately.",
    "Set buffer notifications 24 hours ahead of vulnerable milestone target limits."
  ]
}`;
};

/**
 * Productivity Coach Incremental Prompt
 * Performs deep behavioral habit assessment.
 */
export const buildCoachPrompt = (tasks) => {
  const safeTasks = Array.isArray(tasks) ? tasks : [];

  return `You are Deadline Guardian AI. Review these tasks to run a habit-coaching performance check.
Tasks:
${JSON.stringify(safeTasks, null, 2)}

Return a raw JSON object matching this schema. Do not wrap in markdown fences. Start directly with "{" and end with "}":
{
  "summary": {
    "productivityScore": 78
  },
  "recommendations": [
    "Establish clear execution endpoints to guard against creative burnout loops.",
    "Review your completion velocity tables weekly to balance incoming workloads."
  ],
  "coach": {
    "score": 78,
    "strengths": ["Consistent morning execution habits"],
    "suggestions": ["Break down tasks larger than 4 hours"],
    "motivation": "Keep pushing, consistency beats intensity every single day!"
  }
}`;
};
