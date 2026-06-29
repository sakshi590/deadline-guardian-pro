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
    console.error("Gemini Error:", error);

    return `Error: ${error.message}`;
  }
};