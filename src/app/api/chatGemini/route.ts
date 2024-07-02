import { saveChat, updateChat } from "@/app/modules/chat/application/actions";
import { Chat } from "@/app/modules/chat/domain/Chat";
import { streamText } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(req: Request){
  const { messages, id, userId } = await req.json();
  
  const result = await streamText({
    model: google("models/gemini-1.5-flash"),
    messages,
    system:"Detect user's language and response everything in MARKDOWN format",
    maxTokens: 400,
    temperature: 0,
    maxRetries: 1,
    async onFinish({ text }){
      messages.push({content: text, role: 'assistant'})
      if( await updateChat(id, messages) ) return

      const newChat: Chat = {
        id,
        title: messages[0].content.substring(0, 100),
        createdAt: new Date(),
        userId,
        messages
      }

      await saveChat(newChat);
    }
  })
 
  return result.toAIStreamResponse();
};
