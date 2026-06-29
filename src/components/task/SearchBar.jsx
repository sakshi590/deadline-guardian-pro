// src/components/task/SearchBar.jsx

import { TextField, InputAdornment } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const SearchBar = ({ value, onChange }) => {
  return (
    <TextField
      fullWidth
      placeholder="Search tasks..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{ mb: 3 }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchRoundedIcon color="action" />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;