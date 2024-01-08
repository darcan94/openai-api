import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from 'ai';
import { saveChat } from "@/app/modules/chat/application/actions";
import { ObjectId } from "mongodb";

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
  const { messages, id } = await request.json();

  const response = await genAI
                  .getGenerativeModel({ model: "gemini-pro"})
                  .generateContentStream(buildGoogleGenAiprompt(messages));

  const stream = GoogleGenerativeAIStream(response, {
    onCompletion: async (completion) => {
      const newMessage = { content: completion, role: "assistant" };

      const _id: ObjectId = id;
      const title: string = messages[1].content.substring(0, 100);
      const createdAt: Date = new Date();
      const chat = { _id, title, createdAt, messages };
      await saveChat(chat, newMessage);
    },
  });

  return new StreamingTextResponse(stream);
}