import { CreateChatService } from "@/app/modules/chat/application/CreateChatService";
import { GetAllChatsService } from "@/app/modules/chat/application/GetAllChatService";
import { ChatRepositoryImpl } from "@/app/modules/chat/infra/ChatRepositoryImpl";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

const chatRepository = new ChatRepositoryImpl();
const createChat = new CreateChatService(chatRepository);
const getAllChats = new GetAllChatsService(chatRepository);

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
      const title: string = messages[1].content.substring(0, 100);
      const createdAt: Date = new Date();
      const chat = { _id, title, createdAt, messages };
      createChat.execute(chat, newMessage);
    },
  });

  return new StreamingTextResponse(stream);
};


export const GET = async () => {
  const chats = getAllChats.execute();

  return NextResponse.json({
    chats: await chats,
  });
};