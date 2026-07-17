// src/context/AIContext.jsx
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { useAuth } from "./AuthContext"; // ✅ ADDED: Ownership Verification Tracker

const AIContext = createContext();

export const useAI = () => useContext(AIContext);

export const AIProvider = ({ children }) => {
  const { user } = useAuth(); // Monitor active authenticated user session token maps

  const initialAIMessage = useMemo(() => ({
    sender: "ai",
    text: "👋 Hello! I'm Deadline Guardian AI.\n\nI can analyze your tasks, generate schedules, detect deadline risks and answer productivity questions.",
  }), []);

  const [messages, setMessages] = useState([initialAIMessage]);

  // ✅ CRITICAL PRIVACY LOCK: Automatically flushes old conversations out of memory 
  // the exact millisecond a user logs out or switches accounts to prevent data leaks.
  useEffect(() => {
    if (!user) {
      setMessages([initialAIMessage]);
    }
  }, [user, initialAIMessage]);

  const addUserMessage = useCallback((text) => {
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text,
      },
    ]);
  }, []);

  const addAIMessage = useCallback((text) => {
    setMessages((prev) => [
      ...prev,
      {
        sender: "ai",
        text,
      },
    ]);
  }, []);

  const clearChat = useCallback(() => {
    setMessages([
      {
        sender: "ai",
        text: "👋 Chat cleared.\n\nHow can I help you today?",
      },
    ]);
  }, []);

  // ✅ MEMOIZATION ENGINE: Caches object keys to keep chat components from lagging during heavy real-time responses
  const contextValue = useMemo(() => ({
    messages,
    addUserMessage,
    addAIMessage,
    clearChat,
  }), [messages, addUserMessage, addAIMessage, clearChat]);

  return (
    <AIContext.Provider value={contextValue}>
      {children}
    </AIContext.Provider>
  );
};
