// src/components/ai/AIChat.jsx
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

import { askGemini } from "../../services/gemini";
import { useAI } from "../../context/AIContext";
import { useVoiceAssistant } from "../../hooks/useVoiceAssistant";

import VoiceButton from "./VoiceButton";
import VoiceWave from "./VoiceWave";

import {
  Paper,
  Box,
  Typography,
  Stack,
  Avatar,
  TextField,
  IconButton,
  Divider,
  Fade,
  Chip,
  alpha,
} from "@mui/material";

import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

const AIChat = ({ externalLoading = false }) => {
  const { messages = [], addUserMessage, addAIMessage } = useAI();

  const {
    voiceState,
    transcript,
    isListening,
    isThinking,
    isSpeaking,
    startConversation,
    stopConversation,
  } = useVoiceAssistant();

  const [input, setInput] = useState("");
  const [internalLoading, setInternalLoading] = useState(false);
  
  const bottomRef = useRef(null);
  const isTyping = internalLoading || externalLoading;
  const lastSentTranscriptRef = useRef("");

  // 1. Auto-scroll mechanism
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, transcript, voiceState, isTyping]);

  // 2. Automated loop-safe voice transcript tracking transmission
  useEffect(() => {
    if (
      transcript &&
      transcript.trim() &&
      !isListening &&
      !isThinking &&
      !internalLoading
    ) {
      const cleanTranscript = transcript.trim();

      if (lastSentTranscriptRef.current === cleanTranscript) {
        return;
      }

      const sendVoiceMessage = async () => {
        try {
          lastSentTranscriptRef.current = cleanTranscript;
          addUserMessage(cleanTranscript);
          setInternalLoading(true);

          const reply = await askGemini(cleanTranscript);
          addAIMessage(reply);
        } catch (error) {
          console.error("Voice AI Error:", error);
          addAIMessage("❌ Unable to process voice message.");
          lastSentTranscriptRef.current = "";
        } finally {
          setInternalLoading(false);
        }
      };

      sendVoiceMessage();
    }

    if (isListening) {
      lastSentTranscriptRef.current = "";
    }
  }, [transcript, isListening, isThinking, internalLoading, addUserMessage, addAIMessage]);

  // 3. Unmount safe session tracking voice cleanup
  useEffect(() => {
    return () => {
      if (voiceState !== "idle" && voiceState) {
        stopConversation();
      }
    };
  }, [voiceState, stopConversation]);

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
      console.error("Gemini Connect Error:", error);
      addAIMessage("❌ Unable to contact Gemini AI.");
    } finally {
      setInternalLoading(false);
    }
  };

  const handleVoiceClick = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (voiceState === "idle" || !voiceState) {
      startConversation();
    } else {
      stopConversation();
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        height: 760,
        display: "flex",
        flexDirection: "column",
        borderRadius: "24px", 
        border: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
        bgcolor: "background.paper", 
        boxShadow: (theme) => theme.palette.mode === "dark" 
          ? "0 10px 30px rgba(0,0,0,0.3)" 
          : "0 10px 30px rgba(15, 23, 42, 0.01)",
      }}
    >
      {/* ================= HEADER SECTOR ================= */}
      <Box sx={{ px: 3, py: 2.5, bgcolor: "background.paper" }}>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <Typography variant="h5" fontWeight={800} sx={{ color: "text.primary", letterSpacing: "-0.025em" }}>
              AI Assistant
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500, mt: 0.5 }}>
              Ask anything about your tasks, productivity or schedule.
            </Typography>
          </Box>
        </Stack>

        <Fade in={isListening || isThinking || isSpeaking}>
          <Box sx={{ mt: 2.5 }}>
            <VoiceWave active={isListening || isThinking || isSpeaking} />
            <Stack spacing={1.5} sx={{ mt: 2, direction: "row", justifyContent: "center" }}>
              {isListening && <Chip size="small" color="error" label="🎤 Listening" sx={{ fontWeight: 700, borderRadius: "20px" }} />}
              {isThinking && <Chip size="small" color="warning" label="🧠 Thinking" sx={{ fontWeight: 700, borderRadius: "20px" }} />}
              {isSpeaking && <Chip size="small" color="success" label="🔊 Speaking" sx={{ fontWeight: 700, borderRadius: "20px" }} />}
            </Stack>

            {transcript && (
              <Typography variant="body2" sx={{ mt: 2, textAlign: "center", color: "text.secondary", fontStyle: "italic", fontWeight: 500 }}>
                "{transcript}"
              </Typography>
            )}
          </Box>
        </Fade>
      </Box>

      <Divider sx={{ borderColor: "divider" }} />

      {/* ================= MESSAGESINNER CANVAS ================= */}
      <Box sx={{ flex: 1, overflowY: "auto", bgcolor: "background.default", px: 3, py: 3 }}>
        <Stack spacing={3}>
          {messages.map((msg, index) => {
            const isUser = msg.sender === "user";

            return (
              <Stack
                key={index}
                direction="row"
                spacing={2}
                sx={{ justifyContent: isUser ? "flex-end" : "flex-start" }}
              >
                {!isUser && (
                  <Avatar sx={{ background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`, color: "primary.contrastText", width: 38, height: 38 }}>
                    <SmartToyRoundedIcon sx={{ fontSize: 20 }} />
                  </Avatar>
                )}

                <Paper
                  elevation={0}
                  sx={{
                    maxWidth: "82%",
                    px: 2.5,
                    py: 1.75,
                    borderRadius: "16px",
                    bgcolor: isUser ? "primary.main" : "background.paper",
                    color: isUser ? "primary.contrastText" : "text.primary",
                    border: "1px solid",
                    borderColor: isUser ? "transparent" : "divider",
                    boxShadow: (theme) => theme.palette.mode === "dark" ? "0 4px 12px rgba(0,0,0,0.3)" : "0 4px 12px rgba(15, 23, 42, 0.02)",
                    "& p": { margin: 0, lineHeight: 1.65, fontSize: "0.925rem", fontWeight: 500 },
                    "& ul, & ol": { pl: 3, mt: 1 },
                    "& h1, & h2, & h3": { mt: 2, mb: 1, color: "text.primary", fontWeight: 700 },
                    "& code": { 
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06), 
                      color: "primary.main",
                      px: 0.6, 
                      py: 0.2, 
                      borderRadius: "4px",
                      fontWeight: 700
                    },
                  }}
                >
                  {isUser ? (
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {msg.text}
                    </Typography>
                  ) : (
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  )}
                </Paper>
              </Stack>
            );
          })}
          <div ref={bottomRef} />
        </Stack>
      </Box>

      <Divider sx={{ borderColor: "divider" }} />

      {/* ================= INPUT FOOTER PANEL ================= */}
      <Box sx={{ p: 2, bgcolor: "background.paper" }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <VoiceButton state={voiceState} onClick={handleVoiceClick} />
          <TextField
            fullWidth
            placeholder={isTyping ? "AI is thinking..." : "Type your question here..."}
            value={input}
            disabled={isTyping}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            slotProps={{
              input: {
                endAdornment: (
                  <IconButton 
                    onClick={sendMessage} 
                    disabled={!input.trim() || isTyping}
                    color="primary"
                  >
                    <SendRoundedIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                ),
              }
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
                bgcolor: "background.default"
              }
            }}
          />
        </Stack>
      </Box>
    </Paper>
  );
};

export default AIChat;
