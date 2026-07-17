// src/context/VoiceContext.jsx

import {
  createContext,
  useContext,
  useState,
  useMemo,
} from "react";

const VoiceContext = createContext();

export const useVoice = () => useContext(VoiceContext);

export const VoiceProvider = ({ children }) => {
  const [voiceState, setVoiceState] = useState("idle"); 
  // Possible states: "idle", "listening", "thinking", "speaking"

  const [transcript, setTranscript] = useState("");

  // ============================
  // MEMOIZED CONTEXT VALUE
  // ============================
  const contextValue = useMemo(() => ({
    voiceState,
    setVoiceState,
    transcript,
    setTranscript,
  }), [voiceState, transcript]); // Only reconstructs when state or transcript values change

  return (
    <VoiceContext.Provider value={contextValue}>
      {children}
    </VoiceContext.Provider>
  );
};
