import {
  saveChat,
  updateChat,
} from "@/app/modules/chat/application/actions";
import { Chat } from "@/app/modules/chat/domain/Chat";
import {
  CreateMessage,
  GoogleGenerativeAIStream,
  Message,
  StreamingTextResponse,
} from "ai";
import { ObjectId } from "mongodb";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const buildGoogleGenAiPrompt = (messages: Message[]) => ({
  contents: messages
    .filter((message) => ["user", "assistant"].includes(message.role))
    .map((message) => ({
      role: message.role === "user" ? "user" : "model",
      parts: [{ text: message.content }],
    })),
});

export const POST = async (request: Request) => {
  const { messages, id } = await request.json();
  const response = await genAI
    .getGenerativeModel({ model: "gemini-pro" })
    .generateContentStream(buildGoogleGenAiPrompt(messages));

  const stream = GoogleGenerativeAIStream(response, {
    onCompletion: async (completion: string) => {
      const newMessage: CreateMessage = {
        content: completion,
        role: "assistant",
      };

      messages.push(newMessage);
      if( await updateChat(id, messages) ) return;

      const _id: ObjectId = id;
      const title: string = messages[0].content.substring(0, 100);
      const createdAt: Date = new Date();
      const newChat: Chat = {
        _id,
        title,
        createdAt,
        messages,
      };
      await saveChat(newChat);
    },
  });

  return new StreamingTextResponse(stream);
};
