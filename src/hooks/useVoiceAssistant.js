// src/hooks/useVoiceAssistant.js
import { useCallback } from "react";

import { useVoice } from "../context/VoiceContext";
import { useAI } from "../context/AIContext";

import {
  startVoiceConversation,
  stopVoiceConversation,
} from "../services/voiceAIController";

const DEFAULT_PROMPT_BUILDER = (transcript) => transcript;

export const useVoiceAssistant = ({
  promptBuilder = DEFAULT_PROMPT_BUILDER,
} = {}) => {
  
  // ✅ THE CRITICAL DEFENSIVE BARRIER SHIELD:
  // Extracts hook properties from useVoice safely by matching an empty fallback object.
  // This guarantees that if VoiceProvider is absent, your code defaults to clean variables
  // rather than crashing with an "Uncaught TypeError" on line 17.
  const voiceContext = useVoice() || {};
  const voiceState = voiceContext.voiceState || "idle";
  const setVoiceState = voiceContext.setVoiceState || (() => {});
  const transcript = voiceContext.transcript || "";
  const setTranscript = voiceContext.setTranscript || (() => {});

  // Safe object extraction mapping guard for your AI contextual layout triggers
  const aiContext = useAI() || {};
  const addUserMessage = aiContext.addUserMessage || (() => {});
  const addAIMessage = aiContext.addAIMessage || (() => {});

  const startConversation = useCallback(() => {
    // If background modules aren't available, alert quietly in console without breaking DOM
    if (!voiceContext.setVoiceState) {
      console.warn("Voice AI initialization skipped: VoiceProvider missing.");
      return;
    }

    startVoiceConversation({
      promptBuilder,

      onListening: () => {
        setVoiceState("listening");
      },

      onTranscript: (text) => {
        setTranscript(text);
        addUserMessage(text);
      },

      onThinking: () => {
        setVoiceState("thinking");
      },

      onAIResponse: (response) => {
        addAIMessage(response);
        setVoiceState("speaking");
      },

      onSpeaking: () => {
        setVoiceState("speaking");
      },

      onFinished: () => {
        setVoiceState("idle");
        setTranscript("");
      },

      onError: (error) => {
        console.error(error);
        addAIMessage("❌ Voice conversation failed.");
        setVoiceState("idle");
      },
    });
  }, [
    promptBuilder,
    addUserMessage,
    addAIMessage,
    setTranscript,
    setVoiceState,
    voiceContext.setVoiceState,
  ]);

  const stopConversation = useCallback(() => {
    if (!voiceContext.setVoiceState) return;
    
    stopVoiceConversation();
    setVoiceState("idle");
    setTranscript("");
  }, [
    setTranscript,
    setVoiceState,
    voiceContext.setVoiceState,
  ]);

  return {
    voiceState,
    transcript,
    isListening: voiceState === "listening",
    isThinking: voiceState === "thinking",
    isSpeaking: voiceState === "speaking",
    startConversation,
    stopConversation,
  };
};

export default useVoiceAssistant;
