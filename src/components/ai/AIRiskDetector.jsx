// src/components/ai/AIRiskDetector.jsx
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Divider,
  Box,
  alpha,
} from "@mui/material";

import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";

// Map raw string labels to system semantic theme palette keys
const getColorKey = (risk) => {
  switch (risk?.toLowerCase()) {
    case "high": return "error";
    case "medium": return "warning";
    default: return "success";
  }
};

const getIcon = (risk, colorKey) => {
  const iconStyles = { fontSize: 16, color: `${colorKey}.main` };
  switch (risk?.toLowerCase()) {
    case "high": return <ErrorOutlineRoundedIcon sx={iconStyles} />;
    case "medium": return <WarningAmberRoundedIcon sx={iconStyles} />;
    default: return <CheckCircleRoundedIcon sx={iconStyles} />;
  }
};

const AIRiskDetector = ({ risks = [] }) => {
  const safeRisks = Array.isArray(risks) ? risks : [];

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "24px", 
        border: "1px solid",
        borderColor: "divider", 
        bgcolor: "background.paper", 
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: (theme) => theme.palette.mode === "dark" 
          ? "0 10px 30px rgba(0,0,0,0.3)" 
          : "0 10px 30px rgba(15, 23, 42, 0.01)"
      }}
    >
      <CardContent sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column", "&:last-child": { pb: 3 } }}>
        <Typography 
          variant="subtitle1" 
          fontWeight={800} 
          sx={{ color: "text.primary", mb: 3, letterSpacing: "-0.01em" }}
        >
          AI Risk Detector
        </Typography>

        {safeRisks.length === 0 ? (
          <Typography sx={{ color: "text.secondary", fontWeight: 500, fontSize: "0.925rem", flexGrow: 1 }}>
            Click <b>Risk Detector</b> to identify timeline threats and overdue tasks.
          </Typography>
        ) : (
          /* ✅ FIXED: Transferred layout parameter attributes into safe sx container properties */
          <Stack spacing={2} sx={{ flexGrow: 1, flexDirection: "column" }}>
            {safeRisks.map((task, index) => {
              const taskKey = task.id || `${task.title}-${index}`;
              const detectedRisk = task.risk || task.riskLevel || "Low";
              const semanticColor = getColorKey(detectedRisk);

              return (
                <Box key={taskKey}>
                  {/* ✅ FIXED: Transferred layout parameter attributes into safe sx container properties */}
                  <Stack 
                    spacing={2} 
                    sx={{ 
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    {/* Content Area with Text Clipping Protection */}
                    <Box sx={{ minWidth: 0, flex: 1, overflow: "hidden" }}>
                      <Typography 
                        variant="body2"
                        fontWeight={800} 
                        sx={{ color: "text.primary" }}
                        noWrap 
                        title={task.title}
                      >
                        {task.title || "Unnamed Task Threat"}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600, display: "block", mt: 0.5 }}>
                        Due: {task.dueDate || "No Date Set"}
                      </Typography>
                    </Box>

                    <Chip
                      icon={getIcon(detectedRisk, semanticColor)}
                      label={detectedRisk}
                      size="small"
                      variant="outlined"
                      sx={{ 
                        fontWeight: 700, 
                        borderRadius: "8px",
                        fontSize: "0.7rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.02em",
                        bgcolor: (theme) => alpha(theme.palette[semanticColor].main, 0.08),
                        color: `${semanticColor}.main`,
                        borderColor: (theme) => alpha(theme.palette[semanticColor].main, 0.2),
                        borderWidth: "1px !important",
                        flexShrink: 0, 
                        px: 0.5,
                        "& .MuiChip-label": { px: 1 }
                      }}
                    />
                  </Stack>
                  {index !== safeRisks.length - 1 && <Divider sx={{ mt: 2, borderColor: "divider" }} />}
                </Box>
              );
            })}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default AIRiskDetector;
