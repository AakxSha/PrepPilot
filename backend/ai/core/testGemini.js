require("dotenv").config();

const model = require("./geminiClient");

async function test() {

  console.log(
    "Key loaded:",
    process.env.GEMINI_API_KEY ? "YES" : "NO"
  );

  const result = await model.generateContent(
    "Say hello in one sentence."
  );

  const response = result.response.text();

  console.log(response);
}

test();
