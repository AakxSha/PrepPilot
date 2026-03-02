// ============================================
// masterAgent.js
// Clean Stable Version (Gemini Pipeline)
// ============================================

import { plannerAgent } from "./agents/plannerAgent.js";
import { resourceAgent } from "./agents/resourceAgent.js";
import { schedulerAgent } from "./agents/schedulerAgent.js";

export async function generateRoadmap(userInput) {
  try {
    console.log("Starting Roadmap Generation...");

    // ============================================
    // STEP 1: PLANNER
    // ============================================

    const plan = await plannerAgent(userInput);

    let topics = plan?.topics || userInput.subjects || [];

    // Trim topic names to avoid matching bugs
    topics = topics.map(t => t.trim());

    if (!topics.length) {
      console.log("No topics generated.");
      return {
        error: "No topics available",
        userInput,
        topics: [],
        resources: [],
        schedule: []
      };
    }

    console.log("Topics Generated:", topics);

    // ============================================
    // STEP 2: RESOURCES
    // ============================================

    const resourcesData = await resourceAgent(topics);

    const resources = resourcesData?.resources || [];

    console.log("Resources Count:", resources.length);

    // ============================================
    // STEP 3: SCHEDULER
    // ============================================

    const scheduleData = await schedulerAgent({
      totalDays: userInput.totalDays,
      dailyHours: userInput.dailyHours,
      level: userInput.level,
      topics,
      resources,
      learningStyle: userInput.learningStyle || "Balanced",
      includeMocks: userInput.includeMocks || false
    });

    const schedule = scheduleData?.schedule || [];

    console.log("Schedule Length:", schedule.length);

    // ============================================
    // FINAL OUTPUT
    // ============================================

    return {
      userInput,
      topics,
      resources,
      schedule
    };

  } catch (error) {
    console.error("Master Agent Error:", error);

    return {
      error: "Roadmap generation failed",
      userInput,
      topics: [],
      resources: [],
      schedule: []
    };
  }
}