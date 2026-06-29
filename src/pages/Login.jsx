import { Box, Paper, Typography } from "@mui/material";

function Login() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Paper sx={{ p: 5, width: 400, maxWidth: "90%" }}>
        <Typography variant="h4" align="center">
          Login
        </Typography>

        {/* Login Form */}
      </Paper>
    </Box>
  );
}

export default Login;