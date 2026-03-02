import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function plannerAgent(userInput) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are an expert AI study planner.

Convert the following user request into a structured learning plan.

Rules:
- Output ONLY valid JSON
- No explanations
- No markdown
- No extra text

User request:
${JSON.stringify(userInput)}

Return format:

{
  "goal": "",
  "level": "",
  "duration_days": 0,
  "daily_hours": 0,
  "topics": [],
  "revision_days": 0,
  "practice_ratio": 0.0
}
`;

    const result = await model.generateContent(prompt);

    let response = result.response.text();

    // Clean Gemini formatting
    response = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(response);

    return parsed;   

  } catch (err) {
    console.error("Planner Agent Error:", err);
    return {
      goal: userInput.goal,
      level: userInput.level,
      duration_days: userInput.totalDays,
      daily_hours: userInput.dailyHours,
      topics: userInput.subjects || [],
      revision_days: 0,
      practice_ratio: 0.5
    };
  }
}