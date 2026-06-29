// src/context/AIContext.jsx

import { createContext, useContext, useState } from "react";

const AIContext = createContext();

export const useAI = () => useContext(AIContext);

export const AIProvider = ({ children }) => {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text:
        "👋 Hello! I'm Deadline Guardian AI.\n\nI can analyze your tasks, generate schedules, detect deadline risks and answer productivity questions.",
    },
  ]);

  const addUserMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text,
      },
    ]);
  };

  const addAIMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      {
        sender: "ai",
        text,
      },
    ]);
  };

  const clearChat = () => {
    setMessages([
      {
        sender: "ai",
        text:
          "👋 Chat cleared.\n\nHow can I help you today?",
      },
    ]);
  };

  return (
    <AIContext.Provider
      value={{
        messages,
        addUserMessage,
        addAIMessage,
        clearChat,
      }}
    >
      {children}
    </AIContext.Provider>
  );
};