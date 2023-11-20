import { NextResponse } from "next/server";
import { GetAllChatsService } from "@/app/modules/chats/application/GetAllChatService";
import { ChatRepositoryImpl } from "@/app/modules/chats/infra/ChatRepositoryImpl";
import { DeleteChatsService } from "@/app/modules/chats/application/DeleteChatService";

const chatRepositoryImpl = new ChatRepositoryImpl()
const getAllChats = new GetAllChatsService(chatRepositoryImpl);
const deleteChat = new DeleteChatsService(chatRepositoryImpl);

export const GET = async () => {
  const chats = getAllChats.execute();

  return NextResponse.json({
    chats: await chats,
  });
};

export const DELETE = async (request: Request) => {
 // const chatDeleted: number = await deleteChat.execute(request.params.id);
 console.log(request);
 
};
