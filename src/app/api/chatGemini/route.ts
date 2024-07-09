import { saveChat, updateChat } from "@/app/modules/chat/application/actions";
import { Chat } from "@/app/modules/chat/domain/Chat";
import { convertToCoreMessages, streamText } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(req: Request){
  const { messages, data, id, userId } = await req.json();

  const initialMessages = messages.slice(0, -1);
  const currentMessage = messages[messages.length - 1];
  
  if(data.image){
    currentMessage.content = [
      { type: 'text', text: currentMessage.content },
      { type: 'image', image: data.image },
    ]
  }

  const result = await streamText({
    model: google("models/gemini-1.5-pro-latest"),
    system:"Detect user's language and response everything in MARKDOWN format",
    messages: [
      ...convertToCoreMessages(initialMessages),
      currentMessage
    ],
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
