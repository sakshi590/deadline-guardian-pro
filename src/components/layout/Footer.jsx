// src/components/layout/Footer.jsx
import { Box, Typography, Link, Stack } from "@mui/material";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        px: 3,
        py: 2.5, // Enhanced padding spacing scale alignment
        borderTop: "1px solid",
        borderColor: "divider", // Adaptable context line trace
        bgcolor: "background.paper", // Seamless light/dark surface card background context
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={1.5}
        // ✅ FIXED: Handled layout arrangement properties via theme-safe sx styling parameters 
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", fontWeight: 500 }} // Secure fluid context matching layout tags
        >
          © {year} Deadline Guardian Pro. All rights reserved.
        </Typography>

        <Stack
          direction="row"
          spacing={3}
        >
          <Link
            href="#"
            underline="none" // Upgraded hover signature trace profiles
            fontSize={14}
            sx={{
              color: "text.secondary",
              fontWeight: 600,
              transition: "color 0.2s ease",
              "&:hover": {
                color: "primary.main", // Shunts cleanly to brand primary violet upon hover triggers
              }
            }}
          >
            Privacy Policy
          </Link>

          <Link
            href="#"
            underline="none"
            fontSize={14}
            sx={{
              color: "text.secondary",
              fontWeight: 600,
              transition: "color 0.2s ease",
              "&:hover": {
                color: "primary.main",
              }
            }}
          >
            Terms
          </Link>

          <Link
            href="#"
            underline="none"
            fontSize={14}
            sx={{
              color: "text.secondary",
              fontWeight: 600,
              transition: "color 0.2s ease",
              "&:hover": {
                color: "primary.main",
              }
            }}
          >
            Support
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Footer;
