import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function resourceAgent(topics) {
  try {
    if (!topics || topics.length === 0) {
      return { resources: [] };
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are a senior software engineer and learning mentor.

For EACH topic, recommend only highly trusted resources.

Return ONLY valid JSON.
No markdown.
No explanation.

Topics:
${JSON.stringify(topics)}

Format:
{
  "resources": [
    {
      "topic": "",
      "youtube": ["", "", ""],
      "docs": ["", "", ""],
      "practice": ["", "", ""]
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

    const parsed = JSON.parse(response);

    return parsed;

  } catch (error) {
    console.error("Resource Agent Error:", error);
    return { resources: [] };
  }
}