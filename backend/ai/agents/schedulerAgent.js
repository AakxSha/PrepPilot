// ============================================
// schedulerAgent.js
// Gemini Version (Stable & Production Ready)
// ============================================

import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/* ============================================
   SMART FALLBACK (FORCES EXACT totalDays)
=============================================== */

function generateFallbackSchedule(totalDays, topics, dailyHours, resources) {
  const schedule = [];

  const cleanedTopics = topics.map(t => t.trim());

  for (let i = 0; i < totalDays; i++) {
    const topic = cleanedTopics[i % cleanedTopics.length];

    const topicResources =
      resources.find(
        r => r.topic?.trim().toLowerCase() === topic.toLowerCase()
      ) || {};

    schedule.push({
      day: i + 1,
      focus: `Deep dive into ${topic}`,
      topic,
      youtube: topicResources.youtube?.[0] || "YouTube resource not available",
      docs: topicResources.docs?.[0] || "Documentation not available",
      practice:
        topicResources.practice?.[0] || "Practice platform not available",
      activities: [
        `Study ${topic} concepts`,
        `Practice problems on ${topic}`,
        "Revise key concepts"
      ],
      estimatedHours: `${dailyHours} hours`
    });
  }

  return { schedule };
}

/* ============================================
   MAIN SCHEDULER FUNCTION
=============================================== */

export async function schedulerAgent({
  totalDays,
  topics,
  level,
  dailyHours,
  resources,
  learningStyle = "Balanced",
  includeMocks = false
}) {
  try {
    if (!topics || topics.length === 0) {
      return { schedule: [] };
    }

    const cleanedTopics = topics.map(t => t.trim());

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are an expert AI study planner.

Generate STRICTLY valid JSON.
No markdown.
No explanation.
Generate EXACTLY ${totalDays} schedule entries.
If topics are fewer than ${totalDays}, repeat them cyclically.

User Preferences:
- Total Days: ${totalDays}
- Daily Hours: ${dailyHours}
- Level: ${level}
- Learning Style: ${learningStyle}
- Include Mock Interviews: ${includeMocks}

Topics:
${JSON.stringify(cleanedTopics)}

Resources:
${JSON.stringify(resources)}

Return format:

{
  "schedule": [
    {
      "day": 1,
      "focus": "",
      "topic": "",
      "youtube": "",
      "docs": "",
      "practice": "",
      "activities": [],
      "estimatedHours": ""
    }
  ]
}
`;

    const result = await model.generateContent(prompt);

    let response = result.response.text();

    response = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    try {
      const parsed = JSON.parse(response);

      if (!parsed.schedule || parsed.schedule.length !== totalDays) {
        console.log("Schedule length mismatch. Using fallback.");
        return generateFallbackSchedule(
          totalDays,
          cleanedTopics,
          dailyHours,
          resources
        );
      }

      return parsed;

    } catch (error) {
      console.log("Invalid JSON from Gemini. Using fallback.");
      return generateFallbackSchedule(
        totalDays,
        cleanedTopics,
        dailyHours,
        resources
      );
    }

  } catch (error) {
    console.error("Scheduler Agent Error:", error);
    return generateFallbackSchedule(
      totalDays,
      topics,
      dailyHours,
      resources
    );
  }
}