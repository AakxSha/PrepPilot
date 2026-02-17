import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { saveCache, loadCache } from "../utils/cache.js";



dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function resourceAgent(topics) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are a senior software engineer and learning mentor.

Your task:
For EACH topic, recommend ONLY highly trusted, popular, and high-quality resources.

Follow these strict rules:

1. Prefer globally recognized platforms
2. Prefer official documentation
3. Prefer well-known YouTube educators
4. Avoid unknown blogs
5. Avoid low-quality content
6. Avoid outdated resources

For every topic, give:

- 2 to 3 YouTube playlists/channels
- 2 to 3 Documentation / reading resources
- 2 to 3 Practice platforms

Allowed platforms (prefer these):

YouTube:
freeCodeCamp, CodeWithHarry, Traversy Media, Chai aur Code, Kevin Powell, NeetCode

Docs:
MDN, W3Schools, Official Docs, GeeksForGeeks, Python Docs

Practice:
LeetCode, HackerRank, Codeforces, CodeChef, Frontend Mentor, Exercism

Output rules:

- Return ONLY valid JSON
- No markdown
- No explanation
- No extra text

Topics:
${JSON.stringify(topics)}

Return format:

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

    response = response.replace(/```json/g, "");
    response = response.replace(/```/g, "");

    const jsonData = JSON.parse(response);

    return jsonData;

  } catch (error) {
    console.error("Resource Agent Error:", error);
    throw error;
  }
}
