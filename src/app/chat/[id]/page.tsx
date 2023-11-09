import Chat from "@/components/chat/chat";
import { connectDB } from "@/app/modules/chats/infra/db";
import { notFound } from "next/navigation";

export default async function ChatPage({ params }: { params: any }) {
  const collection = await connectDB();
  const chat = await collection.findOne({ _id: params.id });

  if (!chat) {
    notFound();
  }

  return <Chat id={chat._id.toString()} initialMessages={chat.messages} />;
}
