import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  const models = await genAI.listModels();

  console.log("Available Models:\n");

  models.models.forEach((model) => {
    console.log(model.name);
  });
}

listModels();
