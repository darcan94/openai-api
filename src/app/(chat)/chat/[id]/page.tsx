import Chat from "@/components/chat/chat";
import { notFound } from "next/navigation";
import { getChat } from "@/app/modules/chat/application/actions";
import { Session } from "next-auth";
import { auth } from "@/auth";

export default async function ChatPage({ params }: { params: any }) {
  const session: Session | null = await auth();
  const chat = await getChat(params.id, session?.user?.id || "");

  if (!chat) {
    const { notFound } = await import('next/navigation');    
    return notFound();
  }

  return  <Chat id={chat.id} chat={chat} session={null}/>
}
