// src/services/voiceAIController.js

import {
  startListening,
  stopListening,
} from "./speechRecognition";

import {
  speak,
  stopSpeaking,
} from "./textToSpeech";

import { askGemini } from "./gemini";

// Track processing states globally across rapid native callback updates
let isProcessingAIRequest = false;

/**
 * Starts one complete voice conversation:
 * User speaks -> Gemini -> AI speaks
 */
export const startVoiceConversation = async ({
  promptBuilder = (text) => text,
  onListening,
  onThinking,
  onSpeaking,
  onFinished,
  onTranscript,
  onAIResponse,
  onError,
}) => {
  try {
    isProcessingAIRequest = false;
    onListening?.();

    startListening(
      async (transcript) => {
        // Guard against processing empty or duplicate partial real-time segments
        if (!transcript || !transcript.trim() || isProcessingAIRequest) return;

        try {
          onTranscript?.(transcript);

          // ✅ FIXED: Hard lock flag. Prevents subsequent interim text callbacks 
          // from spawning duplicate concurrent API request pipelines.
          isProcessingAIRequest = true;
          stopListening(); // Pause capturing further audio while processing

          onThinking?.();

          const prompt = promptBuilder(transcript);
          const response = await askGemini(prompt);

          onAIResponse?.(response);
          onSpeaking?.();

          // ✅ FIXED: Eliminated the guesswork estimated duration timeout.
          // Passed native callback triggers directly into the speak() options configuration 
          // to perfectly coordinate the exact millisecond the audio stream starts and ends.
          speak(response, {
            rate: 1,
            pitch: 1,
            onStart: () => {
              onSpeaking?.();
            },
            onEnd: () => {
              isProcessingAIRequest = false;
              onFinished?.();
            },
            onError: (err) => {
              console.error("Text to speech runtime error:", err);
              isProcessingAIRequest = false;
              onError?.(err);
            }
          });

        } catch (error) {
          console.error("Voice AI execution channel breakdown:", error);
          isProcessingAIRequest = false;
          onError?.(error);
        }
      },

      // Handle natural end of speech input capturing safely
      () => {
        console.log("Microphone input layer successfully captured.");
      },

      (error) => {
        console.error("Microphone capture lane error:", error);
        isProcessingAIRequest = false;
        onError?.(error);
      }
    );

  } catch (error) {
    console.error("Voice conversation initialization failure:", error);
    isProcessingAIRequest = false;
    onError?.(error);
  }
};

export const stopVoiceConversation = () => {
  isProcessingAIRequest = false;
  stopListening();
  stopSpeaking();
};
