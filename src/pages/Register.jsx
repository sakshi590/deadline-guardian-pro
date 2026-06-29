import { Box, Paper, Typography } from "@mui/material";

function Register() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper sx={{ p: 5, width: 450, maxWidth: "90%" }}>
        <Typography variant="h4" align="center">
          Register
        </Typography>

        {/* Register Form */}
      </Paper>
    </Box>
  );
}

export default Register;