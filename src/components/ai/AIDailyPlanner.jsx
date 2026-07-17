// src/components/ai/AIDailyPlanner.jsx
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Avatar,
  Divider,
  Box,
  alpha
} from "@mui/material";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

const AIDailyPlanner = ({ planner = [] }) => {
  const safePlan = Array.isArray(planner) ? planner : [];

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
      <CardContent sx={{ p: 3, flexGrow: 1, "&:last-child": { pb: 3 } }}>
        <Typography 
          variant="subtitle1" 
          fontWeight={800} 
          sx={{ color: "text.primary", mb: 3, letterSpacing: "-0.01em" }}
        >
          Today's AI Plan
        </Typography>

        {safePlan.length === 0 ? (
          <Typography sx={{ color: "text.secondary", fontWeight: 500, fontSize: "0.925rem" }}>
            Click <b>Daily Planner</b> to generate your schedule.
          </Typography>
        ) : (
          <Stack spacing={2}>
            {safePlan.map((item, index) => {
              const uniqueKey = item.id || `${item.time}-${index}`;

              return (
                <Box key={uniqueKey}>
                  {/* ✅ FIXED: Transferred layout parameters directly into safe sx styling wrappers */}
                  <Stack 
                    spacing={2} 
                    sx={{ 
                      flexDirection: "row",
                      alignItems: "center",
                      minWidth: 0 
                    }}
                  >
                    <Avatar 
                      sx={{ 
                        width: 38, 
                        height: 38, 
                        borderRadius: "10px",
                        bgcolor: (theme) => alpha(theme.palette.success.main, 0.08), 
                        color: "success.main",
                        border: "1px solid",
                        borderColor: (theme) => alpha(theme.palette.success.main, 0.15),
                        boxShadow: "none",
                        flexShrink: 0 
                      }}
                    >
                      <AccessTimeRoundedIcon sx={{ fontSize: 18 }} />
                    </Avatar>

                    {/* Content Area with Text Clipping Protection */}
                    {/* ✅ FIXED: Replaced standard style props with theme-safe components configs */}
                    <Stack spacing={0.25} sx={{ minWidth: 0, flex: 1, flexDirection: "column" }}>
                      <Typography variant="body2" fontWeight={800} sx={{ color: "text.primary" }} noWrap>
                        {item.time || "No Time Set"}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: "text.secondary", 
                          fontWeight: 500, 
                          textOverflow: "ellipsis", 
                          overflow: "hidden" 
                        }}
                        noWrap 
                        title={item.task}
                      >
                        {item.task || "Unnamed Task Item"}
                      </Typography>
                    </Stack>
                  </Stack>

                  {index !== safePlan.length - 1 && <Divider sx={{ mt: 2, borderColor: "divider" }} />}
                </Box>
              );
            })}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default AIDailyPlanner;
