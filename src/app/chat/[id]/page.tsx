import Chat from "@/app/modules/chat/ui/components/chat";
import { notFound } from "next/navigation";
import { GetChatsService } from "@/app/modules/chat/application/GetChatService";
import { ChatRepositoryImpl } from "@/app/modules/chat/infra/ChatRepositoryImpl";

export default async function ChatPage({ params }: { params: any }) {
  const getChat = new GetChatsService(new ChatRepositoryImpl());
  const chat = await getChat.execute(params.id);

  if (!chat) {
    notFound();
  }

  return <Chat id={chat._id.toString()} initialMessages={chat.messages} />;
}
