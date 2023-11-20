import { NextResponse } from "next/server";
import { GetAllChatsService } from "@/app/modules/chats/application/GetAllChatService";
import { ChatRepositoryImpl } from "@/app/modules/chats/infra/ChatRepositoryImpl";

const chatRepositoryImpl = new ChatRepositoryImpl()
const getAllChats = new GetAllChatsService(chatRepositoryImpl);

export const GET = async () => {
  const chats = getAllChats.execute();

  return NextResponse.json({
    chats: await chats,
  });
};
