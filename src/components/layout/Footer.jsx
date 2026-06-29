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
        py: 2,
        borderTop: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={1}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          variant="body2"
          color="text.secondary"
        >
          © {year} Deadline Guardian Pro. All rights reserved.
        </Typography>

        <Stack
          direction="row"
          spacing={3}
        >
          <Link
            href="#"
            underline="hover"
            color="inherit"
            fontSize={14}
          >
            Privacy Policy
          </Link>

          <Link
            href="#"
            underline="hover"
            color="inherit"
            fontSize={14}
          >
            Terms
          </Link>

          <Link
            href="#"
            underline="hover"
            color="inherit"
            fontSize={14}
          >
            Support
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Footer;