import Chat from "@/components/chat/chat";
import { notFound } from "next/navigation";
import { GetChatsService } from "@/app/modules/chats/application/GetChatService";
import { ChatRepositoryImpl } from "@/app/modules/chats/infra/ChatRepositoryImpl";

export default async function ChatPage({ params }: { params: any }) {
  const getChat = new GetChatsService(new ChatRepositoryImpl());
  const chat = await getChat.execute(params.id);

  if (!chat) {
    notFound();
  }

  return <Chat id={chat._id.toString()} initialMessages={chat.messages} />;
}
