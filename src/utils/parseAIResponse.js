// src/utils/parseAIResponse.js

export const parseAIResponse = (response) => {
  if (!response || typeof response !== "string") {
    return createFallbackData();
  }

  try {
    // 1. ADVANCED: Extract JSON string content block using bracket locator regex loops
    const jsonRegex = /\{[\s\S]*\}/;
    const match = response.match(jsonRegex);
    
    if (!match) {
      throw new Error("No JSON format object blocks found inside the text response.");
    }

    const parsedData = JSON.parse(match[0].trim());

    // 2. PROPERTY ALIASING: Maps alternative layout schema naming configurations automatically
    const rawRecommendations = parsedData?.recommendations || parsedData?.suggestions || parsedData?.insights || [];
    const recommendationsArray = Array.isArray(rawRecommendations) ? rawRecommendations : [];

    const rawPlanner = parsedData?.planner || parsedData?.schedule || parsedData?.plan || [];
    const plannerArray = Array.isArray(rawPlanner) ? rawPlanner : [];

    const rawRisks = parsedData?.risks || parsedData?.riskAlerts || parsedData?.threats || [];
    const risksArray = Array.isArray(rawRisks) ? rawRisks : [];

    const rawPriorities = parsedData?.highestPriority || parsedData?.priorities || parsedData?.tasks || [];
    const prioritiesArray = Array.isArray(rawPriorities) ? rawPriorities : [];

    // 3. STABILITY: Guarantee data structure uniformity across dashboard card loops
    return {
      summary: {
        productivityScore: parsedData?.summary?.productivityScore || parsedData?.summary?.score || "--",
        updatedTasks: parsedData?.summary?.updatedTasks || parsedData?.summary?.totalTasks || "--",
        riskyTasks: parsedData?.summary?.riskyTasks || parsedData?.summary?.totalRisks || "--",
        workload: parsedData?.summary?.workload || parsedData?.summary?.estimatedHours || "--",
        summary: parsedData?.summary?.summary || parsedData?.summary?.text || "",
        summaryText: parsedData?.summary?.summaryText || parsedData?.summary?.summary || parsedData?.summary?.text || "" // ✅ Maps state hooks in AIAssistant
      },
      highestPriority: prioritiesArray,
      risks: risksArray,
      planner: plannerArray,
      recommendations: recommendationsArray, // ✅ FIXED: Bound securely to structural aliases to eliminate empty card states
      chat: parsedData?.chat || parsedData?.message || "✅ Dashboard data analysis completed successfully.",
      coach: parsedData?.coach && typeof parsedData.coach === "object" ? parsedData.coach : {
        score: "--",
        strengths: [],
        suggestions: [],
        motivation: "Analysis payload template mismatch tracked."
      }
    };

  } catch (error) {
    console.error("AI Parser Engine Exception Logged:", error);
    return createFallbackData();
  }
};

// Isolated schema generation mapping block
const createFallbackData = () => {
  return {
    summary: {
      productivityScore: "--",
      updatedTasks: "--",
      riskyTasks: "--",
      workload: "--",
      summary: "Aggregation engine structural failure handled safely.",
      summaryText: "Aggregation engine structural failure handled safely."
    },
    highestPriority: [],
    risks: [],
    planner: [],
    recommendations: [],
    chat: "❌ The AI response formatting could not be read. Please try again.",
    coach: {
      score: "--",
      strengths: [],
      suggestions: [],
      motivation: "Unable to analyze tasks habits due to data corruption. Please attempt re-analysis."
    }
  };
};
