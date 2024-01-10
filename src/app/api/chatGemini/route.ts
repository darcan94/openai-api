'use server'
import { GoogleGenerativeAI } from "@google/generative-ai";
import { CreateMessage, GoogleGenerativeAIStream, Message, StreamingTextResponse } from 'ai';
import { saveChat } from "@/app/modules/chat/application/actions";
import { ObjectId } from "mongodb";
import { Chat } from "@/app/modules/chat/domain/Chat";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

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
  console.log(id);
  const response = await genAI
                  .getGenerativeModel({ model: "gemini-pro"})
                  .generateContentStream(buildGoogleGenAiprompt(messages));

  const stream  = GoogleGenerativeAIStream(response, {
    onCompletion: async (completion) => {
      const newMessage: CreateMessage = { content: completion, role: "assistant" };

      const _id: ObjectId = id;
      const title: string = messages[0].content.substring(0, 100);
      const createdAt: Date = new Date();
      const chat: Chat = { _id, title, createdAt, messages: [...messages, newMessage] };
      await saveChat(chat);
    },
  });

  return new StreamingTextResponse(stream);
}