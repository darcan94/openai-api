import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const GET = async () => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = "Cuales son las mejores practicas para data fetch en next.js 14?."

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}