// src/components/ai/AIActionCard.jsx
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Avatar,
  Button,
  CircularProgress,
  alpha, 
} from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

const AIActionCard = ({ title, description, icon, color, loading = false, disabled = false, onClick }) => {
  const isButtonDisabled = loading || disabled;

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "20px", 
        border: "1px solid",
        borderColor: "divider", 
        bgcolor: "background.paper", 
        transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        overflow: "hidden",
        "&:hover": {
          transform: isButtonDisabled ? "none" : "translateY(-3px)", 
          borderColor: isButtonDisabled ? "divider" : (theme) => alpha(theme.palette.text.primary, 0.15),
          boxShadow: (theme) => isButtonDisabled 
            ? "none" 
            : theme.palette.mode === "dark" ? "0 8px 24px rgba(0,0,0,0.4)" : "0 8px 24px rgba(15, 23, 42, 0.03)",
        },
      }}
    >
      <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
        {/* ✅ FIXED: Transferred layout parameters directly into safe sx styling wrappers */}
        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          <Avatar 
            sx={{ 
              width: 44, 
              height: 44, 
              borderRadius: "10px",
              bgcolor: (theme) => {
                if (!color) return alpha(theme.palette.primary.main, 0.08);
                if (color.includes('.')) {
                  const [p, s] = color.split('.');
                  return alpha(theme.palette[p][s], 0.08);
                }
                return alpha(color, 0.08);
              }, 
              color: color || "primary.main",
              border: "1px solid",
              borderColor: (theme) => {
                if (!color) return alpha(theme.palette.primary.main, 0.15);
                if (color.includes('.')) {
                  const [p, s] = color.split('.');
                  return alpha(theme.palette[p][s], 0.15);
                }
                return alpha(color, 0.15);
              },
              boxShadow: "none"
            }}
          >
            {icon}
          </Avatar>

          {/* ✅ FIXED: Transferred layout parameters directly into safe sx styling wrappers */}
          <Stack spacing={0.25} sx={{ minWidth: 0, flex: 1, flexDirection: "column" }}>
            <Typography variant="subtitle2" fontWeight={800} sx={{ color: "text.primary", letterSpacing: "-0.01em" }}>
              {title}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 500, display: "block" }}>
              {description}
            </Typography>
          </Stack>
        </Stack>

        {/* ================= CAPSULE CTA TRIGGER BUTTON ================= */}
        <Button
          fullWidth
          variant="contained"
          disableElevation
          disabled={isButtonDisabled}
          endIcon={loading ? <CircularProgress size={16} sx={{ color: "primary.contrastText" }} /> : <ArrowForwardRoundedIcon sx={{ fontSize: 16 }} />}
          onClick={onClick}
          sx={{
            mt: 3,
            py: 1.1,
            borderRadius: "24px", 
            textTransform: "none",
            fontWeight: 700,
            fontSize: "0.875rem",
            bgcolor: color || "primary.main",
            color: (theme) => {
              if (!color) return "primary.contrastText";
              const p = color.split('.')[0];
              return `${p}.contrastText`;
            },
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              bgcolor: color || "primary.main",
              opacity: 0.9,
              transform: "translateY(-1px)",
            },
            "&.Mui-disabled": {
              bgcolor: (theme) => loading 
                ? (color || "primary.main") 
                : alpha(theme.palette.text.primary, 0.08), 
              color: "text.disabled",
              opacity: loading ? 0.7 : 0.5,
            },
          }}
        >
          {loading ? "Running AI..." : "Run AI"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AIActionCard;
