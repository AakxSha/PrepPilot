import { plannerAgent } from "./plannerAgent.js";

async function test() {
  const userInput =
    "I want to learn full stack web development in 4 months. I am a beginner and can study 2 hours daily.";

  const plan = await plannerAgent(userInput);

  console.log("\nPLANNER OUTPUT:\n");
  console.log(plan);
}

test();
