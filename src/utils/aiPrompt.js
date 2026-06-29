export const buildTaskAnalysisPrompt = (tasks) => {
  if (!tasks.length) {
    return "There are currently no tasks. Suggest how the user should begin organizing their work.";
  }

  const taskList = tasks
    .map(
      (task, index) => `
Task ${index + 1}

Title: ${task.title}

Description: ${task.description}

Priority: ${task.priority}

Status: ${task.completed ? "Completed" : "Pending"}

Due Date: ${task.dueDate}

Estimated Hours: ${task.estimatedHours}
`
    )
    .join("\n");

  return `
You are Deadline Guardian AI.

You are an expert productivity coach.

Analyze the following tasks.

${taskList}

Give your answer in this format:

1. Highest Priority Tasks

2. Tasks at Risk

3. Productivity Suggestions

4. Recommended Order

Keep the answer short and actionable.
`;
};