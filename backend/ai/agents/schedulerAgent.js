import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function schedulerAgent({
  totalDays,
  topics,
  level,
  dailyHours,
  resources
}) {
  try {

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are an expert career mentor and study planner.

You are given:

1. Topics
2. Trusted learning resources for each topic

Your task:
Create a detailed daily study plan using the provided resources.

Rules:

1. Assign topics logically
2. Use ONLY the given resources
3. Include revision days
4. Include practice days
5. Include mock days
6. Balance workload
7. Do not overload
8. Respect daily hours

User Info:

Total Days: ${totalDays}
Daily Hours: ${dailyHours}
Level: ${level}

Topics:
${JSON.stringify(topics)}

Resources:
${JSON.stringify(resources)}

For each day:
- Pick relevant topic
- Attach matching YouTube
- Attach matching docs
- Attach matching practice links

Return ONLY valid JSON.

No markdown.
No explanation.

Format:

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
      .replace(/\n/g, "")
      .trim();

    const data = JSON.parse(response);

    return data;

  } catch (error) {
    console.error("Scheduler Agent Error:", error);
    throw error;
  }
}
