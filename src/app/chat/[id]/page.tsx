import Chat from "@/app/modules/chat/ui/components/chat";
import { notFound } from "next/navigation";
import { getChat } from "@/app/modules/chat/application/actions";

export default async function ChatPage({ params }: { params: any }) {
  const chat = await getChat(params.id);

  if (!chat) {
    notFound();
  }

  return <Chat id={chat._id.toString()} initialMessages={chat.messages} />;
}
