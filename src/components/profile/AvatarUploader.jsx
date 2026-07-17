// src/components/profile/AvatarUploader.jsx
import { useRef, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  alpha, 
} from "@mui/material";

import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const AvatarUploader = () => {
  const { user, updateProfile } = useAuth();
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(user?.avatar || "");
  const [compressing, setCompressing] = useState(false);

  // Compute initials dynamically based on the current logged-in user profile
  const initials = user?.name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase() || "SGT";

  const handleSelectImage = () => {
    fileInputRef.current?.click();
  };

  // ✅ FREE-TIER STORAGE ENGINE: Compresses image down to lightweight text data on the fly
  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Reject massive image files right away to protect local device execution thread pipelines
    if (file.size > 8 * 1024 * 1024) {
      toast.error("File is too large. Please select an image under 8MB.");
      return;
    }

    setCompressing(true);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      img.onload = async () => {
        // Create an invisible canvas element layout context frame
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Target Proportions for clean avatar rendering scale configurations
        const TARGET_WIDTH = 150;
        const TARGET_HEIGHT = 150;

        canvas.width = TARGET_WIDTH;
        canvas.height = TARGET_HEIGHT;

        // Draw crop frame center-focused
        const minEdge = Math.min(img.width, img.height);
        const sx = (img.width - minEdge) / 2;
        const sy = (img.height - minEdge) / 2;

        ctx.drawImage(img, sx, sy, minEdge, minEdge, 0, 0, TARGET_WIDTH, TARGET_HEIGHT);

        // ✅ COMPRESSION SHIELD: Convert to small compressed base64 text string
        // This stores completely free inside your existing text-based Firestore document envelope!
        const compressedBase64Str = canvas.toDataURL("image/jpeg", 0.7);

        setPreview(compressedBase64Str);
        try {
          await updateProfile({ avatar: compressedBase64Str });
          toast.success("Avatar updated and saved for free! 🚀");
        } catch (err) {
          toast.error("Failed to sync avatar profile records.");
        } finally {
          setCompressing(false);
        }
      };
      img.src = e.target.result;
    };

    reader.onerror = () => {
      toast.error("Error reading file asset lanes.");
      setCompressing(false);
    };

    reader.readAsDataURL(file);
  };

  const handleRemove = async () => {
    setPreview("");
    try {
      await updateProfile({ avatar: "" });
      toast.success("Avatar removed.");
    } catch (err) {
      toast.error("Failed to clean avatar parameters.");
    }
  };

  return (
    <Box sx={{ textAlign: "center", bgcolor: "transparent" }}>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={
          <Tooltip title={compressing ? "Compressing..." : "Change Avatar"} arrow placement="top">
            <IconButton
              size="medium"
              disabled={compressing}
              onClick={handleSelectImage}
              sx={{
                bgcolor: "primary.main", 
                color: "primary.contrastText",
                p: 1,
                border: "2px solid",
                borderColor: "background.paper", 
                "&:hover": { bgcolor: "primary.dark" },
              }}
            >
              <CameraAltRoundedIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
        }
      >
        <Avatar
          src={preview}
          sx={{
            width: 140,
            height: 140,
            mx: "auto",
            fontSize: 40,
            fontWeight: 800,
            color: "primary.contrastText",
            background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
            border: "4px solid",
            borderColor: "background.paper", 
            boxShadow: (theme) => `0 10px 25px ${alpha(theme.palette.primary.main, 0.2)}`,
            opacity: compressing ? 0.6 : 1,
            transition: "opacity 0.2s ease"
          }}
        >
          {!preview && initials}
        </Avatar>
      </Badge>

      <input hidden ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} />

      {/* ✅ FIXED: Transferred layout parameter attributes into safe sx container properties */}
      <Stack 
        spacing={1} 
        sx={{ 
          flexDirection: "row", 
          justifyContent: "center", 
          mt: 2.5 
        }}
      >
        {preview && (
          <IconButton 
            onClick={handleRemove} 
            disabled={compressing}
            sx={{ 
              color: "error.main", 
              bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
              "&:hover": {
                bgcolor: (theme) => alpha(theme.palette.error.main, 0.15),
              }
            }}
          >
            <DeleteRoundedIcon />
          </IconButton>
        )}
      </Stack>

      <Typography 
        variant="caption" 
        sx={{ 
          color: "text.secondary", 
          mt: 2, 
          fontWeight: 700, 
          fontSize: "0.725rem", 
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          display: "block"
        }}
      >
        SUPPORTED FORMATS: JPG, PNG, WEBP (COMPRESSED ON-CLIENT)
      </Typography>
    </Box>
  );
};

export default AvatarUploader;
