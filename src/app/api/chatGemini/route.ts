'use server'
import { GoogleGenerativeAI } from "@google/generative-ai";
import { CreateMessage, GoogleGenerativeAIStream, Message, StreamingTextResponse } from 'ai';
import { getChat, saveChat, updateChat } from "@/app/modules/chat/application/actions";
import { ObjectId } from "mongodb";
import { Chat } from "@/app/modules/chat/domain/Chat";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
  
  const response = await genAI
                  .getGenerativeModel({ model: "gemini-pro"})
                  .generateContentStream(buildGoogleGenAiprompt(messages));

  const stream  = GoogleGenerativeAIStream(response, {
    onCompletion: async (completion) => {
      const newMessage: CreateMessage = { content: completion, role: "assistant" };
      const chat = await getChat(id);

      if(chat){
        chat.messages = [...messages, newMessage];
        await updateChat(chat);
        return;
      }

      const _id: ObjectId = id;
      const title: string = messages[0].content.substring(0, 100);
      const createdAt: Date = new Date();
      const newChat: Chat = { _id, title, createdAt, messages: [...messages, newMessage] };
      await saveChat(newChat);
    },
  });

  return new StreamingTextResponse(stream);
}