import { plannerAgent } from "./agents/plannerAgent.js";
import { resourceAgent } from "./agents/resourceAgent.js";
import { schedulerAgent } from "./agents/schedulerAgent.js";

export async function generateRoadmap(userInput) {

  try {

    console.log("🚀 Starting Roadmap Generation...");

    // Step 1: Planning
    const plan = await plannerAgent(userInput);

    console.log("✅ Planner Done");

    const topics = plan.topics;

    // Step 2: Resources
    const resources = await resourceAgent(topics);

    console.log("✅ Resources Loaded");

    // Step 3: Schedule
    const schedule = await schedulerAgent({
      totalDays: userInput.totalDays,
      dailyHours: userInput.dailyHours,
      level: userInput.level,
      topics,
      resources: resources.resources
    });

    console.log("✅ Schedule Created");

    // Final Output
    return {
      userInput,
      topics,
      resources: resources.resources,
      schedule: schedule.schedule
    };

  } catch (error) {
    console.error("❌ Master Agent Error:", error);
    throw error;
  }
}
