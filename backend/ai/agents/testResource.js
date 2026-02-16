import { resourceAgent } from "./resourceAgent.js";

async function test() {
  const topics = [
    "Data Structures",
    "JavaScript",
    "React",
    "System Design"
  ];

  const result = await resourceAgent(topics);

  console.dir(result, { depth: null });
}

test();
