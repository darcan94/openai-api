import {
  saveChat,
  updateChat,
} from "@/app/modules/chat/application/actions";
import { Chat } from "@/app/modules/chat/domain/Chat";
import {
  GoogleGenerativeAIStream,
  Message,
  StreamingTextResponse,
} from "ai";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const MESSAGE_LIMIT = 40;

const buildGoogleGenAiPrompt = (messages: Message[]) => ({
  contents: messages
    .slice(MESSAGE_LIMIT)
    .filter((message) => ["user", "assistant"].includes(message.role))
    .map((message) => ({
      role: message.role === "user" ? "user" : "model",
      parts: [{ text: message.content }],
    })),
});

export const POST = async (request: Request) => {
  const { messages, id, userId } = await request.json();
  
  const response = await genAI
    .getGenerativeModel({ model: "gemini-pro" })
    .generateContentStream(buildGoogleGenAiPrompt(messages));

  const stream = GoogleGenerativeAIStream(response, {
    onStart: async () => {
      if (await updateChat(id, messages[messages.length - 1])) return;
      
      const title: string = messages[0].content.substring(0, 50);
      const createdAt: Date = new Date();
      const newChat: Chat = {
        id,
        title,
        createdAt,
        userId,
        messages,
      };
      await saveChat(newChat);
    },
    onCompletion: async (completion: string) => {
      await updateChat(id, {content: completion, role: "assistant"});
    },
  });

  return new StreamingTextResponse(stream);
};


/**
 * const buildGoogleGenAiPrompt = (messages: Message[]) => ({
 *   contents: messages
 *     .filter((message) => ["user", "assistant"].includes(message.role))
 *     // Limita la lista de mensajes al número de MESSAGE_LIMIT
 *     .slice(0, MESSAGE_LIMIT)
 *     .map((message) => ({
 *       role: message.role === "user" ? "user" : "model",
 *       parts: [{ text: message.content }],
 *     })),
 * });
 */