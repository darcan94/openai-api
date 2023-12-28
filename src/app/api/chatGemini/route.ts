import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from 'ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const runtime = 'edge';

const buildGoogleGenAiprompt = (messages: Message[]) => ({
  contents: messages
            .filter(message => ['user', 'assistant'].includes(message.role))
            .map(message => ({
              role: message.role === 'user' ? 'user' : 'model',
              parts: [{text: message.content}]
            }))
});

export const POST = async (request: Request) => {
  const { messages } = await request.json();

  const response = await genAI
                  .getGenerativeModel({ model: "gemini-pro"})
                  .generateContentStream(buildGoogleGenAiprompt(messages));

  const stream = GoogleGenerativeAIStream(response);

  return new StreamingTextResponse(stream);
}