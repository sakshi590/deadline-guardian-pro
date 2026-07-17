// src/components/task/SearchBar.jsx
import { TextField, InputAdornment, alpha } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const SearchBar = ({ value, onChange }) => {
  return (
    <TextField
      fullWidth
      placeholder="Search tasks by title, category or descriptions..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchRoundedIcon sx={{ color: "text.secondary", fontSize: 20 }} />
          </InputAdornment>
        ),
      }}
      sx={{
        mb: 1,
        "& .MuiOutlinedInput-root": {
          color: "text.primary", // ✅ UPDATED: Stark high contrast text input colors
          borderRadius: "24px", // ✅ UPDATED: Smooth capsule curve family look
          bgcolor: "background.paper", // Responsive core base fill context
          transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          "& fieldset": {
            borderColor: "divider", // Theme adaptive separation frame line
            borderWidth: "1px",
          },
          "&:hover fieldset": {
            borderColor: (theme) => alpha(theme.palette.text.primary, 0.2),
          },
          "&.Mui-focused fieldset": {
            borderColor: "primary.main", // Active focal tracking violet highlight
            borderWidth: "2px",
          },
          "&.Mui-focused": {
            boxShadow: (theme) => `0 0 0 4px ${alpha(theme.palette.primary.main, 0.08)}`,
          },
          // ✅ FIXED: Changed from naked 'input' to '& input' to ensure the input field padding compiles correctly
          "& input": {
            py: 1.6, // Extended text padding to match premium SaaS proportions
            px: 1,
            fontSize: "0.925rem",
            fontWeight: 500,
            "&::placeholder": {
              color: "text.secondary",
              opacity: 0.8,
            },
          },
        },
      }}
    />
  );
};

export default SearchBar;
