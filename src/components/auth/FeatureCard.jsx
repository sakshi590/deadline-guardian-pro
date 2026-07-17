// src/components/auth/FeatureCard.jsx
import { Card, CardContent, Typography, Box, alpha } from "@mui/material";
import { useTheme } from "@mui/material/styles"; // ✅ FIXED: Access active design tokens directly
import { motion } from "framer-motion";

const MotionCard = motion(Card);

const FeatureCard = ({
  icon,
  title,
  description,
  color = "primary.main", // ✅ UPDATED: Accept dynamic theme paths gracefully
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  // ✅ FIXED: Safely decodes nested theme color paths (e.g., 'primary.main') to protect against parsing failures
  const resolveColor = () => {
    if (color.includes(".")) {
      const [paletteKey, toneKey] = color.split(".");
      return theme.palette[paletteKey][toneKey];
    }
    return color;
  };

  const resolvedColorValue = resolveColor();

  return (
    <MotionCard
      whileHover={{
        y: -8, // Polished to match premium micro-lift ratios
        scale: 1.015,
      }}
      transition={{
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
      }}
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: "24px", // Matches your exact capsule curve layout family
        cursor: "pointer",
        // ✅ UPDATED: Premium dual-mode responsive layout backdrop configuration panel surface
        background: (theme) => theme.palette.mode === "dark"
          ? "linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)"
          : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.default, 0.5)} 100%)`,
        backdropFilter: "blur(20px)",
        border: "1px solid",
        borderColor: (theme) => theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.05)" : "divider",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
        position: "relative",
        overflow: "hidden",
        "&:hover": {
          borderColor: alpha(resolvedColorValue, 0.5),
          boxShadow: (theme) => theme.palette.mode === "dark"
            ? `0 20px 40px ${alpha(resolvedColorValue, 0.15)}, inset 0 1px 0 rgba(255,255,255,0.15)`
            : `0 20px 40px ${alpha(resolvedColorValue, 0.06)}`,
          "& .feature-icon-box": {
            transform: "scale(1.05) rotate(3deg)",
            boxShadow: `0 12px 28px ${alpha(resolvedColorValue, 0.4)}`,
          }
        },
      }}
    >
      <CardContent sx={{ p: 4, height: "100%", display: "flex", flexDirection: "column" }}>
        {/* ================= REFINED DYNAMIC ICON CONTAINER BADGE ================= */}
        <Box
          className="feature-icon-box"
          sx={{
            width: 52,
            height: 52,
            borderRadius: "14px", // Standardised to match your modern dashboard squircles
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 3,
            color: (theme) => {
              if (color.includes(".")) {
                const [paletteKey] = color.split(".");
                return theme.palette[paletteKey].contrastText;
              }
              return "#FFFFFF";
            },
            background: `linear-gradient(135deg, ${resolvedColorValue} 0%, ${alpha(resolvedColorValue, 0.8)} 100%)`,
            boxShadow: `0 8px 20px ${alpha(resolvedColorValue, 0.25)}`,
            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {icon}
        </Box>

        {/* Title Content */}
        <Typography
          variant="subtitle1"
          fontWeight={800} // Upgraded weight for premium brand harmony profile
          gutterBottom
          sx={{
            color: "text.primary", // ✅ UPDATED: Stark adaptive contrast text
            letterSpacing: "-0.015em",
            mb: 1.25
          }}
        >
          {title}
        </Typography>

        {/* Body Description Text */}
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary", // ✅ UPDATED: High contrast secondary text node tracking 
            lineHeight: 1.65,
            fontSize: "0.9rem",
            fontWeight: 500
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </MotionCard>
  );
};

export default FeatureCard;
