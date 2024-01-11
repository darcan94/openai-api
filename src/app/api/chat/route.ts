import { saveChat } from "@/app/modules/chat/application/actions";
import { Chat } from "@/app/modules/chat/domain/Chat";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { ObjectId } from "mongodb";
import { Configuration, OpenAIApi } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export const POST = async (request: Request) => {
  const { messages, id } = await request.json();

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages,
    max_tokens: 400,
    temperature: 0,
    stream: true,
  });

  const stream = OpenAIStream(response, {
    onCompletion: async (completion) => {
      const newMessage = { content: completion, role: "assistant" };

      const _id: ObjectId = id;
      const title: string = messages[0].content.substring(0, 100);
      const createdAt: Date = new Date();
      const chat: Chat = { _id, title, createdAt, messages: [...messages, newMessage] };
      await saveChat(chat);
    },
  });

  return new StreamingTextResponse(stream);
};
