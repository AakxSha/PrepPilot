import { generateRoadmap } from "./masterAgent.js";

async function test() {

  const userInput = {
    goal: "Internship Preparation",
    level: "Beginner",
    totalDays: 45,
    dailyHours: 3,
    subjects: ["DSA", "Web Development", "System Design"],
    focusAreas: ["Graphs", "Dynamic Programming", "React"]
  };

  const roadmap = await generateRoadmap(userInput);

  console.dir(roadmap, { depth: null });
}

test();
