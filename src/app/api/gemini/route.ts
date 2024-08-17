import { saveChat, updateChat } from "@/app/modules/chat/application/actions";
import { Chat } from "@/app/modules/chat/domain/Chat";
import { convertToCoreMessages, streamText } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(req: Request){
  const { messages, id, userId, config } = await req.json();

  const result = await streamText({
    model: google("models/gemini-1.5-pro-latest"),
    system:"It detects the user's language and responds in markdown format when appropriate, in their language!",
    messages:  convertToCoreMessages(messages),
    ...config,
    maxRetries: 1,
    async onFinish({ text }){
      messages.push({content: text, role: 'assistant'})
      if( await updateChat(id, messages) ) return;

      const newChat: Chat = {
        id,
        title: messages[0].content.substring(0, 100),
        createdAt: new Date(),
        userId,
        config,
        messages
      }

      await saveChat(newChat);
    }
  })
 
  return result.toAIStreamResponse();
}
