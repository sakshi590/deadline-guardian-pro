// src/services/gemini.js

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export const askGemini = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    console.log("Gemini Response:", response);
    return response.text;
  } catch (error) {
    console.error("Gemini Error Handler Intercepted:", error);

    // ✅ FIXED: Safely identify Quota Rate limits to show a clean message to users
    const errorMessage = error?.message || String(error);
    
    if (errorMessage.includes("429") || errorMessage.includes("quota") || errorMessage.includes("RESOURCE_EXHAUSTED")) {
      return "⚠️ **Gemini Free Tier Limit Reached:** You've hit the limit of 20 free requests for today. Your quota will reset shortly, or you can supply a new API key to continue testing right now.";
    }

    // Standard fallback phrase for structural failures
    return "❌ **Connection Error:** Unable to reach Gemini AI right now. Please check your internet connection and try again.";
  }
};
