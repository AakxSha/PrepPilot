import { schedulerAgent } from "./schedulerAgent.js";
import { resourceAgent } from "./resourceAgent.js";

async function test() {

  const topics = [
    "Arrays",
    "Strings",
    "Linked List",
    "Recursion",
    "Trees",
    "Graphs",
    "Dynamic Programming"
  ];

  // Step 1: Get resources
  const resourceData = await resourceAgent(topics);

  console.log("Resources Loaded ✅");

  // Step 2: Create schedule using resources
  const schedule = await schedulerAgent({
    totalDays: 21,
    dailyHours: 3,
    level: "Internship",
    topics,
    resources: resourceData.resources
  });

  console.dir(schedule, { depth: null });
}

test();
