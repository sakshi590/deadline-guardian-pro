// src/components/ai/AIChat.jsx

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

import { askGemini } from "../../services/gemini";
import { useAI } from "../../context/AIContext";

import {
  Paper,
  Box,
  Typography,
  Stack,
  Avatar,
  TextField,
  IconButton,
  Divider,
  CircularProgress,
} from "@mui/material";

import SendRoundedIcon from "@mui/icons-material/SendRounded";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

const AIChat = ({ externalLoading = false }) => {
  const {
    messages,
    addUserMessage,
    addAIMessage,
  } = useAI();

  const [input, setInput] = useState("");
  const [internalLoading, setInternalLoading] = useState(false);

  const bottomRef = useRef(null);

  const isTyping = internalLoading || externalLoading;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const question = input.trim();
    addUserMessage(question);
    setInput("");
    setInternalLoading(true);

    try {
      const reply = await askGemini(question);
      addAIMessage(reply);
    } catch (error) {
      console.error(error);
      addAIMessage("❌ Failed to contact Gemini AI.");
    } finally {
      setInternalLoading(false);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        flex: 1,
        width: "100%",
        height: "100%",
        minHeight: 650,
        display: "flex",
        flexDirection: "column",
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
        bgcolor: "#fff",
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          p: 3,
          flexShrink: 0,
        }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
        >
          AI Chat
        </Typography>

        <Typography
          color="text.secondary"
        >
          Ask anything about your tasks, productivity or deadlines.
        </Typography>
      </Box>

      <Divider />

      {/* CHAT CONTAINER */}
      <Box
        sx={{
          flexGrow: 1,
          minHeight: 0,
          overflowY: "auto",
          bgcolor: "#fafafa",
          p: 3,
          minWidth: 0, // CRITICAL: Reset flexbox auto-min-width expansion rules
        }}
      >
        <Stack spacing={3} sx={{ minWidth: 0, width: "100%" }}>
          {messages.map((msg, index) => (
            <Stack
              key={index}
              direction="row"
              spacing={2}
              justifyContent={msg.sender === "user" ? "flex-end" : "flex-start"}
              sx={{ width: "100%", minWidth: 0 }}
            >
              {msg.sender === "ai" && (
                <Avatar
                  sx={{
                    bgcolor: "#4F46E5",
                    flexShrink: 0,
                  }}
                >
                  <SmartToyRoundedIcon />
                </Avatar>
              )}

              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  maxWidth: "80%",
                  minWidth: 0, // Hard protection for nested inline markdown wrappers
                  bgcolor: msg.sender === "user" ? "#4F46E5" : "#fff",
                  color: msg.sender === "user" ? "#fff" : "#111827",
                  border: msg.sender === "ai" ? "1px solid #e5e7eb" : "none",
                  overflowWrap: "anywhere",
                  wordBreak: "break-word",

                  "& p": {
                    margin: 0,
                    lineHeight: 1.7,
                  },

                  "& ul, & ol": {
                    paddingLeft: 2,
                  },

                  "& h1, & h2, & h3, & h4": {
                    marginTop: 1,
                    marginBottom: 1,
                    fontWeight: 700,
                  },
                }}
              >
                {msg.sender === "user" ? (
                  <Typography>{msg.text}</Typography>
                ) : (
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                )}
              </Paper>

              {msg.sender === "user" && (
                <Avatar
                  sx={{
                    bgcolor: "#10B981",
                    flexShrink: 0,
                  }}
                >
                  <PersonRoundedIcon />
                </Avatar>
              )}
            </Stack>
          ))}

          {isTyping && (
            <Stack direction="row" spacing={2} sx={{ width: "100%", minWidth: 0 }}>
              <Avatar sx={{ bgcolor: "#4F46E5", flexShrink: 0 }}>
                <SmartToyRoundedIcon />
              </Avatar>

              <Paper
                sx={{
                  p: 2,
                  borderRadius: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <CircularProgress size={18} />
                <Typography variant="body2">AI is thinking...</Typography>
              </Paper>
            </Stack>
          )}

          {/* Corrected position: anchor node sits inside your chat layout block safely */}
          <div ref={bottomRef} />
        </Stack>
      </Box>

      <Divider />

      {/* INPUT */}
      <Box
        sx={{
          p: 2,
          bgcolor: "#fff",
          flexShrink: 0,
        }}
      >
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
        >
          <TextField
            fullWidth
            size="small"
            placeholder={
              isTyping
                ? "AI is thinking..."
                : "Ask Deadline Guardian AI..."
            }
            value={input}
            disabled={isTyping}
            onChange={(e) => setInput(e.target.value)}
            onGridKeyDown
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                bgcolor: "#fafafa",
              },
            }}
          />

          <IconButton
            color="primary"
            onClick={sendMessage}
            disabled={isTyping || !input.trim()}
            sx={{
              width: 50,
              height: 50,
              bgcolor: "#4F46E5",
              color: "#fff",
              flexShrink: 0,

              "&:hover": {
                bgcolor: "#4338CA",
              },

              "&.Mui-disabled": {
                bgcolor: "#E5E7EB",
                color: "#9CA3AF",
              },
            }}
          >
            <SendRoundedIcon />
          </IconButton>
        </Stack>
      </Box>
    </Paper>
  );
};

export default AIChat;
