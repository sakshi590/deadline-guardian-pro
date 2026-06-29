import { Box, Typography } from "@mui/material";

function ProductivityScore({ score }) {
  let message = "";

  if (score >= 90) message = "Excellent! You're highly productive.";
  else if (score >= 70) message = "Great work! Keep it up.";
  else if (score >= 50) message = "You're doing well. Stay focused.";
  else message = "Let's complete a few more tasks today!";

  return (
    <Box sx={{ mt: 4, pt: 3, borderTop: "1px solid #f1f5f9" }}>
      <Typography fontSize="14px" fontWeight={700} color="#334155">
        Productivity Score
      </Typography>

      <Typography variant="h4" color="#2563eb" fontWeight={700} sx={{ mt: 1, letterSpacing: "-0.5px" }}>
        {score} <span style={{ fontSize: "16px", color: "#64748b", fontWeight: 500 }}>/ 100</span>
      </Typography>

      <Typography fontSize="13px" color="#64748b" sx={{ mt: 1, fontWeight: 500 }}>
        {message}
      </Typography>
    </Box>
  );
}

export default ProductivityScore;
