import { DeleteChatsService } from "@/app/modules/chat/application/DeleteChatService";
import { ChatRepositoryImpl } from "@/app/modules/chat/infra/ChatRepositoryImpl";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

const chatRepositoryImpl = new ChatRepositoryImpl();
const deleteChat = new DeleteChatsService(chatRepositoryImpl);

export const DELETE = async (
  request: Request,
  { params }: { params: { id: ObjectId } },
) => {
  const chatId: ObjectId = params.id;
  const chatDeleted: number = await deleteChat.execute(chatId);

  return NextResponse.json({
    chatDeleted: chatDeleted,
  });
};
